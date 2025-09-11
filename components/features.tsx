"use client"

import type React from "react"
import { cn } from "../lib/utils"


export default function Features() {
  const items = [
    {
      title: "Streaming Subscriptions",
      desc: "Funds stream per second using on-chain primitives for real-time settlement.",
      icon: "⟲",
    },
    {
      title: "Cancel Anytime",
      desc: "Subscription control remains with users. Stop streams instantly—no lock-ins.",
      icon: "✕",
    },
    {
      title: "NFT Access Pass",
      desc: "Gate premium features with transferable, verifiable on-chain access tokens.",
      icon: "◆",
    },
    {
      title: "Pay-Per-Use",
      desc: "Only pay for what you consume. Granular metering built into the protocol.",
      icon: "◎",
    },
  ]

  return (
    <section
      id="features"
      className={cn(
        "relative w-full px-6 py-16 md:py-24", // w-full (full-bleed) and padding stays here
        "bg-[color:var(--usp-bg)]", // apply dark background token
        "text-[color:var(--usp-foreground)]",
      )}
      style={
        {
          // keep color tokens consistent with Hero
          ["--usp-blue" as any]: "#00B2FF",
          ["--usp-purple" as any]: "#7A5CFF",
          ["--usp-pink" as any]: "#FF3D9A",
          ["--usp-bg" as any]: "#0B0F1A",
          ["--usp-foreground" as any]: "#F5F7FA",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-semibold md:text-4xl">Built for On‑Chain Subscriptions</h2>
          <p className="mt-3 text-base leading-relaxed text-[color:var(--usp-foreground)]/70 md:text-lg">
            Bold, crypto-native primitives for modern payment flows—optimized for dev velocity and user control.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 md:gap-6">
          {items.map((item) => (
            <FeatureCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  title,
  desc,
  icon,
}: {
  title: string
  desc: string
  icon: string
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "border border-[color:var(--usp-foreground)]/10",
        "bg-[color:var(--usp-foreground)]/5 backdrop-blur",
        "transition-transform duration-300 will-change-transform",
        "hover:-translate-y-1.5",
      )}
    >
      {/* neon border on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(0,178,255,0.35), 0 0 24px rgba(122,92,255,0.20)",
        }}
      />

      {/* accent gradient sweep on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -top-24 h-32 translate-y-0 bg-gradient-to-r from-[color:var(--usp-blue)] via-[color:var(--usp-purple)] to-[color:var(--usp-pink)] opacity-0 blur-2xl transition-all duration-500 group-hover:translate-y-8 group-hover:opacity-40"
      />

      <div className="relative p-6 md:p-7">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl",
              "bg-[color:var(--usp-foreground)]/10 text-[color:var(--usp-foreground)]",
              "shadow-[0_0_12px_rgba(0,178,255,0.25)]",
            )}
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
            }}
          >
            <span aria-hidden className="text-lg">
              {icon}
            </span>
            <span className="sr-only">{title} icon</span>
          </div>
          <h3 className="text-lg font-medium md:text-xl">{title}</h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--usp-foreground)]/75 md:text-base">{desc}</p>
      </div>
    </div>
  )
}
