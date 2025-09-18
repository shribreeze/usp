import Link from "next/link"
import { cn } from "../lib/utils"

export default function Footer() {
  return (
    <footer 
      className={cn(
        "relative border-t border-[color:var(--usp-foreground)]/10",
        "bg-[color:var(--usp-bg)] text-[color:var(--usp-foreground)]"
      )}
      style={{
        ["--usp-blue" as any]: "#00B2FF",
        ["--usp-purple" as any]: "#7A5CFF", 
        ["--usp-pink" as any]: "#FF3D9A",
        ["--usp-bg" as any]: "#0B0F1A",
        ["--usp-foreground" as any]: "#F5F7FA",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">
              <span className="bg-gradient-to-r from-[color:var(--usp-blue)] via-[color:var(--usp-purple)] to-[color:var(--usp-pink)] bg-clip-text text-transparent">
                USP
              </span>
            </h3>
            <p className="text-sm text-[color:var(--usp-foreground)]/70 leading-relaxed">
              Universal Subscription Protocol - The future of on-chain subscriptions with streaming payments and NFT access control.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-medium mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#features" className="text-[color:var(--usp-foreground)]/70 hover:text-[color:var(--usp-blue)] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-[color:var(--usp-foreground)]/70 hover:text-[color:var(--usp-blue)] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="https://github.com/shribreeze/usp/blob/main/README.md" className="text-[color:var(--usp-foreground)]/70 hover:text-[color:var(--usp-blue)] transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="font-medium mb-4">Developers</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="https://github.com/shribreeze/usp/blob/main/lib/usp-sdk.ts" className="text-[color:var(--usp-foreground)]/70 hover:text-[color:var(--usp-purple)] transition-colors">
                  SDK
                </Link>
              </li>
              <li>
                <Link href="https://github.com/shribreeze/usp" className="text-[color:var(--usp-foreground)]/70 hover:text-[color:var(--usp-purple)] transition-colors">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="https://usp-somnia.vercel.app/" className="text-[color:var(--usp-foreground)]/70 hover:text-[color:var(--usp-purple)] transition-colors">
                  Examples
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-medium mb-4">Community</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#discord" className="text-[color:var(--usp-foreground)]/70 hover:text-[color:var(--usp-pink)] transition-colors">
                  Discord
                </Link>
              </li>
              <li>
                <Link href="#twitter" className="text-[color:var(--usp-foreground)]/70 hover:text-[color:var(--usp-pink)] transition-colors">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#support" className="text-[color:var(--usp-foreground)]/70 hover:text-[color:var(--usp-pink)] transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[color:var(--usp-foreground)]/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-[color:var(--usp-foreground)]/70">
              <Link href="#privacy" className="hover:text-[color:var(--usp-foreground)] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#terms" className="hover:text-[color:var(--usp-foreground)] transition-colors">
                Terms of Service
              </Link>
            </div>
            
            <div className="text-sm text-[color:var(--usp-foreground)]/70">
              © 2025 Universal Subscription Protocol. Built on Somnia Network.
            </div>
          </div>
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(ellipse at top, rgba(0,178,255,0.05) 0%, transparent 50%)"
        }}
      />
    </footer>
  )
}