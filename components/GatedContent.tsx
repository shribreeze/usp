import { useAccount, useReadContract } from 'wagmi'
import { CONTRACTS, somniaTestnet } from '../lib/config'
import { SUBSCRIPTION_MANAGER_ABI, NFT_ACCESS_PASS_ABI } from '../lib/contracts'

export default function GatedContent() {
  const { address } = useAccount()

  // Check access via subscription manager
  const { data: hasAccess } = useReadContract({
    address: CONTRACTS.SUBSCRIPTION_MANAGER as `0x${string}`,
    abi: SUBSCRIPTION_MANAGER_ABI,
    functionName: 'checkAccess',
    args: [address!],
    chainId: somniaTestnet.id,
  })

  // Check NFT ownership
  const { data: hasNFT } = useReadContract({
    address: CONTRACTS.NFT_ACCESS_PASS as `0x${string}`,
    abi: NFT_ACCESS_PASS_ABI,
    functionName: 'hasAccess',
    args: [address!],
    chainId: somniaTestnet.id,
  })

  if (!hasAccess || !hasNFT) {
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
          <p className="text-gray-700">Welcome to exclusive content!</p>
        </div>
      </div>
    </div>
  )
}