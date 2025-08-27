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

  // Read subscription data
  const { data: subscription, refetch: refetchSubscription } = useReadContract({
    address: CONTRACTS.SUBSCRIPTION_MANAGER as `0x${string}`,
    abi: SUBSCRIPTION_MANAGER_ABI,
    functionName: 'getSubscription',
    args: [address!],
    chainId: somniaTestnet.id,
    query: { enabled: !!address },
  })

  // Read plan data (assuming plan ID 1 exists)
  const { data: plan } = useReadContract({
    address: CONTRACTS.SUBSCRIPTION_MANAGER as `0x${string}`,
    abi: SUBSCRIPTION_MANAGER_ABI,
    functionName: 'getPlan',
    args: [1n],
    chainId: somniaTestnet.id,
  })

  // Subscribe transaction
  const { writeContract: subscribe, isPending: isSubscribing, data: subscribeHash, error: subscribeError } = useWriteContract({
    mutation: {
      onError: (error) => {
        console.error('Subscribe transaction error:', error)
      },
      onSuccess: (data) => {
        console.log('Subscribe transaction sent:', data)
      }
    }
  })

  // Cancel transaction
  const { writeContract: cancel, isPending: isCancelling, data: cancelHash } = useWriteContract({
    mutation: {
      onError: (error) => {
        console.error('Cancel transaction error:', error)
      }
    }
  })

  // Wait for transactions
  const { isLoading: isSubscribeConfirming } = useWaitForTransactionReceipt({
    hash: subscribeHash,
  })

  const { isLoading: isCancelConfirming } = useWaitForTransactionReceipt({
    hash: cancelHash,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Update balance periodically
  useEffect(() => {
    if (subscription && subscription[3]) { // active
      const updateBalance = () => {
        const timeElapsed = BigInt(Math.floor(Date.now() / 1000)) - subscription[2] // lastUpdate
        const pricePerSecond = plan?.[0] || 0n
        const cost = timeElapsed * pricePerSecond
        const currentBalance = subscription[1] - cost
        setBalance(formatEther(currentBalance > 0n ? currentBalance : 0n))
      }

      updateBalance()
      const interval = setInterval(updateBalance, 1000)
      return () => clearInterval(interval)
    }
  }, [subscription, plan])

  const handleSubscribe = () => {
    console.log('Subscribing with amount:', amount)
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

  const isActive = subscription?.[3] || false

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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Premium Plan</h3>
      
      {plan && (
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">Price: {formatEther(plan[0])} ETH/second</p>
          <p className="text-sm text-gray-600">Name: {plan[2]}</p>
        </div>
      )}

      {isActive ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <p className="text-green-800 font-semibold">✅ Active Subscription</p>
            <p className="text-sm text-green-600">
              Balance: {balance} ETH
            </p>
          </div>
          
          <div className="space-y-2">
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount to add (ETH)"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleSubscribe}
              disabled={isSubscribing || isSubscribeConfirming}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg"
            >
              {isSubscribing || isSubscribeConfirming ? 'Adding...' : 'Add Balance'}
            </button>
          </div>

          <button
            onClick={handleCancel}
            disabled={isCancelling || isCancelConfirming}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg"
          >
            {isCancelling || isCancelConfirming ? 'Cancelling...' : 'Cancel Subscription'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount (ETH)"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleSubscribe}
            disabled={isSubscribing || isSubscribeConfirming}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg"
          >
            {isSubscribing || isSubscribeConfirming ? 'Subscribing...' : 'Subscribe Now'}
          </button>
        </div>
      )}
    </div>
  )
}