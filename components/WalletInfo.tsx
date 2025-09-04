import { useAccount, useBalance } from 'wagmi'
import { somniaTestnet } from '../lib/config'
import { cn } from '../lib/utils'

export default function WalletInfo() {
  const { address } = useAccount()
  
  const { data: balance } = useBalance({
    address,
    chainId: somniaTestnet.id,
  })

  if (!address) return null

  return (
    <div 
      className={cn(
        "rounded-lg border p-4 mb-6",
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
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[color:var(--usp-blue)] to-[color:var(--usp-purple)] flex items-center justify-center">
          <span className="text-white text-sm font-bold">💳</span>
        </div>
        <h3 className="font-semibold text-[color:var(--usp-foreground)]">Connected Wallet</h3>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-[color:var(--usp-foreground)]/70">Address:</span>
          <code className="text-xs bg-[color:var(--usp-foreground)]/10 px-2 py-1 rounded font-mono">
            {address.slice(0, 6)}...{address.slice(-4)}
          </code>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-[color:var(--usp-foreground)]/70">STT Balance:</span>
          <span className="font-medium text-[color:var(--usp-blue)]">
            {balance ? `${parseFloat(balance.formatted).toFixed(4)} STT` : 'Loading...'}
          </span>
        </div>
      </div>
      
      <div className="mt-3 p-2 bg-[color:var(--usp-blue)]/10 rounded text-xs text-[color:var(--usp-foreground)]/80">
        💡 Subscription payments are deducted from this wallet's STT balance
      </div>
    </div>
  )
}