# Universal Subscription Protocol (USP)
*The Stripe of Web3 - Fully On-Chain Subscriptions*

## 🚀 Overview
USP is a decentralized subscription protocol built on **Somnia Network** that enables streaming payments and NFT-based access control. Pay per second, cancel anytime, get instant refunds.

## ✨ Features
- ⚡ **Multi-tier streaming payments** - Silver (0.0000001 STT/sec) & Gold (0.00001 STT/sec)
- 🤖 **AI Chat Integration** - Gemini 2.0 Flash API with contextual responses
- 🎫 **NFT Access Pass** - Automatic minting/burning for gated content
- 💰 **Instant cancellation** - Get refund of remaining balance
- ⏰ **Smart alerts** - 15-second expiry warnings with toast notifications
- 🔒 **Fully on-chain** - Transparent and decentralized
- 📱 **Modern Web3 UI** - Live balance countdown and responsive design

## 🎯 Live Demo
**Deployed on Vercel:** [https://usp-somnia.vercel.app]

**Contract Addresses (Somnia Testnet):**
- SubscriptionManager: `0xC37011F5F79F26F4e19EBE7838b63A7754f66764`
- NFTAccessPass: `0xf012e795f7f5670F8A2DfAdF14c92ACA647651b0`

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
2. **Choose Plan** - Silver (premium content) or Gold (premium + AI chat)
3. **Subscribe** - Pay STT to start streaming subscription  
4. **Get NFT** - Receive Access Pass NFT automatically
5. **Access Features** - Premium content + AI assistant (Gold only)
6. **Live Updates** - Real-time balance countdown with smart alerts
7. **AI Chat** - 5 free requests for Gold users, then pay-per-use
8. **Cancel Anytime** - Get refund of remaining balance

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

// Subscribe to Silver plan
await uspClient.subscribe(1, "0.01") // Silver: 0.0000001 STT/sec

// Subscribe to Gold plan
await uspClient.subscribe(2, "0.01") // Gold: 0.00001 STT/sec

// Check Gold access for AI features
const hasGold = await uspClient.hasGoldAccess(userAddress)

// Pay for AI request
if (hasGold) await uspClient.payForAI()

// Get real-time balance
const balance = await uspClient.calculateCurrentBalance(userAddress)
const timeLeft = await uspClient.calculateRemainingTime(userAddress)

// Cancel subscription
await uspClient.cancelSubscription()
```

## 🎨 Frontend Components

### Key Components
- **Hero.tsx** - Landing page with gradient background
- **SubscribeCard.tsx** - Multi-plan interface with live countdown & alerts
- **SubscribeModal.tsx** - Popup subscription flow
- **AIChatModal.tsx** - AI assistant with Gemini 2.0 Flash integration
- **AIFloatingButton.tsx** - Floating AI access button for Gold users
- **Toast.tsx** - Smart notification system for expiry alerts
- **GatedContent.tsx** - Premium content with plan-based access control
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

## 🎯 Subscription Plans

### 🥈 Silver Plan (ID: 1)
- **Rate**: 0.0000001 STT per second
- **Features**: Premium content access
- **Duration**: ~28 hours for 0.01 STT
- **Use Case**: Long-term content access

### 🥇 Gold Plan (ID: 2)
- **Rate**: 0.00001 STT per second  
- **Features**: Premium content + AI chat + 5 free AI requests
- **Duration**: ~2.8 hours for 0.01 STT
- **Use Case**: Interactive experience with AI assistance

### 🤖 AI Pay-per-use (ID: 3)
- **Rate**: 0.000001 STT per request
- **Features**: Individual AI requests for Gold users
- **Use Case**: Additional AI interactions beyond free quota

## 🤖 AI Integration

- **Model**: Gemini 2.0 Flash API
- **Context**: USP platform knowledge + Web3 expertise
- **Access**: Gold plan subscribers only
- **Free Quota**: 5 requests per Gold subscription
- **Pay-per-use**: 0.000001 STT per additional request
- **Features**: Auto-scroll, formatted responses, real-time chat

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request


## 📚 Documentation

- **SDK Integration**: [SDK-INTEGRATION.md](./SDK-INTEGRATION.md)
- **Smart Contracts**: [contracts/](./contracts/)
- **API Reference**: [pages/api/](./pages/api/)

## 🔗 Links
- **Website:** [https://usp-somnia.vercel.app](https://usp-somnia.vercel.app)
- **GitHub:** [https://github.com/shribreeze/usp](https://github.com/shribreeze/usp)
- **Somnia Network:** [https://somnia.network](https://somnia.network)
- **Gemini API:** [https://ai.google.dev](https://ai.google.dev)

---
Built with ❤️ on Somnia Network | Powered by Gemini 2.0 Flash 