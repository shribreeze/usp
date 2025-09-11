import { useState } from 'react'
import { useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import { CONTRACTS } from '../lib/config'
import { SUBSCRIPTION_MANAGER_ABI } from '../lib/contracts'
import { X, Sparkles } from 'lucide-react'
import { cn } from '../lib/utils'

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
}

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  const { writeContract: payForAI, isPending: isPaying } = useWriteContract()

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    try {
      setIsGenerating(true)
      
      // Pay for AI usage (0.00001 STT per request)
      await payForAI({
        address: CONTRACTS.SUBSCRIPTION_MANAGER as `0x${string}`,
        abi: SUBSCRIPTION_MANAGER_ABI,
        functionName: 'subscribe',
        args: [2n], // AI Plan ID
        value: parseEther('0.00001'),
      } as any)
      
      // Simulate AI response (in real app, call OpenAI API)
      setTimeout(() => {
        const responses = [
          "Based on your query about Web3 subscriptions, USP enables streaming payments that give users complete control over their subscription lifecycle.",
          "The future of Web3 monetization lies in flexible, user-controlled payment streams rather than rigid monthly billing cycles.",
          "Smart contracts can automate subscription logic while maintaining transparency and user sovereignty over funds.",
          "NFT-based access control creates a seamless bridge between payment verification and content gating in decentralized applications."
        ]
        setResponse(responses[Math.floor(Math.random() * responses.length)])
        setIsGenerating(false)
      }, 2000)
      
    } catch (error) {
      console.error('AI payment failed:', error)
      setIsGenerating(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div 
        className={cn(
          "relative rounded-lg border shadow-2xl max-w-md w-full",
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
        <div className="flex items-center justify-between p-6 border-b border-[color:var(--usp-foreground)]/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[color:var(--usp-purple)] to-[color:var(--usp-pink)] flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[color:var(--usp-foreground)]">
                AI Assistant
              </h2>
              <p className="text-xs text-[color:var(--usp-foreground)]/60">
                Pay-per-use: 0.00001 STT/request
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
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[color:var(--usp-foreground)] mb-2">
              Ask anything about Web3, subscriptions, or blockchain:
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., How do streaming payments work in Web3?"
              className={cn(
                "w-full p-3 rounded-lg border text-sm resize-none",
                "border-[color:var(--usp-foreground)]/20 bg-[color:var(--usp-foreground)]/5",
                "text-[color:var(--usp-foreground)] placeholder-[color:var(--usp-foreground)]/50",
                "focus:border-[color:var(--usp-purple)] focus:outline-none focus:ring-1 focus:ring-[color:var(--usp-purple)]"
              )}
              rows={3}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating || isPaying}
            className={cn(
              "w-full py-3 px-4 rounded-lg font-medium transition-all",
              "bg-gradient-to-r from-[color:var(--usp-purple)] to-[color:var(--usp-pink)]",
              "text-white hover:scale-[1.02] active:scale-[0.98]",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            )}
            style={{
              boxShadow: "0 0 20px rgba(122,92,255,0.3), 0 0 30px rgba(255,61,154,0.2)",
            }}
          >
            {isGenerating ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </div>
            ) : isPaying ? (
              'Processing Payment...'
            ) : (
              `Pay 0.00001 STT & Generate`
            )}
          </button>

          {response && (
            <div className="p-4 rounded-lg border border-green-200/50 bg-green-500/10">
              <div className="flex items-start gap-2">
                <Sparkles size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-300 mb-1">AI Response:</p>
                  <p className="text-sm text-green-200">{response}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 rounded-lg"
          style={{
            background: "radial-gradient(ellipse at top right, rgba(122,92,255,0.1) 0%, transparent 50%)"
          }}
        />
      </div>
    </div>
  )
}