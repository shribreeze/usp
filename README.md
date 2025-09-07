# Universal Subscription Protocol (USP)
*The Stripe of Web3 - Fully On-Chain Subscriptions*

## 🚀 Overview
USP is a decentralized subscription protocol built on **Somnia Network** that enables streaming payments and NFT-based access control. Pay per second, cancel anytime, get instant refunds.

## ✨ Features
- ⚡ **Real-time streaming payments** - Pay 0.0000001 STT per second
- 🎫 **NFT Access Pass** - Automatic minting/burning for gated content
- 💰 **Instant cancellation** - Get refund of remaining balance
- 🔒 **Fully on-chain** - Transparent and decentralized
- 📱 **Modern Web3 UI** - Live balance updates and responsive design

## 🎯 Live Demo
**Deployed on Vercel:** [https://usp-somnia.vercel.app]

**Contract Addresses (Somnia Testnet):**
- SubscriptionManager: `0x5bB5f5C706904F2D3e205a1dC9EE1dff91B86CfF`
- NFTAccessPass: `0x2F58Cdb7d6DCD17A281f14f1aD935804Fc3cc1c9`

## 🛠 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/shribreeze/usp.git
cd usp-project/usp
pnpm install
```

### 2. Environment Setup
```bash
# Create .env file
echo "PRIVATE_KEY=your-private-key-here" > .env
```

### 3. Deploy Contracts (Optional)
```bash
# Deploy to Somnia testnet
npx hardhat run scripts/deploy.js --network somniaTestnet

# Update lib/config.ts with new addresses
```

### 4. Run Frontend
```bash
pnpm run dev
# Open http://localhost:3000
```

## 🏗 Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Next.js UI    │    │ SubscriptionMgr  │    │  NFTAccessPass  │
│   (Frontend)    │◄──►│   (Streaming)    │◄──►│   (ERC-721)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌────────▼────────┐             │
         └─────────────►│  Somnia Network │◄────────────┘
                        │   (Testnet)     │
                        └─────────────────┘
```

## 💡 How It Works

1. **Connect Wallet** - MetaMask to Somnia testnet
2. **Subscribe** - Pay STT to start streaming subscription  
3. **Get NFT** - Receive Access Pass NFT automatically
4. **Access Content** - Premium features unlock instantly
5. **Live Updates** - Watch balance decrease in real-time (0.0000001 STT/sec)
6. **Cancel Anytime** - Get refund of remaining balance

## 🔧 Smart Contracts

### SubscriptionManager.sol
- Creates subscription plans with per-second pricing
- Handles streaming payments and balance tracking
- Manages NFT minting/burning based on subscription status
- Provides instant cancellation with refunds

### NFTAccessPass.sol
- ERC-721 NFT representing active subscription
- Automatically minted on subscription
- Burned when subscription ends
- Used for access control in dApps

## 🌐 Network Configuration

### Somnia Testnet
- **Chain ID:** 50312
- **RPC:** https://dream-rpc.somnia.network
- **Explorer:** https://shannon-explorer.somnia.network
- **Currency:** STT

**Add to MetaMask:**
```json
{
  "chainId": "0xC458",
  "chainName": "Somnia Testnet",
  "rpcUrls": ["https://dream-rpc.somnia.network"],
  "nativeCurrency": {
    "name": "STT",
    "symbol": "STT",
    "decimals": 18
  },
  "blockExplorerUrls": ["https://shannon-explorer.somnia.network"]
}
```

## 📦 SDK Usage

```typescript
import { createUSPClient } from './lib/usp-sdk'

const uspClient = createUSPClient(provider, managerAddress, nftAddress, signer)

// Subscribe to plan
await uspClient.subscribe(1, "0.01") // Plan 1, 0.01 STT

// Check access
const hasAccess = await uspClient.checkAccess(userAddress)

// Cancel subscription
await uspClient.cancelSubscription()
```

## 🎨 Frontend Components

### Key Components
- **Hero.tsx** - Landing page with gradient background
- **SubscribeCard.tsx** - Subscription interface with live updates
- **SubscribeModal.tsx** - Popup subscription flow
- **WalletInfo.tsx** - Connected wallet details
- **GatedContent.tsx** - Premium content with access control
- **Footer.tsx** - Responsive footer with links

### Design System
- **Colors:** Blue (#00B2FF), Purple (#7A5CFF), Pink (#FF3D9A)
- **Theme:** Dark background (#0B0F1A) with light text (#F5F7FA)
- **Gradients:** Used throughout for buttons and accents

## 🚀 Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Set **Root Directory** to `usp`
3. Deploy automatically on push

### Environment Variables
```bash
PRIVATE_KEY=your-private-key-for-contract-deployment
```

## 📁 Project Structure
```
usp/
├── components/          # React components
├── lib/                # Utilities and config
├── pages/              # Next.js pages
├── public/             # Static assets
├── contracts/          # Smart contracts
├── scripts/            # Deployment scripts
└── styles/             # CSS styles
```

## 🛠 Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Smart Contracts
npx hardhat compile     # Compile contracts
npx hardhat test        # Run tests
npx hardhat run scripts/deploy.js --network somniaTestnet
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request


## 🔗 Links
- **Website:** [https://usp-somnia.vercel.app](https://usp-somnia.vercel.app)
- **GitHub:** [https://github.com/shribreeze/usp](https://github.com/shribreeze/usp)
- **Somnia Network:** [https://somnia.network](https://somnia.network)

---
Built with ❤️ on Somnia Network 