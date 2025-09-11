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
const SUBSCRIPTION_MANAGER = '0xC37011F5F79F26F4e19EBE7838b63A7754f66764'
const NFT_ACCESS_PASS = '0xf012e795f7f5670F8A2DfAdF14c92ACA647651b0'

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

### Subscribe User to Plans
```typescript
// Subscribe to Silver Plan (Premium Content)
async function subscribeToSilver(depositAmount: string) {
  try {
    const tx = await uspClient.subscribe(1, depositAmount) // Silver Plan
    console.log('Silver subscription started:', tx.hash)
    await tx.wait()
    return tx.hash
  } catch (error) {
    console.error('Silver subscription failed:', error)
    throw error
  }
}

// Subscribe to Gold Plan (Premium + AI)
async function subscribeToGold(depositAmount: string) {
  try {
    const tx = await uspClient.subscribe(2, depositAmount) // Gold Plan
    console.log('Gold subscription started:', tx.hash)
    await tx.wait()
    return tx.hash
  } catch (error) {
    console.error('Gold subscription failed:', error)
    throw error
  }
}

// Pay for AI request
async function payForAIRequest() {
  try {
    const tx = await uspClient.payForAI() // 0.000001 STT
    console.log('AI payment processed:', tx.hash)
    await tx.wait()
    return tx.hash
  } catch (error) {
    console.error('AI payment failed:', error)
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
    const remainingTime = await uspClient.calculateRemainingTime(userAddress)
    const hasGoldAccess = await uspClient.hasGoldAccess(userAddress)
    
    return {
      isActive: subscription.active,
      planId: subscription.planId,
      planType: subscription.planId === 1 ? 'Silver' : subscription.planId === 2 ? 'Gold' : 'AI',
      balance: currentBalance,
      remainingSeconds: remainingTime,
      originalDeposit: subscription.balance,
      lastUpdate: new Date(subscription.lastUpdate * 1000),
      hasGoldAccess
    }
  } catch (error) {
    console.error('Failed to get subscription info:', error)
    return null
  }
}

// Check specific plan access
async function checkPlanAccess(userAddress: string, planId: number) {
  try {
    return await uspClient.hasPlanAccess(userAddress, planId)
  } catch (error) {
    console.error('Plan access check failed:', error)
    return false
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

## 🎯 React Component Examples

### Multi-Plan Subscription Component
```typescript
import React, { useState, useEffect } from 'react'
import { createUSPClient } from './lib/usp-sdk'

function SubscriptionManager({ userAddress, provider, signer }) {
  const [subscription, setSubscription] = useState(null)
  const [balance, setBalance] = useState('0')
  const [timeLeft, setTimeLeft] = useState(0)
  const [loading, setLoading] = useState(true)
  
  const uspClient = createUSPClient(
    provider,
    '0xC37011F5F79F26F4e19EBE7838b63A7754f66764',
    '0xf012e795f7f5670F8A2DfAdF14c92ACA647651b0',
    signer
  )

  useEffect(() => {
    checkSubscription()
    const interval = setInterval(updateBalance, 1000)
    return () => clearInterval(interval)
  }, [userAddress])

  const checkSubscription = async () => {
    if (!userAddress) return
    
    try {
      const sub = await uspClient.getSubscription(userAddress)
      setSubscription(sub)
      await updateBalance()
    } catch (error) {
      console.error('Subscription check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateBalance = async () => {
    if (!userAddress) return
    
    try {
      const currentBalance = await uspClient.calculateCurrentBalance(userAddress)
      const remainingTime = await uspClient.calculateRemainingTime(userAddress)
      setBalance(currentBalance)
      setTimeLeft(remainingTime)
    } catch (error) {
      console.error('Balance update failed:', error)
    }
  }

  const handleSubscribe = async (planId: number, amount: string) => {
    try {
      setLoading(true)
      await uspClient.subscribe(planId, amount)
      await checkSubscription()
    } catch (error) {
      console.error('Subscription failed:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="subscription-manager">
      {subscription?.active ? (
        <div className="active-subscription">
          <h3>🔥 {subscription.planId === 1 ? 'Silver' : 'Gold'} Plan Active</h3>
          <p>Balance: {balance} STT</p>
          <p>Time Left: {Math.floor(timeLeft / 3600)}h {Math.floor((timeLeft % 3600) / 60)}m</p>
          {timeLeft <= 15 && timeLeft > 0 && (
            <div className="alert">⚠️ Subscription expiring soon!</div>
          )}
        </div>
      ) : (
        <div className="subscription-plans">
          <h3>Choose Your Plan</h3>
          <div className="plans">
            <div className="plan silver">
              <h4>🥈 Silver Plan</h4>
              <p>Premium content access</p>
              <p>0.0000001 STT/sec (~28h for 0.01 STT)</p>
              <button onClick={() => handleSubscribe(1, "0.01")}>
                Subscribe Silver
              </button>
            </div>
            <div className="plan gold">
              <h4>🥇 Gold Plan</h4>
              <p>Premium content + AI chat</p>
              <p>0.00001 STT/sec (~2.8h for 0.01 STT)</p>
              <button onClick={() => handleSubscribe(2, "0.01")}>
                Subscribe Gold
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

### AI Chat Component
```typescript
function AIChat({ userAddress, provider, signer }) {
  const [hasGoldAccess, setHasGoldAccess] = useState(false)
  const [freeRequests, setFreeRequests] = useState(5)
  
  const uspClient = createUSPClient(provider, SUBSCRIPTION_MANAGER, NFT_ACCESS_PASS, signer)

  useEffect(() => {
    checkGoldAccess()
  }, [userAddress])

  const checkGoldAccess = async () => {
    if (!userAddress) return
    const hasGold = await uspClient.hasGoldAccess(userAddress)
    setHasGoldAccess(hasGold)
  }

  const handleAIRequest = async (prompt: string) => {
    if (!hasGoldAccess) return
    
    if (freeRequests <= 0) {
      // Pay for AI request
      await uspClient.payForAI()
    } else {
      setFreeRequests(prev => prev - 1)
    }
    
    // Process AI request...
  }

  if (!hasGoldAccess) {
    return (
      <div className="ai-locked">
        <h3>🤖 AI Assistant</h3>
        <p>Upgrade to Gold plan to access AI chat</p>
      </div>
    )
  }

  return (
    <div className="ai-chat">
      <h3>🤖 AI Assistant</h3>
      <p>{freeRequests > 0 ? `${freeRequests} free requests` : 'Pay per request'}</p>
      {/* AI chat interface */}
    </div>
  )
}

export { SubscriptionManager, AIChat }
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

### Silver Plan (ID: 1)
- **Rate:** 0.0000001 STT per second
- **Features:** Premium content access
- **Example deposits:**
  - 0.001 STT = ~2.8 hours
  - 0.01 STT = ~28 hours  
  - 0.1 STT = ~11.6 days

### Gold Plan (ID: 2)
- **Rate:** 0.00001 STT per second
- **Features:** Premium content + AI chat + 5 free AI requests
- **Example deposits:**
  - 0.001 STT = ~1.7 minutes
  - 0.01 STT = ~2.8 hours
  - 0.1 STT = ~28 hours

### AI Pay-per-use (ID: 3)
- **Rate:** 0.000001 STT per request
- **Features:** Individual AI requests for Gold users

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

## 🆕 New SDK Methods

```typescript
// Get all available plans
const plans = await uspClient.getAllPlans()

// Calculate remaining time
const timeLeft = await uspClient.calculateRemainingTime(userAddress)

// Check specific plan access
const hasGold = await uspClient.hasGoldAccess(userAddress)
const hasSilver = await uspClient.hasPlanAccess(userAddress, 1)

// Pay for AI request
await uspClient.payForAI('0.000001')
```

## 📞 Support

- **Contracts:** Deployed on Somnia Testnet
- **Documentation:** See main README.md and SDK.md
- **Issues:** Create GitHub issue for bugs/questions