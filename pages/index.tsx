import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { metaMask } from 'wagmi/connectors'
import SubscribeCard from '../components/SubscribeCard'
import GatedContent from '../components/GatedContent'
import WalletInfo from '../components/WalletInfo'
import Features from '../components/features'
import Hero from '../components/hero'
import Footer from '../components/Footer'

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
      <Hero />
      <Features />
      <Footer />
    </div> 
  )
}