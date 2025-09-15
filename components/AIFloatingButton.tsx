import { useState, useEffect } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { CONTRACTS } from '../lib/config'
import { SUBSCRIPTION_MANAGER_ABI } from '../lib/contracts'
import { Sparkles } from 'lucide-react'
import { cn } from '../lib/utils'
import AIChatModal from './AIChatModal'

export default function AIFloatingButton() {
  const { address } = useAccount()
  const [mounted, setMounted] = useState(false)
  const [isAIOpen, setIsAIOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if user has Gold plan access
  const { data: subscription } = useReadContract({
    address: CONTRACTS.SUBSCRIPTION_MANAGER as `0x${string}`,
    abi: SUBSCRIPTION_MANAGER_ABI,
    functionName: 'getSubscription',
    args: address ? [address] : undefined,
    query: { 
      enabled: !!address && mounted,
      refetchInterval: 3000 // Check every 3 seconds for Gold access
    },
  })

  // Check if user has Gold plan access with remaining balance
  const hasGoldAccess = (() => {
    if (!subscription || subscription[0] !== 2n || !subscription[3]) return false
    
    // Check if subscription has remaining balance
    const now = BigInt(Math.floor(Date.now() / 1000))
    const timeElapsed = now - subscription[2]
    const pricePerSecond = 10000000000000n // Gold: 0.00001 STT per second
    const cost = timeElapsed * pricePerSecond
    const currentBalance = subscription[1] - cost
    
    return currentBalance > 0n
  })()

  if (!mounted) return null

  // Show locked state if no Gold access
if (!hasGoldAccess) {
  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl z-40",
        "bg-[color:var(--usp-bg)] border border-[color:var(--usp-foreground)]/20",
        "flex items-center justify-center shadow-xl cursor-not-allowed overflow-hidden"
      )}
      style={{
        ["--usp-blue" as any]: "#00B2FF",
        ["--usp-purple" as any]: "#7A5CFF",
        ["--usp-pink" as any]: "#FF3D9A",
        ["--usp-bg" as any]: "#0B0F1A",
        ["--usp-foreground" as any]: "#F5F7FA",
      }}
    >
      {/* Glow ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--usp-blue)] via-[var(--usp-purple)] to-[var(--usp-pink)] opacity-40 blur-md animate-pulse"></div>

      {/* Lock icon */}
      <div className="relative z-10 text-2xl text-[color:var(--usp-foreground)] drop-shadow-[0_0_6px_rgba(0,178,255,0.6)] animate-bounce-slow">
        🔒
      </div>

      {/* Tooltip (optional) */}
      <div className="absolute bottom-20 right-1/2 translate-x-1/2 bg-[var(--usp-bg)] border border-[var(--usp-foreground)]/20 text-[var(--usp-foreground)] text-xs px-3 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
        Upgrade to Gold to Unlock ✨
      </div>
    </div>
  );
}


  return (
    <>
      {/* Floating AI Button */}
      <button
        onClick={() => setIsAIOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl z-40",
          "bg-gradient-to-r from-[color:var(--usp-purple)] to-[color:var(--usp-pink)]",
          "hover:scale-110 active:scale-95 transition-all duration-300",
          "flex items-center justify-center group"
        )}
        style={{
          ["--usp-purple" as any]: "#7A5CFF",
          ["--usp-pink" as any]: "#FF3D9A",
          boxShadow: "0 0 30px rgba(122,92,255,0.4), 0 0 50px rgba(255,61,154,0.3)",
        }}
      >
        <Sparkles size={24} className="text-white group-hover:animate-pulse" />
        
        {/* Pulse animation */}
        <div 
          className="absolute inset-0 rounded-full animate-ping opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(122,92,255,0.6) 0%, rgba(255,61,154,0.4) 100%)"
          }}
        />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 px-3 py-2 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          AI Assistant (Gold Plan)
          <div className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-l-4 border-l-black/80 border-y-4 border-y-transparent" />
        </div>
      </button>

      {/* AI Chat Modal */}
      <AIChatModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </>
  )
}