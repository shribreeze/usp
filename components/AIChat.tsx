import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import { CONTRACTS } from '../lib/config'
import { SUBSCRIPTION_MANAGER_ABI } from '../lib/contracts'
import { Sparkles, Send, Zap } from 'lucide-react'
import { cn } from '../lib/utils'

export default function AIChat() {
  const { address } = useAccount()
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState<Array<{type: 'user' | 'ai', content: string}>>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [freeRequests, setFreeRequests] = useState(5)
  const [mounted, setMounted] = useState(false)
  
  const { writeContract: payForAI, isPending: isPaying } = useWriteContract()

  useEffect(() => {
    setMounted(true)
  }, [])

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
    if (!prompt.trim() || !hasGoldAccess) return
    
    const userMessage = prompt.trim()
    setPrompt('')
    setMessages(prev => [...prev, { type: 'user', content: userMessage }])
    
    try {
      setIsGenerating(true)
      
      // Check if user needs to pay
      if (freeRequests <= 0) {
        await payForAI({
          address: CONTRACTS.SUBSCRIPTION_MANAGER as `0x${string}`,
          abi: SUBSCRIPTION_MANAGER_ABI,
          functionName: 'subscribe',
          args: [3n], // AI Pay-per-use plan
          value: parseEther('0.000001'),
        } as any)
      } else {
        setFreeRequests(prev => prev - 1)
      }
      
      // Call Gemini API (simulated for demo)
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
      // Fallback responses if API fails
      const fallbacks = [
        `Based on your question about "${prompt}", USP's streaming payment system enables continuous micropayments without traditional subscription lock-ins.`,
        `Great question! USP leverages Somnia Network for real-time, trustless subscription management with NFT-based access control.`,
        `Your query about "${prompt}" relates to our premium content on Advanced Workflows & Automation, which covers similar concepts.`,
        `Regarding "${prompt}" - USP demonstrates how decentralized subscriptions solve traditional payment friction through streaming tokens.`
      ]
      return fallbacks[Math.floor(Math.random() * fallbacks.length)]
    }
  }

  if (!mounted) return null

  if (!hasGoldAccess) {
    return (
      <div
  className={cn(
    "fixed bottom-6 right-6 z-50 rounded-full border shadow-2xl p-3 text-center cursor-pointer group",
    "border-[color:var(--usp-foreground)]/30 bg-[color:var(--usp-bg)]",
    "transition-transform duration-300 ease-in-out hover:scale-110"
  )}
  style={{
    ["--usp-blue" as any]: "#00B2FF",
    ["--usp-purple" as any]: "#7A5CFF",
    ["--usp-pink" as any]: "#FF3D9A",
    ["--usp-bg" as any]: "#0B0F1A",
    ["--usp-foreground" as any]: "#F5F7FA",
  }}
>
  {/* Glowing gradient border */}
  <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[var(--usp-blue)] via-[var(--usp-purple)] to-[var(--usp-pink)] opacity-70 blur-xl animate-pulse" />

  {/* Floating animation */}
  <div className="animate-bounce-slow">
    <img
      src="/ai.png"
      alt="AI Chat"
      className="mx-auto w-12 drop-shadow-[0_0_12px_var(--usp-blue)] group-hover:drop-shadow-[0_0_20px_var(--usp-purple)] transition-all duration-300"
    />
  </div>
</div>

    )
  }

  return (
    <div 
      className={cn(
        "fixed bottom-6 right-6 w-96 h-[500px] rounded-lg border shadow-2xl flex flex-col",
        "border-[color:var(--usp-foreground)]/20 bg-[color:var(--usp-bg)]"
      )}
      style={{
        ["--usp-blue" as any]: "#00B2FF",
        ["--usp-purple" as any]: "#7A5CFF",
        ["--usp-pink" as any]: "#FF3D9A",
        ["--usp-bg" as any]: "#0B0F1A",
        ["--usp-foreground" as any]: "#F5F7FA",
        boxShadow: "0 0 30px rgba(122,92,255,0.3), 0 0 50px rgba(255,61,154,0.2)",
      }}
    >
      {/* Header */}
      <div className="p-4 border-b border-[color:var(--usp-foreground)]/10 bg-gradient-to-r from-[color:var(--usp-purple)]/20 to-[color:var(--usp-pink)]/20 rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[color:var(--usp-purple)] to-[color:var(--usp-pink)] flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-[color:var(--usp-foreground)]">AI Assistant (Gemini 2.0)</h3>
            <p className="text-xs text-[color:var(--usp-foreground)]/70">
              {freeRequests > 0 ? `${freeRequests} free requests left` : 'Pay 0.000001 STT per request'}
            </p>
          </div>
          <Zap className="text-yellow-400" size={20} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-[color:var(--usp-foreground)]/60 text-sm">
            Ask me anything about Web3, USP, or our premium content!
          </div>
        )}
        
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={cn(
                "max-w-[80%] p-3 rounded-lg text-sm",
                message.type === 'user' 
                  ? "bg-gradient-to-r from-[color:var(--usp-blue)] to-[color:var(--usp-purple)] text-white"
                  : "bg-[color:var(--usp-foreground)]/10 text-[color:var(--usp-foreground)]"
              )}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {isGenerating && (
          <div className="flex justify-start">
            <div className="bg-[color:var(--usp-foreground)]/10 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-[color:var(--usp-purple)]/30 border-t-[color:var(--usp-purple)] rounded-full animate-spin" />
                <span className="text-sm text-[color:var(--usp-foreground)]/70">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[color:var(--usp-foreground)]/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about Web3, USP, or premium content..."
            className={cn(
              "flex-1 p-2 rounded-lg border text-sm",
              "border-[color:var(--usp-foreground)]/20 bg-[color:var(--usp-foreground)]/5",
              "text-[color:var(--usp-foreground)] placeholder-[color:var(--usp-foreground)]/50",
              "focus:border-[color:var(--usp-purple)] focus:outline-none focus:ring-1 focus:ring-[color:var(--usp-purple)]"
            )}
          />
          <button
            onClick={handleSendMessage}
            disabled={!prompt.trim() || isGenerating || isPaying}
            className={cn(
              "p-2 rounded-lg transition-all",
              "bg-gradient-to-r from-[color:var(--usp-purple)] to-[color:var(--usp-pink)]",
              "text-white hover:scale-105 active:scale-95",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            )}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10 rounded-lg"
        style={{
          background: "radial-gradient(ellipse at bottom right, rgba(122,92,255,0.3) 0%, transparent 70%)"
        }}
      />
    </div>
  )
}