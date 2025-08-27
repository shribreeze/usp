# Universal Subscription Protocol (USP)
*The Stripe of Web3 - Fully On-Chain Subscriptions*

## Overview
USP is a decentralized subscription protocol built on Somnia Network that enables streaming payments and NFT-based access control.

## Features
- ⚡ Real-time streaming payments (per-second billing)
- 🎫 NFT Access Pass for gated content
- 💰 Instant subscription cancellation with refunds
- 🔒 Fully on-chain access control
- 📱 Modern Web3 frontend with live balance updates

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Deploy Contracts
```bash
# Install Hardhat dependencies
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Set your private key
export PRIVATE_KEY="your-private-key-here"

# Deploy to Somnia testnet
npx hardhat run scripts/deploy.js --network somniaTestnet
```

### 3. Update Contract Addresses
Update `lib/config.ts` with deployed contract addresses:
```typescript
export const CONTRACTS = {
  SUBSCRIPTION_MANAGER: '0xYourSubscriptionManagerAddress',
  NFT_ACCESS_PASS: '0xYourNFTAccessPassAddress',
}
```

### 4. Run Frontend
```bash
npm run dev
```

## Smart Contracts

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

## Frontend Components

### SubscribeCard.tsx
- Subscribe/cancel subscription interface
- Live balance updates every second
- Add balance to existing subscriptions

### GatedContent.tsx
- Example premium content area
- Checks both subscription status and NFT ownership
- Demonstrates access control integration

## SDK Usage

```typescript
import { createUSPClient } from './lib/usp-sdk'

const uspClient = createUSPClient(provider, managerAddress, nftAddress, signer)

// Subscribe to plan
await uspClient.subscribe(1, "0.1") // Plan 1, 0.1 ETH

// Check access
const hasAccess = await uspClient.checkAccess(userAddress)

// Cancel subscription
await uspClient.cancelSubscription()
```

## Network Configuration

### Somnia Testnet
- Chain ID: 50311
- RPC: https://testnet.somnia.network
- Explorer: https://testnet-explorer.somnia.network
- Currency: STT

Add to MetaMask:
1. Network Name: Somnia Testnet
2. RPC URL: https://testnet.somnia.network
3. Chain ID: 50311
4. Symbol: STT

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │ SubscriptionMgr  │    │  NFTAccessPass  │
│   (Next.js)     │◄──►│   (Streaming)    │◄──►│   (ERC-721)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌────────▼────────┐             │
         └─────────────►│  Somnia Network │◄────────────┘
                        │   (EVM Layer)   │
                        └─────────────────┘
```

## Demo Flow

1. **Connect Wallet** - MetaMask to Somnia testnet
2. **Subscribe** - Pay ETH to start streaming subscription
3. **Get NFT** - Receive Access Pass NFT automatically
4. **Access Content** - Premium features unlock instantly
5. **Live Updates** - Watch balance decrease in real-time
6. **Cancel Anytime** - Get refund of remaining balance

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy contracts
npx hardhat run scripts/deploy.js --network somniaTestnet
```

## License
MIT