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
  const { data: subscription } = useReadContract({
    address: CONTRACTS.SUBSCRIPTION_MANAGER as `0x${string}`,
    abi: SUBSCRIPTION_MANAGER_ABI,
    functionName: 'getSubscription',
    args: [address!],
    query: { enabled: !!address && mounted },
  })

  // Read plan data
  const { data: plan } = useReadContract({
    address: CONTRACTS.SUBSCRIPTION_MANAGER as `0x${string}`,
    abi: SUBSCRIPTION_MANAGER_ABI,
    functionName: 'getPlan',
    args: [1n],
    query: { enabled: mounted },
  })

  // Subscribe transaction
  const { writeContract: subscribe, isPending: isSubscribing } = useWriteContract()

  // Cancel transaction
  const { writeContract: cancel, isPending: isCancelling } = useWriteContract()

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
            <p className="text-sm text-green-600">Balance: {formatEther(subscription[1])} ETH</p>
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
              disabled={isSubscribing}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg"
            >
              {isSubscribing ? 'Adding...' : 'Add Balance'}
            </button>
          </div>

          <button
            onClick={handleCancel}
            disabled={isCancelling}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg"
          >
            {isCancelling ? 'Cancelling...' : 'Cancel Subscription'}
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