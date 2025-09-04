import { X } from 'lucide-react'
import SubscribeCard from './SubscribeCard'
import WalletInfo from './WalletInfo'
import { cn } from '../lib/utils'

interface SubscribeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={cn(
          "relative rounded-lg border shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden",
          "border-[color:var(--usp-foreground)]/20 bg-[color:var(--usp-bg)]"
        )}
        style={{
          ["--usp-blue" as any]: "#00B2FF",
          ["--usp-purple" as any]: "#7A5CFF",
          ["--usp-pink" as any]: "#FF3D9A",
          ["--usp-bg" as any]: "#0B0F1A",
          ["--usp-foreground" as any]: "#F5F7FA",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[color:var(--usp-foreground)]/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[color:var(--usp-blue)] via-[color:var(--usp-purple)] to-[color:var(--usp-pink)] flex items-center justify-center">
              <span className="text-white text-sm">🚀</span>
            </div>
            <h2 className="text-xl font-semibold text-[color:var(--usp-foreground)]">
              Universal Subscription
            </h2>
          </div>
          
          <button
            onClick={onClose}
            className={cn(
              "p-2 rounded-lg transition-colors",
              "text-[color:var(--usp-foreground)]/60 hover:text-[color:var(--usp-foreground)]",
              "hover:bg-[color:var(--usp-foreground)]/10"
            )}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <WalletInfo />
          <SubscribeCard />
          
          {/* Info section */}
          <div className="mt-6 p-4 rounded-lg border border-[color:var(--usp-blue)]/20 bg-[color:var(--usp-blue)]/5">
            <h3 className="font-medium text-[color:var(--usp-blue)] mb-3">🎯 What you get:</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✅</span>
                <span className="text-[color:var(--usp-foreground)]/80">Premium content</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✅</span>
                <span className="text-[color:var(--usp-foreground)]/80">NFT Access Pass</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✅</span>
                <span className="text-[color:var(--usp-foreground)]/80">Real-time tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✅</span>
                <span className="text-[color:var(--usp-foreground)]/80">Instant cancellation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: "radial-gradient(ellipse at top right, rgba(0,178,255,0.1) 0%, transparent 50%)"
          }}
        />
      </div>
    </div>
  )
}