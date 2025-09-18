import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { formatEther } from 'viem'
import { CONTRACTS } from '../../lib/config'
import { SUBSCRIPTION_MANAGER_ABI } from '../../lib/contracts'
import { cn } from '../../lib/utils'
import Link from 'next/link'
import GlobalToastProvider from '../../components/GlobalToastProvider'

const VIDEOS = {
  // Free videos
  'getting-started': {
    title: 'Getting Started Guide',
    duration: '5:30',
    file: '/videos/getting-started.mp4',
    description: 'Learn the basics and get started with our platform.',
    type: 'free'
  },
  'basic-setup': {
    title: 'Basic Setup Tutorial',
    duration: '7:15',
    file: '/videos/basic-setup.mp4', 
    description: 'Step-by-step guide to basic configuration and setup.',
    type: 'free'
  },
  'introduction': {
    title: 'Platform Introduction',
    duration: '4:45',
    file: '/videos/introduction.mp4',
    description: 'Overview of features and capabilities.',
    type: 'free'
  },
  // Premium videos
  'advanced-workflows': {
    title: 'Advanced Workflows & Automation',
    duration: '9:27',
    file: '/videos/advanced-workflows.mp4',
    description: 'Learn advanced automation techniques and workflow optimization strategies.',
    type: 'premium'
  },
  'scaling': {
    title: 'Scaling Best Practices',
    duration: '8:10', 
    file: '/videos/scaling.mp4',
    description: 'Discover proven methods for scaling your applications and infrastructure.',
    type: 'premium'
  },
  'security': {
    title: 'Security & Compliance Deep Dive',
    duration: '11:03',
    file: '/videos/security.mp4', 
    description: 'Comprehensive guide to security best practices and compliance requirements.',
    type: 'premium'
  }
}

export default function VideoPlayer() {
  const router = useRouter()
  const { id } = router.query
  const { address } = useAccount()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Read subscription data with real-time updates
  const { data: subscription } = useReadContract({
    address: CONTRACTS.SUBSCRIPTION_MANAGER as `0x${string}`,
    abi: SUBSCRIPTION_MANAGER_ABI,
    functionName: 'getSubscription',
    args: address ? [address] : undefined,
    query: { 
      enabled: !!address && mounted,
      refetchInterval: 2000 // Check every 2 seconds
    },
  })

  // Calculate real-time access
  const hasAccess = (() => {
    if (!subscription || !subscription[3]) return false
    
    const planId = Number(subscription[0])
    const pricePerSecond = planId === 1 
      ? 100000000000n    // Silver: 0.0000001 STT per second
      : 10000000000000n  // Gold: 0.00001 STT per second

    const now = BigInt(Math.floor(Date.now() / 1000))
    const timeElapsed = now - subscription[2]
    const cost = timeElapsed * pricePerSecond
    const currentBalance = subscription[1] - cost

    return currentBalance > 0n
  })()

  const video = VIDEOS[id as string]
  const isPremium = video?.type === 'premium'

  if (!mounted) {
    return (
      <GlobalToastProvider>
        <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </GlobalToastProvider>
    )
  }

  if (!video) {
    return (
      <GlobalToastProvider>
        <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-2xl mb-4">Video Not Found</h1>
            <Link href="/" className="text-blue-400 hover:underline">
              Return Home
            </Link>
          </div>
        </div>
      </GlobalToastProvider>
    )
  }

  // Check access for premium videos only
  if (isPremium && !hasAccess) {
    return (
      <GlobalToastProvider>
        <div 
          className="min-h-screen flex items-center justify-center"
          style={{ background: '#0B0F1A' }}
        >
          <div className="max-w-md mx-auto text-center p-8">
            <div className="text-6xl mb-6">🔒</div>
            <h1 className="text-2xl font-bold text-white mb-4">Premium Content Locked</h1>
            <p className="text-gray-300 mb-6">
              Subscribe to a plan to access "{video.title}"
            </p>
            <div className="space-y-3">
              <Link 
                href="/"
                className={cn(
                  "block w-full py-3 px-6 rounded-lg font-medium transition-all",
                  "bg-gradient-to-r from-[#00B2FF] to-[#7A5CFF]",
                  "text-white hover:scale-105"
                )}
              >
                Subscribe Now
              </Link>
              <Link 
                href="/"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </GlobalToastProvider>
    )
  }

  return (
    <GlobalToastProvider>
      <div 
        className="min-h-screen"
        style={{ background: '#0B0F1A' }}
      >
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <Link 
              href="/"
              className="text-gray-400 hover:text-white transition-colors mb-4 inline-block"
            >
              ← Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">{video.title}</h1>
            <p className="text-gray-300">{video.description}</p>
          </div>

          {/* Video Player */}
          <div className="bg-black rounded-lg overflow-hidden mb-6">
            <video 
              controls 
              className="w-full aspect-video"
              poster="/thumbnail1.jpg"
            >
              <source src={video.file} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video Info */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Duration: {video.duration}</span>
              <span className={cn(
                "px-3 py-1 rounded-full text-sm",
                isPremium 
                  ? "bg-green-500/20 text-green-300" 
                  : "bg-blue-500/20 text-blue-300"
              )}>
                {isPremium ? 'Premium Content' : 'Free Content'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </GlobalToastProvider>
  )
}