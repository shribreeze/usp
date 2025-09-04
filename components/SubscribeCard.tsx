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
      const pricePerSecond = 100000000000n // 0.0000001 STT per second
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
      args: [1n],
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
        ["--usp-placeholder" as any]: "#1e1e1eff",
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[color:var(--usp-purple)] to-[color:var(--usp-pink)] flex items-center justify-center">
          <span className="text-white text-sm">⚡</span>
        </div>
        <h3 className="text-lg font-semibold text-[color:var(--usp-foreground)]">Premium Plan</h3>
      </div>
      
      <div className="mb-4 p-3 rounded-lg border border-[color:var(--usp-blue)]/20 bg-[color:var(--usp-blue)]/5">
        <h4 className="font-medium text-[color:var(--usp-blue)] mb-2">💡 How it works:</h4>
        <ul className="text-xs text-[color:var(--usp-foreground)]/80 space-y-1">
          <li>• Pay once, stream per second</li>
          <li>• Balance decreases in real-time</li>
          <li>• Cancel anytime, get refund</li>
          <li>• NFT grants instant access</li>
        </ul>
        <p className="text-xs text-[color:var(--usp-blue)]/80 mt-2">
          Rate: 0.0000001 STT/second | Plan: Premium Plan
        </p>
      </div>

      {isActive ? (
        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-green-200/50 bg-green-500/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-400">🔥</span>
              <p className="font-medium text-green-300">Live Streaming Subscription</p>
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
                "text-[color:var(--usp-placeholder)] placeholder-[color:var(--usp-placeholder)]/50",
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
              "text-[color:var(--usp-placeholder)] placeholder-[color:var(--usp-placeholder)]/50",
              "focus:border-[color:var(--usp-blue)] focus:outline-none focus:ring-1 focus:ring-[color:var(--usp-blue)]"
            )}
          />
          <button
            onClick={handleSubscribe}
            disabled={isSubscribing}
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
            {isSubscribing ? 'Subscribing...' : 'Subscribe Now'}
          </button>
        </div>
      )}
    </div>
  )
}