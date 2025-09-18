import { useState, useEffect } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { CONTRACTS, somniaTestnet } from '../lib/config'
import { SUBSCRIPTION_MANAGER_ABI, NFT_ACCESS_PASS_ABI } from '../lib/contracts'


type VideoCard = {
  title: string
  href: string
  thumb: string
  alt: string
  tag?: string
  duration?: string
}

const PREMIUM_VIDEOS: VideoCard[] = [
  {
    title: "Advanced Workflows & Automation",
    href: "/video/advanced-workflows",
    thumb: "/thumbnail2.jpg",
    alt: "Video thumbnail: Advanced Workflows & Automation",
    tag: "Premium",
    duration: "9:27",
  },
  {
    title: "Scaling Best Practices",
    href: "/video/scaling",
    thumb: "/thumbnail1.jpg",
    alt: "Video thumbnail: Scaling Best Practices",
    tag: "Premium",
    duration: "8:10",
  },
  {
    title: "Security & Compliance Deep Dive",
    href: "/video/security",
    thumb: "/thumbnail2.jpg",
    alt: "Video thumbnail: Security & Compliance",
    tag: "Premium",
    duration: "11:03",
  },
]

export function PremiumContents() {
    const { address } = useAccount()
    const [mounted, setMounted] = useState(false)

    
    useEffect(() => {
      setMounted(true)
    }, [])
  
    // Check access via subscription manager
    const { data: hasAccess, refetch: refetchAccess } = useReadContract({
      address: CONTRACTS.SUBSCRIPTION_MANAGER as `0x${string}`,
      abi: SUBSCRIPTION_MANAGER_ABI,
      functionName: 'checkAccess',
      args: [address!],
      query: { enabled: !!address && mounted },
    })
  
    // Check NFT ownership
    const { data: hasNFT, refetch: refetchNFT } = useReadContract({
      address: CONTRACTS.NFT_ACCESS_PASS as `0x${string}`,
      abi: NFT_ACCESS_PASS_ABI,
      functionName: 'balanceOf',
      args: [address!],
      query: { enabled: !!address && mounted },
    })
  
    // Refresh access status periodically
    useEffect(() => {
      if (mounted && address) {
        const interval = setInterval(() => {
          refetchAccess()
          refetchNFT()
        }, 3000)
        return () => clearInterval(interval)
      }
    }, [mounted, address, refetchAccess, refetchNFT])
  
    if (!mounted) {
      return (
        <div className="bg-[color:var(--usp-bg)] rounded-lg shadow-lg p-6">
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
      <section aria-labelledby="premium-contents-heading" className="w-full mt-24">
        <header className="mb-4 md:mb-6">
          <h2 id="premium-contents-heading" className="text-xl md:text-2xl font-semibold text-pretty">
            Premium contents
          </h2>
          <p className="text-sm md:text-base text-[color:var(--usp-foreground)]/70 mt-1">
            Subscribe to unlock exclusive content and get your NFT Access Pass!
          </p>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" role="list">
          {PREMIUM_VIDEOS.map((v) => (
            <li key={v.href}>
              <div className="group block overflow-hidden rounded-lg border border-[color:var(--usp-foreground)]/10 bg-[color:var(--usp-foreground)]/5 hover:bg-[color:var(--usp-foreground)]/10 transition-colors">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={v.thumb}
                    alt={v.alt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] opacity-50"
                    onError={(e) => {
                      e.target.src = '/placeholder.svg'
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🔒</div>
                      <p className="text-white text-sm font-medium">Premium Only</p>
                    </div>
                  </div>

                  <div className="absolute left-2 top-2">
                    <span className="rounded-full border border-[color:var(--usp-foreground)]/20 bg-[color:var(--usp-bg)]/80 px-2 py-0.5 text-xs">
                      {v.tag ?? "Premium"}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium leading-6">{v.title}</h3>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  return (
    <section aria-labelledby="premium-contents-heading" className="w-full mt-24">
        <header className="mb-4 md:mb-6">
          <h2 id="premium-contents-heading" className="text-xl md:text-2xl font-semibold text-pretty">
            Premium contents
          </h2>
          <p className="text-sm md:text-base text-[color:var(--usp-foreground)]/70 mt-1">
            In-depth lessons and advanced strategies. Upgrade to unlock all content.
          </p>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" role="list">
          {PREMIUM_VIDEOS.map((v) => (
            <li key={v.href}>
              <a
                href={v.href}
                className="group block overflow-hidden rounded-lg border border-[color:var(--usp-foreground)]/10 bg-[color:var(--usp-foreground)]/5 hover:bg-[color:var(--usp-foreground)]/10 transition-colors"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={v.thumb}
                    alt={v.alt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    onError={(e) => {
                      e.target.src = '/placeholder.svg'
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--usp-foreground)]/20 bg-[color:var(--usp-bg)]/70 backdrop-blur-sm transition-opacity duration-300 opacity-90 group-hover:opacity-100">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="text-[color:var(--usp-foreground)]"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span className="sr-only">Play video</span>
                    </span>
                  </div>

                  <div className="absolute left-2 top-2">
                    <span className="rounded-full border border-[color:var(--usp-foreground)]/20 bg-[color:var(--usp-bg)]/80 px-2 py-0.5 text-xs">
                      {v.tag ?? "Premium"}
                    </span>
                  </div>

                  {v.duration ? (
                    <span className="absolute bottom-2 right-2 rounded bg-[color:var(--usp-bg)]/80 px-2 py-0.5 text-xs border border-[color:var(--usp-foreground)]/15">
                      {v.duration}
                    </span>
                  ) : null}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium leading-6">{v.title}</h3>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
  )
}