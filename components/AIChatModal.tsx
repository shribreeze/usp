import { useState, useEffect, useRef } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { CONTRACTS } from '../lib/config'
import { SUBSCRIPTION_MANAGER_ABI } from '../lib/contracts'
import { X, Sparkles, Send } from 'lucide-react'
import { cn } from '../lib/utils'

interface AIChatModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AIChatModal({ isOpen, onClose }: AIChatModalProps) {
  const { address } = useAccount()
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState<Array<{type: 'user' | 'ai', content: string}>>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [freeRequests, setFreeRequests] = useState(5)
  const [mounted, setMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { writeContract: payForAI, isPending: isPaying, data: payHash } = useWriteContract()

  // Wait for payment confirmation
  const { isSuccess: paymentSuccess } = useWaitForTransactionReceipt({
    hash: payHash,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isGenerating])

  // Check if user has Gold plan access
  const { data: subscription } = useReadContract({
    address: CONTRACTS.SUBSCRIPTION_MANAGER as `0x${string}`,
    abi: SUBSCRIPTION_MANAGER_ABI,
    functionName: 'getSubscription',
    args: address ? [address] : undefined,
    query: { enabled: !!address && mounted },
  })

  const hasGoldAccess = subscription && subscription[0] === 2n && subscription[3] // Plan 2 (Gold) and active

  const handleSendMessage = async () => {
    if (!prompt.trim() || !hasGoldAccess || isGenerating) return
    
    const userMessage = prompt.trim()
    setPrompt('')
    setMessages(prev => [...prev, { type: 'user', content: userMessage }])
    
    try {
      // Check if user needs to pay FIRST
      if (freeRequests <= 0) {
        setIsGenerating(true)
        
        // Process payment first
        await payForAI({
          address: CONTRACTS.SUBSCRIPTION_MANAGER as `0x${string}`,
          abi: SUBSCRIPTION_MANAGER_ABI,
          functionName: 'subscribe',
          args: [3n], // AI Pay-per-use plan
          value: parseEther('0.000001'),
        } as any)
        
        // Wait for payment confirmation before proceeding
        // This will be handled by the useEffect below
        return
      } else {
        // Use free request
        setFreeRequests(prev => prev - 1)
        await generateAIResponse(userMessage)
      }
      
    } catch (error) {
      console.error('Payment failed:', error)
      setMessages(prev => [...prev, { type: 'ai', content: 'Payment failed. Please try again.' }])
      setIsGenerating(false)
    }
  }

  // Handle payment success
  useEffect(() => {
    if (paymentSuccess && isGenerating) {
      const lastUserMessage = messages[messages.length - 1]?.content
      if (lastUserMessage) {
        generateAIResponse(lastUserMessage)
      }
    }
  }, [paymentSuccess])

  const generateAIResponse = async (userMessage: string) => {
    try {
      setIsGenerating(true)
      const aiResponse = await callGeminiAPI(userMessage)
      setMessages(prev => [...prev, { type: 'ai', content: aiResponse }])
    } catch (error) {
      console.error('AI request failed:', error)
      setMessages(prev => [...prev, { type: 'ai', content: 'Sorry, there was an error processing your request.' }])
    } finally {
      setIsGenerating(false)
    }
  }

  const callGeminiAPI = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()
      return data.response || data.fallback || 'Sorry, I could not process your request.'
    } catch (error) {
      console.error('Gemini API call failed:', error)
      const fallbacks = [
        `Based on your question about "${prompt}", USP's streaming payment system enables continuous micropayments without traditional subscription lock-ins.`,
        `Great question! USP leverages Somnia Network for real-time, trustless subscription management with NFT-based access control.`,
        `Your query about "${prompt}" relates to our premium content on Advanced Workflows & Automation, which covers similar concepts.`,
        `Regarding "${prompt}" - USP demonstrates how decentralized subscriptions solve traditional payment friction through streaming tokens.`
      ]
      return fallbacks[Math.floor(Math.random() * fallbacks.length)]
    }
  }

  const formatAIResponse = (text: string) => {
    // Split by double asterisks for bold text
    const parts = text.split(/(\*\*.*?\*\*)/g)
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-semibold text-[color:var(--usp-blue)]">{part.slice(2, -2)}</strong>
      }
      
      // Handle line breaks and bullet points
      const lines = part.split('\n').filter(line => line.trim())
      
      return lines.map((line, lineIndex) => {
        const trimmedLine = line.trim()
        
        if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*')) {
          return (
            <div key={`${index}-${lineIndex}`} className="flex items-start gap-2 my-1">
              <span className="text-[color:var(--usp-purple)] mt-1">•</span>
              <span>{trimmedLine.substring(1).trim()}</span>
            </div>
          )
        }
        
        if (trimmedLine) {
          return <p key={`${index}-${lineIndex}`} className="mb-2 last:mb-0">{trimmedLine}</p>
        }
        
        return null
      })
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={cn(
          "relative rounded-lg border shadow-2xl w-full max-w-2xl h-[600px] flex flex-col",
          "border-[color:var(--usp-foreground)]/20 bg-[color:var(--usp-bg)]"
        )}
        style={{
          ["--usp-blue" as any]: "#00B2FF",
          ["--usp-purple" as any]: "#7A5CFF",
          ["--usp-pink" as any]: "#FF3D9A",
          ["--usp-bg" as any]: "#0B0F1A",
          ["--usp-foreground" as any]: "#F5F7FA",
        }}
      >
        {/* Header */}
        <div className="p-6 border-b border-[color:var(--usp-foreground)]/10 bg-gradient-to-r from-[color:var(--usp-purple)]/20 to-[color:var(--usp-pink)]/20 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[color:var(--usp-purple)] to-[color:var(--usp-pink)] flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[color:var(--usp-foreground)]">
                  AI Assistant
                </h2>
                <p className="text-sm text-[color:var(--usp-foreground)]/70">
                  {freeRequests > 0 ? `${freeRequests} free requests remaining` : 'Pay 0.000001 STT per request'}
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className={cn(
                "p-2 rounded-lg transition-colors",
                "text-[color:var(--usp-foreground)]/60 hover:text-[color:var(--usp-foreground)]",
                "hover:bg-[color:var(--usp-foreground)]/10"
              )}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-[color:var(--usp-foreground)]/60">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-lg font-medium mb-2">Welcome to AI Assistant!</h3>
              <p className="text-sm">Ask me anything about Web3, USP, blockchain, or our premium content.</p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={cn(
                  "max-w-[80%] p-4 rounded-lg",
                  message.type === 'user' 
                    ? "bg-gradient-to-r from-[color:var(--usp-blue)] to-[color:var(--usp-purple)] text-white"
                    : "bg-[color:var(--usp-foreground)]/10 text-[color:var(--usp-foreground)]"
                )}
              >
                {message.type === 'ai' && (
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={16} className="text-[color:var(--usp-purple)]" />
                    <span className="text-xs font-medium text-[color:var(--usp-purple)]">AI Assistant</span>
                  </div>
                )}
                <div className="text-sm leading-relaxed">
                  {message.type === 'ai' ? formatAIResponse(message.content) : message.content}
                </div>
              </div>
            </div>
          ))}
          
          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-[color:var(--usp-foreground)]/10 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-[color:var(--usp-purple)]/30 border-t-[color:var(--usp-purple)] rounded-full animate-spin" />
                  <span className="text-sm text-[color:var(--usp-foreground)]/70">
                    {isPaying ? 'Processing payment...' : 'AI is thinking...'}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-[color:var(--usp-foreground)]/10">
          <div className="flex gap-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about Web3, USP, or premium content..."
              disabled={isGenerating}
              className={cn(
                "flex-1 p-3 rounded-lg border text-sm",
                "border-[color:var(--usp-foreground)]/20 bg-[color:var(--usp-foreground)]/5",
                "text-black placeholder-[color:var(--usp-foreground)]/50",
                "focus:border-[color:var(--usp-purple)] focus:outline-none focus:ring-2 focus:ring-[color:var(--usp-purple)]/20",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            />
            <button
              onClick={handleSendMessage}
              disabled={!prompt.trim() || isGenerating}
              className={cn(
                "px-4 py-3 rounded-lg transition-all",
                "bg-gradient-to-r from-[color:var(--usp-purple)] to-[color:var(--usp-pink)]",
                "text-white hover:scale-105 active:scale-95",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              )}
            >
              <Send size={18} />
            </button>
          </div>
          
          {freeRequests <= 0 && (
            <p className="text-xs text-[color:var(--usp-foreground)]/60 mt-2">
              💰 You've used your free requests. Each additional request costs 0.000001 STT.
            </p>
          )}
        </div>

        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10 rounded-lg"
          style={{
            background: "radial-gradient(ellipse at top right, rgba(122,92,255,0.3) 0%, transparent 70%)"
          }}
        />
      </div>
    </div>
  )
}