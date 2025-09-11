import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { CONTRACTS, somniaTestnet } from '../lib/config'
import { SUBSCRIPTION_MANAGER_ABI } from '../lib/contracts'
import { cn } from '../lib/utils'

export default function SubscribeCard() {
  const { address } = useAccount()
  const [amount, setAmount] = useState('0.01')
  const [balance, setBalance] = useState('0')
  const [mounted, setMounted] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(1)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Read subscription data
  const { data: subscription, refetch: refetchSubscription } = useReadContract({
    address: CONTRACTS.SUBSCRIPTION_MANAGER as `0x${string}`,
    abi: SUBSCRIPTION_MANAGER_ABI,
    functionName: 'getSubscription',
    args: address ? [address] : undefined,
    query: { enabled: !!address && mounted },
  })

  // Subscribe transaction
  const { writeContract: subscribe, isPending: isSubscribing, data: subscribeHash } = useWriteContract()

  // Cancel transaction
  const { writeContract: cancel, isPending: isCancelling, data: cancelHash } = useWriteContract()

  // Wait for subscribe transaction
  const { isSuccess: subscribeSuccess } = useWaitForTransactionReceipt({
    hash: subscribeHash,
  })

  // Wait for cancel transaction
  const { isSuccess: cancelSuccess } = useWaitForTransactionReceipt({
    hash: cancelHash,
  })

  // Refresh data when transactions complete
  useEffect(() => {
    if (subscribeSuccess || cancelSuccess) {
      refetchSubscription()
    }
  }, [subscribeSuccess, cancelSuccess, refetchSubscription])

  // Live balance countdown
  useEffect(() => {
    if (subscription && subscription[3]) {
      // Get correct price per second based on plan
      const planId = Number(subscription[0])
      const pricePerSecond = planId === 1 
        ? 100000000000n    // Silver: 0.0000001 STT per second
        : 10000000000000n  // Gold: 0.00001 STT per second
      
      const updateBalance = () => {
        const now = BigInt(Math.floor(Date.now() / 1000))
        const timeElapsed = now - subscription[2]
        const cost = timeElapsed * pricePerSecond
        const currentBalance = subscription[1] - cost
        const balanceValue = currentBalance > 0n ? currentBalance : 0n
        setBalance(formatEther(balanceValue))
      }
      updateBalance()
      const interval = setInterval(updateBalance, 1000)
      return () => clearInterval(interval)
    } else {
      setBalance('0')
    }
  }, [subscription])

  const handleSubscribe = () => {
    if (!address) return
    subscribe({
      address: CONTRACTS.SUBSCRIPTION_MANAGER as `0x${string}`,
      abi: SUBSCRIPTION_MANAGER_ABI,
      functionName: 'subscribe',
      args: [BigInt(selectedPlan)],
      value: parseEther(amount),
    } as any)
  }

  const handleCancel = () => {
    if (!address) return
    cancel({
      address: CONTRACTS.SUBSCRIPTION_MANAGER as `0x${string}`,
      abi: SUBSCRIPTION_MANAGER_ABI,
      functionName: 'cancel',
    } as any)
  }

  if (!mounted) {
    return (
      <div 
        className={cn(
          "rounded-lg border p-6",
          "border-[color:var(--usp-foreground)]/10 bg-[color:var(--usp-foreground)]/5"
        )}
        style={{
          ["--usp-foreground" as any]: "#F5F7FA",
        }}
      >
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-[color:var(--usp-foreground)]/20 rounded w-3/4"></div>
          <div className="h-10 bg-[color:var(--usp-foreground)]/20 rounded"></div>
          <div className="h-10 bg-[color:var(--usp-foreground)]/20 rounded"></div>
        </div>
      </div>
    )
  }

  const isActive = subscription?.[3] || false
  const currentPlan = subscription?.[0] ? Number(subscription[0]) : 0

  return (
    <div 
      className={cn(
        "rounded-lg border p-6",
        "border-[color:var(--usp-foreground)]/10 bg-[color:var(--usp-foreground)]/5"
      )}
      style={{
        ["--usp-blue" as any]: "#00B2FF",
        ["--usp-purple" as any]: "#7A5CFF",
        ["--usp-pink" as any]: "#FF3D9A",
        ["--usp-bg" as any]: "#0B0F1A",
        ["--usp-foreground" as any]: "#F5F7FA",
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[color:var(--usp-purple)] to-[color:var(--usp-pink)] flex items-center justify-center">
          <span className="text-white text-sm">⚡</span>
        </div>
        <h3 className="text-lg font-semibold text-[color:var(--usp-foreground)]">Subscription Plans</h3>
      </div>

      {/* Plan Selection */}
      {!isActive && (
        <div className="mb-6 space-y-3">
          <h4 className="font-medium text-[color:var(--usp-foreground)] mb-3">Choose Your Plan:</h4>
          
          {/* Silver Plan */}
          <div 
            onClick={() => setSelectedPlan(1)}
            className={cn(
              "p-4 rounded-lg border cursor-pointer transition-all",
              selectedPlan === 1 
                ? "border-[color:var(--usp-blue)] bg-[color:var(--usp-blue)]/10" 
                : "border-[color:var(--usp-foreground)]/20 hover:border-[color:var(--usp-blue)]/50"
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium text-[color:var(--usp-foreground)]">🥈 Silver Plan</h5>
                <p className="text-sm text-[color:var(--usp-foreground)]/70">Premium content access</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-[color:var(--usp-blue)]">0.0000001 STT/sec</p>
                <p className="text-xs text-[color:var(--usp-foreground)]/60">~28 hours for 0.01 STT</p>
              </div>
            </div>
          </div>

          {/* Gold Plan */}
          <div 
            onClick={() => setSelectedPlan(2)}
            className={cn(
              "p-4 rounded-lg border cursor-pointer transition-all relative overflow-hidden",
              selectedPlan === 2 
                ? "border-[color:var(--usp-pink)] bg-gradient-to-r from-[color:var(--usp-purple)]/10 to-[color:var(--usp-pink)]/10" 
                : "border-[color:var(--usp-foreground)]/20 hover:border-[color:var(--usp-pink)]/50"
            )}
            style={{
              boxShadow: selectedPlan === 2 ? "0 0 20px rgba(255,61,154,0.2)" : undefined
            }}
          >
            <div className="flex items-center justify-between relative z-10">
              <div>
                <div className="flex items-center gap-2">
                  <h5 className="font-medium text-[color:var(--usp-foreground)]">🥇 Gold Plan</h5>
                  <span className="text-xs bg-gradient-to-r from-[color:var(--usp-purple)] to-[color:var(--usp-pink)] text-white px-2 py-0.5 rounded-full">
                    POPULAR
                  </span>
                </div>
                <p className="text-sm text-[color:var(--usp-foreground)]/70">Premium content + AI chat</p>
                <p className="text-xs text-green-400">✨ 5 free AI requests included</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-[color:var(--usp-pink)]">0.00001 STT/sec</p>
                <p className="text-xs text-[color:var(--usp-foreground)]/60">~2.8 hours for 0.01 STT</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isActive ? (
        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-green-200/50 bg-green-500/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-400">🔥</span>
              <p className="font-medium text-green-300">
                {currentPlan === 1 ? '🥈 Silver Plan Active' : '🥇 Gold Plan Active'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-mono text-green-300">Balance: {balance} STT</p>
              <p className="text-xs text-green-400/80">
                ⏱️ Decreasing every second | 💰 Original: {formatEther(subscription[1])} STT
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount to add (STT)"
              className={cn(
                "w-full p-3 rounded-lg border text-sm",
                "border-[color:var(--usp-foreground)]/20 bg-[color:var(--usp-foreground)]/5",
                "text-black placeholder-[color:var(--usp-foreground)]/50",
                "focus:border-[color:var(--usp-blue)] focus:outline-none focus:ring-1 focus:ring-[color:var(--usp-blue)]"
              )}
            />
            <button
              onClick={handleSubscribe}
              disabled={isSubscribing}
              className={cn(
                "w-full py-3 px-4 rounded-lg font-medium text-sm transition-all",
                "bg-gradient-to-r from-[color:var(--usp-blue)] to-[color:var(--usp-purple)]",
                "text-white hover:scale-[1.02] active:scale-[0.98]",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              )}
            >
              {isSubscribing ? 'Adding...' : 'Add Balance'}
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => refetchSubscription()}
              className={cn(
                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors",
                "border border-[color:var(--usp-foreground)]/20 text-[color:var(--usp-foreground)]/80",
                "hover:bg-[color:var(--usp-foreground)]/10"
              )}
            >
              🔄 Refresh
            </button>
            <button
              onClick={handleCancel}
              disabled={isCancelling}
              className={cn(
                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors",
                "bg-red-500/20 text-red-300 hover:bg-red-500/30",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isCancelling ? 'Cancelling...' : 'Cancel'}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount (STT)"
            className={cn(
              "w-full p-3 rounded-lg border text-sm",
              "border-[color:var(--usp-foreground)]/20 bg-[color:var(--usp-foreground)]/5",
              "text-black placeholder-[color:var(--usp-foreground)]/50",
              "focus:border-[color:var(--usp-blue)] focus:outline-none focus:ring-1 focus:ring-[color:var(--usp-blue)]"
            )}
          />
          <button
            onClick={handleSubscribe}
            disabled={isSubscribing}
            className={cn(
              "w-full py-3 px-4 rounded-lg font-medium transition-all",
              selectedPlan === 2 
                ? "bg-gradient-to-r from-[color:var(--usp-purple)] to-[color:var(--usp-pink)]"
                : "bg-gradient-to-r from-[color:var(--usp-blue)] to-[color:var(--usp-purple)]",
              "text-white hover:scale-[1.02] active:scale-[0.98]",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            )}
            style={{
              boxShadow: selectedPlan === 2 
                ? "0 0 20px rgba(122,92,255,0.3), 0 0 30px rgba(255,61,154,0.2)"
                : "0 0 20px rgba(0,178,255,0.3)"
            }}
          >
            {isSubscribing ? 'Subscribing...' : `Subscribe to ${selectedPlan === 1 ? 'Silver' : 'Gold'} Plan`}
          </button>
        </div>
      )}
    </div>
  )
}