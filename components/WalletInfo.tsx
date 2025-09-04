import { useAccount, useBalance } from 'wagmi'
import { somniaTestnet } from '../lib/config'

export default function WalletInfo() {
  const { address } = useAccount()
  
  const { data: balance } = useBalance({
    address,
    chainId: somniaTestnet.id,
  })

  if (!address) return null

  return (
    <div className="bg-[color:var(--usp-bg)] rounded-lg shadow-lg p-4 mb-6">
      <h3 className="text-lg font-bold mb-2">💳 Wallet Info</h3>
      <div className="space-y-2 text-sm">
        <p><span className="font-semibold">Address:</span> {address}</p>
        <p><span className="font-semibold">STT Balance:</span> {balance ? `${parseFloat(balance.formatted).toFixed(4)} STT` : 'Loading...'}</p>
        <p className="text-xs text-gray-600">
          💡 Subscription payments are deducted from your connected wallet's STT balance
        </p>
      </div>
    </div>
  )
}