import { useState, useEffect } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { CONTRACTS, somniaTestnet } from '../lib/config'
import { SUBSCRIPTION_MANAGER_ABI, NFT_ACCESS_PASS_ABI } from '../lib/contracts'

export default function GatedContent() {
  const { address } = useAccount()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Check access via subscription manager
  const { data: hasAccess } = useReadContract({
    address: CONTRACTS.SUBSCRIPTION_MANAGER as `0x${string}`,
    abi: SUBSCRIPTION_MANAGER_ABI,
    functionName: 'checkAccess',
    args: [address!],
    query: { enabled: !!address && mounted },
  })

  // Check NFT ownership
  const { data: hasNFT } = useReadContract({
    address: CONTRACTS.NFT_ACCESS_PASS as `0x${string}`,
    abi: NFT_ACCESS_PASS_ABI,
    functionName: 'balanceOf',
    args: [address!],
    query: { enabled: !!address && mounted },
  })

  if (!mounted) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  const nftBalance = hasNFT ? Number(hasNFT) : 0

  if (!hasAccess || nftBalance === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔒</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Content Locked</h3>
          <p className="text-gray-600 mb-6">
            Subscribe to unlock exclusive content and get your NFT Access Pass!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 font-semibold">🎉 Access Granted! NFT Pass Active</p>
      </div>
      <div className="space-y-6">
        <div className="border-l-4 border-blue-500 pl-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Premium Content</h3>
          <p className="text-gray-700">Welcome to exclusive content area!</p>
          <p className="text-sm text-gray-600 mt-2">NFT Balance: {nftBalance}</p>
        </div>
      </div>
    </div>
  )
}