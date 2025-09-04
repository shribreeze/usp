import { useState } from 'react'
import { X } from 'lucide-react'
import SubscribeCard from './SubscribeCard'
import WalletInfo from './WalletInfo'

interface SubscribeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        {/* Content */}
         <div className="pr-8 overflow-y-auto max-h-[80vh]">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Universal Subscription Plans
          </h2>
          <WalletInfo />
          <SubscribeCard />
          {/*<h2 className="text-2xl font-bold text-gray-900 mb-4">
            🚀 Universal Subscription Protocol
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-lg mb-2">💡 How it works:</h3>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Stream payments per second</strong> - Pay only for what you use</li>
                <li>• <strong>Instant NFT access</strong> - Get premium content immediately</li>
                <li>• <strong>Cancel anytime</strong> - Get refund of remaining balance</li>
                <li>• <strong>Fully on-chain</strong> - Transparent and decentralized</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">📊 Pricing</h4>
              <p className="text-sm text-blue-800">
                <strong>0.0000001 STT per second</strong><br/>
                That's only ~0.0086 STT per day!
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">🎁 What you get</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>✅ Premium content access</li>
                <li>✅ NFT Access Pass</li>
                <li>✅ Real-time balance tracking</li>
                <li>✅ Instant cancellation</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Connect your wallet and scroll down to start subscribing!
            </p>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              Got it! Let's go 🎉
            </button>
          </div>*/}
        </div> 
      </div>
    </div>
  )
}