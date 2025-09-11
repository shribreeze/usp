"use client"

import type React from "react"
import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { metaMask } from 'wagmi/connectors'
import SubscribeModal from '../components/SubscribeModal'
import AIFloatingButton from '../components/AIFloatingButton'
import GlobalToastProvider from '../components/GlobalToastProvider'

import Link from "next/link"
import { cn } from "../lib/utils"
import HeroBackground from "./hero-background"
import Content from "./Content"

export default function Hero() {

  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
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
    <GlobalToastProvider>
      <section
        className={cn("relative overflow-hidden", "bg-[color:var(--usp-bg)] text-[color:var(--usp-foreground)]")}
        style={
          {
            // primary: blue, accents: purple + neon pink, neutrals: near-black + off-white
            ["--usp-blue" as any]: "#00B2FF",
            ["--usp-purple" as any]: "#7A5CFF",
            ["--usp-pink" as any]: "#FF3D9A",
            ["--usp-bg" as any]: "#0B0F1A",
            ["--usp-foreground" as any]: "#F5F7FA",
          } as React.CSSProperties
        }
      >
      <HeroBackground />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-32 text-center md:pb-28 md:pt-40">
        <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
          <span className="bg-gradient-to-r from-[color:var(--usp-blue)] via-[color:var(--usp-purple)] to-[color:var(--usp-pink)] bg-clip-text text-transparent">
            Universal Subscription Protocol
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[color:var(--usp-foreground)]/80 md:text-lg">
          The Stripe of Web3 - Fully On-Chain Subscriptions
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          {/* <div> */}
          {!isConnected ? (
            <button onClick={() => connect({ connector: metaMask() })}>
            <GlowButton href="" variant="primary">
              Connect Wallet
            </GlowButton>
          </button>
          ) : (
            <div className="flex items-center gap-4">
            <span className="bg-[color:var(--usp-bg)] text-sm text-gray-100">
                Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <button onClick={() => disconnect()}>
              <GlowButton href="" variant="primary">
                Disconnect
              </GlowButton>
            </button>
          </div>
          )}
          <button onClick={() => setIsModalOpen(true)}>
            <GlowButton href="" variant="outline">
              Subscribe Now
            </GlowButton>
          </button>
        </div>
      </div>

      <Content />

      <div id="connect" className="sr-only" aria-hidden />
      <div id="subscribe" className="sr-only" aria-hidden />
      
      <SubscribeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    
      <AIFloatingButton />
      
      </section>
    </GlobalToastProvider>
  )
}

function GlowButton({
  href,
  children,
  variant = "primary",
}: {
  href: string
  children: React.ReactNode
  variant?: "primary" | "outline"
}) {
  const onClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (href.startsWith("#")) {
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  if (variant === "outline") {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "relative rounded-full px-5 py-2.5 text-sm md:px-6 md:py-3 md:text-base",
          "transition-all duration-300",
          "border border-[color:var(--usp-foreground)]/20 text-[color:var(--usp-foreground)]/90",
          "hover:border-[color:var(--usp-blue)] hover:text-[color:var(--usp-foreground)]",
          "hover:shadow-[0_0_0_1px_var(--usp-blue)_inset,0_0_12px_0_rgba(0,178,255,0.35)]",
          "backdrop-blur supports-[backdrop-filter]:bg-[color:var(--usp-foreground)]/5",
        )}
      >
        {children}
      </Link>
    )
  }

  // primary
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative rounded-full px-5 py-2.5 text-sm text-black md:px-6 md:py-3 md:text-base",
        "transition-transform duration-300",
        "bg-gradient-to-r from-[color:var(--usp-blue)] via-[color:var(--usp-purple)] to-[color:var(--usp-pink)]",
        "hover:scale-[1.03] active:scale-[0.98]",
      )}
      style={{
        boxShadow: "0 0 22px rgba(0,178,255,0.35), 0 0 36px rgba(122,92,255,0.28), 0 0 28px rgba(255,61,154,0.25)",
      }}
    >
      <span className="relative z-10 font-medium">{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-60 blur-xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(0,178,255,0.45) 0%, rgba(122,92,255,0.34) 50%, rgba(255,61,154,0.28) 80%)",
        }}
      />
    </Link>
  )
}
