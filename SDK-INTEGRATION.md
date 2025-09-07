# USP SDK Integration Guide

## 🚀 Quick Integration

### 1. Install Dependencies
```bash
npm install ethers@^6.0.0
```

### 2. Copy SDK Files
Copy these files to your project:
```
your-project/
├── lib/
│   ├── usp-sdk.ts
│   └── contracts.ts
```

### 3. Basic Setup
```typescript
import { ethers } from 'ethers'
import { createUSPClient } from './lib/usp-sdk'

// Contract addresses (Somnia Testnet)
const SUBSCRIPTION_MANAGER = '0x5bB5f5C706904F2D3e205a1dC9EE1dff91B86CfF'
const NFT_ACCESS_PASS = '0x2F58Cdb7d6DCD17A281f14f1aD935804Fc3cc1c9'

// Initialize provider and signer
const provider = new ethers.BrowserProvider(window.ethereum)
const signer = await provider.getSigner()

// Create USP client
const uspClient = createUSPClient(
  provider,
  SUBSCRIPTION_MANAGER,
  NFT_ACCESS_PASS,
  signer
)
```

## 💡 Usage Examples

### Check User Access
```typescript
async function checkPremiumAccess(userAddress: string): Promise<boolean> {
  try {
    const hasAccess = await uspClient.checkAccess(userAddress)
    const hasNFT = await uspClient.hasNFTAccess(userAddress)
    
    return hasAccess && hasNFT
  } catch (error) {
    console.error('Access check failed:', error)
    return false
  }
}
```

### Subscribe User
```typescript
async function subscribeUser(depositAmount: string) {
  try {
    const tx = await uspClient.subscribe(1, depositAmount) // Plan 1
    console.log('Subscription started:', tx.hash)
    
    // Wait for confirmation
    await tx.wait()
    console.log('Subscription confirmed!')
    
    return tx.hash
  } catch (error) {
    console.error('Subscription failed:', error)
    throw error
  }
}
```

### Get Subscription Status
```typescript
async function getSubscriptionInfo(userAddress: string) {
  try {
    const subscription = await uspClient.getSubscription(userAddress)
    const currentBalance = await uspClient.calculateCurrentBalance(userAddress)
    
    return {
      isActive: subscription.active,
      balance: currentBalance,
      originalDeposit: subscription.balance,
      lastUpdate: new Date(subscription.lastUpdate * 1000)
    }
  } catch (error) {
    console.error('Failed to get subscription info:', error)
    return null
  }
}
```

### Cancel Subscription
```typescript
async function cancelSubscription() {
  try {
    const tx = await uspClient.cancelSubscription()
    console.log('Cancellation initiated:', tx.hash)
    
    await tx.wait()
    console.log('Subscription cancelled, refund processed!')
    
    return tx.hash
  } catch (error) {
    console.error('Cancellation failed:', error)
    throw error
  }
}
```

## 🎯 React Component Example

```typescript
import React, { useState, useEffect } from 'react'
import { createUSPClient } from './lib/usp-sdk'

function PremiumContent({ userAddress, provider, signer }) {
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)
  
  const uspClient = createUSPClient(
    provider,
    '0x5bB5f5C706904F2D3e205a1dC9EE1dff91B86CfF',
    '0x2F58Cdb7d6DCD17A281f14f1aD935804Fc3cc1c9',
    signer
  )

  useEffect(() => {
    checkAccess()
  }, [userAddress])

  const checkAccess = async () => {
    if (!userAddress) return
    
    try {
      const access = await uspClient.checkAccess(userAddress)
      setHasAccess(access)
    } catch (error) {
      console.error('Access check failed:', error)
      setHasAccess(false)
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async () => {
    try {
      setLoading(true)
      await uspClient.subscribe(1, "0.01") // 0.01 STT deposit
      await checkAccess() // Refresh access status
    } catch (error) {
      console.error('Subscription failed:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  if (!hasAccess) {
    return (
      <div className="premium-gate">
        <h3>🔒 Premium Content</h3>
        <p>Subscribe to unlock exclusive content!</p>
        <button onClick={handleSubscribe}>
          Subscribe (0.01 STT)
        </button>
      </div>
    )
  }

  return (
    <div className="premium-content">
      <h3>🎉 Welcome to Premium!</h3>
      <p>You have access to exclusive content.</p>
      {/* Your premium content here */}
    </div>
  )
}

export default PremiumContent
```

## 🌐 Network Configuration

### Add Somnia Testnet to MetaMask
```typescript
const somniaTestnet = {
  chainId: '0xC458', // 50312 in hex
  chainName: 'Somnia Testnet',
  rpcUrls: ['https://dream-rpc.somnia.network'],
  nativeCurrency: {
    name: 'STT',
    symbol: 'STT',
    decimals: 18
  },
  blockExplorerUrls: ['https://shannon-explorer.somnia.network']
}

// Add network to MetaMask
await window.ethereum.request({
  method: 'wallet_addEthereumChain',
  params: [somniaTestnet]
})
```

## 📦 Package.json Setup

```json
{
  "dependencies": {
    "ethers": "^6.13.4"
  }
}
```

## 🔧 TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true
  }
}
```

## 💰 Pricing Information

- **Rate:** 0.0000001 STT per second
- **Example deposits:**
  - 0.001 STT = ~2.8 hours
  - 0.01 STT = ~28 hours  
  - 0.1 STT = ~11.6 days
  - 1 STT = ~116 days

## 🚨 Error Handling

```typescript
try {
  await uspClient.subscribe(1, "0.01")
} catch (error) {
  if (error.code === 'INSUFFICIENT_FUNDS') {
    console.log('Not enough STT in wallet')
  } else if (error.code === 'USER_REJECTED') {
    console.log('User cancelled transaction')
  } else {
    console.log('Subscription failed:', error.message)
  }
}
```

## 📞 Support

- **Contracts:** Deployed on Somnia Testnet
- **Documentation:** See main README.md
- **Issues:** Create GitHub issue for bugs/questions