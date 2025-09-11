# USP SDK Documentation

## Overview
The USP SDK provides a simple interface to interact with the Universal Subscription Protocol smart contracts on Somnia Network.

## Installation
```typescript
import { createUSPClient } from './lib/usp-sdk'
```

## Quick Start
```typescript
const uspClient = createUSPClient(provider, managerAddress, nftAddress, signer)

// Subscribe to Silver plan
await uspClient.subscribe(1, "0.01")

// Subscribe to Gold plan  
await uspClient.subscribe(2, "0.01")

// Check access
const hasAccess = await uspClient.checkAccess(userAddress)

// Cancel subscription
await uspClient.cancelSubscription()
```

## API Reference

### Core Methods

#### `subscribe(planId: number, amount: string)`
Subscribe to a plan with STT payment.
- **planId**: 1 (Silver), 2 (Gold), 3 (AI Pay-per-use)
- **amount**: STT amount in ether format

#### `cancelSubscription()`
Cancel active subscription and get refund.

#### `checkAccess(userAddress: string)`
Check if user has active subscription access.

### Subscription Management

#### `getSubscription(userAddress: string)`
Get detailed subscription info:
```typescript
{
  planId: number,
  balance: string,
  lastUpdate: number,
  active: boolean
}
```

#### `calculateCurrentBalance(userAddress: string)`
Calculate real-time balance after deductions.

#### `calculateRemainingTime(userAddress: string)`
Get remaining subscription time in seconds.

#### `updateBalance(userAddress: string)`
Manually update balance on-chain.

### Plan Information

#### `getPlan(planId: number)`
Get plan details:
```typescript
{
  pricePerSecond: string,
  active: boolean,
  name: string
}
```

#### `getAllPlans()`
Get all available plans with IDs.

#### `hasPlanAccess(userAddress: string, planId: number)`
Check access to specific plan.

#### `hasGoldAccess(userAddress: string)`
Check Gold plan access (for AI features).

### AI Features

#### `payForAI(amount?: string)`
Pay for AI request (defaults to 0.000001 STT).

### NFT Access

#### `hasNFTAccess(userAddress: string)`
Check if user owns Access Pass NFT.

## Plan Types

### Silver Plan (ID: 1)
- **Rate**: 0.0000001 STT/second
- **Features**: Premium content access
- **Duration**: ~28 hours for 0.01 STT

### Gold Plan (ID: 2)  
- **Rate**: 0.00001 STT/second
- **Features**: Premium content + AI chat + 5 free AI requests
- **Duration**: ~2.8 hours for 0.01 STT

### AI Pay-per-use (ID: 3)
- **Rate**: 0.000001 STT per request
- **Features**: Individual AI requests for Gold users

## Usage Examples

### Basic Subscription Flow
```typescript
// Initialize client
const uspClient = createUSPClient(provider, managerAddress, nftAddress, signer)

// Subscribe to Gold plan
const tx = await uspClient.subscribe(2, "0.01")
await tx.wait()

// Check real-time balance
const balance = await uspClient.calculateCurrentBalance(userAddress)
console.log(`Current balance: ${balance} STT`)

// Check remaining time
const timeLeft = await uspClient.calculateRemainingTime(userAddress)
console.log(`Time remaining: ${timeLeft} seconds`)
```

### AI Integration
```typescript
// Check Gold access for AI features
const hasGold = await uspClient.hasGoldAccess(userAddress)

if (hasGold) {
  // Pay for AI request
  await uspClient.payForAI()
}
```

### Real-time Balance Monitoring
```typescript
// Monitor balance with countdown
setInterval(async () => {
  const balance = await uspClient.calculateCurrentBalance(userAddress)
  const timeLeft = await uspClient.calculateRemainingTime(userAddress)
  
  if (timeLeft <= 15 && timeLeft > 0) {
    showExpiryAlert()
  }
}, 1000)
```

## Error Handling
```typescript
try {
  await uspClient.subscribe(1, "0.01")
} catch (error) {
  if (error.message.includes('Signer required')) {
    // Connect wallet first
  }
  // Handle other errors
}
```

## Contract Addresses (Somnia Testnet)
- SubscriptionManager: `0xC37011F5F79F26F4e19EBE7838b63A7754f66764`
- NFTAccessPass: `0xf012e795f7f5670F8A2DfAdF14c92ACA647651b0`
