import { ethers } from 'ethers'
import { SUBSCRIPTION_MANAGER_ABI, NFT_ACCESS_PASS_ABI } from './contracts'

export class USPClient {
  private provider: ethers.Provider
  private signer?: ethers.Signer
  private subscriptionManager: ethers.Contract
  private nftAccessPass: ethers.Contract

  constructor(
    provider: ethers.Provider,
    subscriptionManagerAddress: string,
    nftAccessPassAddress: string,
    signer?: ethers.Signer
  ) {
    this.provider = provider
    this.signer = signer
    this.subscriptionManager = new ethers.Contract(
      subscriptionManagerAddress,
      SUBSCRIPTION_MANAGER_ABI,
      signer || provider
    )
    this.nftAccessPass = new ethers.Contract(
      nftAccessPassAddress,
      NFT_ACCESS_PASS_ABI,
      signer || provider
    )
  }

  // Subscribe to a plan
  async subscribe(planId: number, amount: string): Promise<ethers.TransactionResponse> {
    if (!this.signer) throw new Error('Signer required for transactions')
    
    return await this.subscriptionManager.subscribe(planId, {
      value: ethers.parseEther(amount)
    })
  }

  // Cancel subscription
  async cancelSubscription(): Promise<ethers.TransactionResponse> {
    if (!this.signer) throw new Error('Signer required for transactions')
    
    return await this.subscriptionManager.cancel()
  }

  // Check if user has access
  async checkAccess(userAddress: string): Promise<boolean> {
    return await this.subscriptionManager.checkAccess(userAddress)
  }

  // Get subscription details
  async getSubscription(userAddress: string) {
    const sub = await this.subscriptionManager.getSubscription(userAddress)
    return {
      planId: Number(sub.planId),
      balance: ethers.formatEther(sub.balance),
      lastUpdate: Number(sub.lastUpdate),
      active: sub.active
    }
  }

  // Get plan details
  async getPlan(planId: number) {
    const plan = await this.subscriptionManager.getPlan(planId)
    return {
      pricePerSecond: ethers.formatEther(plan.pricePerSecond),
      active: plan.active,
      name: plan.name
    }
  }

  // Check NFT ownership
  async hasNFTAccess(userAddress: string): Promise<boolean> {
    return await this.nftAccessPass.hasAccess(userAddress)
  }

  // Update balance (can be called by anyone)
  async updateBalance(userAddress: string): Promise<ethers.TransactionResponse> {
    if (!this.signer) throw new Error('Signer required for transactions')
    
    return await this.subscriptionManager.updateBalance(userAddress)
  }

  // Calculate current balance (off-chain)
  async calculateCurrentBalance(userAddress: string): Promise<string> {
    const sub = await this.getSubscription(userAddress)
    if (!sub.active) return '0'

    const plan = await this.getPlan(sub.planId)
    const timeElapsed = Math.floor(Date.now() / 1000) - sub.lastUpdate
    const cost = timeElapsed * parseFloat(plan.pricePerSecond)
    const currentBalance = parseFloat(sub.balance) - cost

    return Math.max(0, currentBalance).toString()
  }
}

// Factory function for easy initialization
export function createUSPClient(
  provider: ethers.Provider,
  subscriptionManagerAddress: string,
  nftAccessPassAddress: string,
  signer?: ethers.Signer
): USPClient {
  return new USPClient(provider, subscriptionManagerAddress, nftAccessPassAddress, signer)
}