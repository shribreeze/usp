import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { metaMask } from 'wagmi/connectors'
import SubscribeCard from '../components/SubscribeCard'
import GatedContent from '../components/GatedContent'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Universal Subscription Protocol
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              The Stripe of Web3 - Fully On-Chain Subscriptions
            </p>
            <div className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg inline-block">
              Loading...
            </div>
          </header>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Universal Subscription Protocol
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The Stripe of Web3 - Fully On-Chain Subscriptions
          </p>
          
          {!isConnected ? (
            <button
              onClick={() => connect({ connector: metaMask() })}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <span className="text-sm text-gray-600">
                Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <button
                onClick={() => disconnect()}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Disconnect
              </button>
            </div>
          )}
        </header>

        {isConnected && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Subscription Plans</h2>
              <SubscribeCard />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Premium Content</h2>
              <GatedContent />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}