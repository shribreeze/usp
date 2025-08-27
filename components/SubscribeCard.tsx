import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { CONTRACTS, somniaTestnet } from '../lib/config'
import { SUBSCRIPTION_MANAGER_ABI } from '../lib/contracts'

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
    args: [address!],
    query: { enabled: !!address && mounted },
  })

  // Read plan data
  const { data: plan, refetch: refetchPlan } = useReadContract({
    address: CONTRACTS.SUBSCRIPTION_MANAGER as `0x${string}`,
    abi: SUBSCRIPTION_MANAGER_ABI,
    functionName: 'getPlan',
    args: [1n],
    query: { enabled: mounted },
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

  // Live balance countdown - use hardcoded price since plan call fails
  useEffect(() => {
    if (subscription && subscription[3]) { // active subscription
      const pricePerSecond = 1000000000000n // 0.000001 STT per second (from deploy script)
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
    subscribe({
      address: CONTRACTS.SUBSCRIPTION_MANAGER as `0x${string}`,
      abi: SUBSCRIPTION_MANAGER_ABI,
      functionName: 'subscribe',
      args: [1n],
      value: parseEther(amount),
    })
  }

  const handleCancel = () => {
    cancel({
      address: CONTRACTS.SUBSCRIPTION_MANAGER as `0x${string}`,
      abi: SUBSCRIPTION_MANAGER_ABI,
      functionName: 'cancel',
    })
  }

  if (!mounted) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  const isActive = subscription?.[3] || false

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Premium Plan</h3>
      
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">💡 How it works:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Pay once, stream per second</li>
          <li>• Balance decreases in real-time</li>
          <li>• Cancel anytime, get refund</li>
          <li>• NFT grants instant access</li>
        </ul>
        <p className="text-xs text-blue-600 mt-2">
          Rate: 0.000001 STT/second | Plan: Premium Plan
        </p>
      </div>

      {isActive ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <p className="text-green-800 font-semibold flex items-center">
              🔥 Live Streaming Subscription
            </p>
            <div className="mt-2 space-y-1">
              <p className="text-lg font-mono text-green-700">Balance: {balance} STT</p>
              <p className="text-xs text-green-600">
                ⏱️ Decreasing every second | 💰 Original: {formatEther(subscription[1])} STT
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount to add (STT)"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleSubscribe}
              disabled={isSubscribing}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg"
            >
              {isSubscribing ? 'Adding...' : 'Add Balance'}
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                refetchSubscription()
                refetchPlan()
              }}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg text-sm"
            >
              🔄 Refresh
            </button>
            <button
              onClick={handleCancel}
              disabled={isCancelling}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg text-sm"
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
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleSubscribe}
            disabled={isSubscribing}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg"
          >
            {isSubscribing ? 'Subscribing...' : 'Subscribe Now'}
          </button>
        </div>
      )}
    </div>
  )
}