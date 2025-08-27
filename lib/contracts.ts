export const SUBSCRIPTION_MANAGER_ABI = [
  {
    "type": "function",
    "name": "createPlan",
    "inputs": [
      {"name": "_name", "type": "string"},
      {"name": "_pricePerSecond", "type": "uint256"}
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "subscribe",
    "inputs": [{"name": "_planId", "type": "uint256"}],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "cancel",
    "inputs": [],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "checkAccess",
    "inputs": [{"name": "_user", "type": "address"}],
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getSubscription",
    "inputs": [{"name": "_user", "type": "address"}],
    "outputs": [
      {"name": "planId", "type": "uint256"},
      {"name": "balance", "type": "uint256"},
      {"name": "lastUpdate", "type": "uint256"},
      {"name": "active", "type": "bool"}
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getPlan",
    "inputs": [{"name": "_planId", "type": "uint256"}],
    "outputs": [
      {"name": "pricePerSecond", "type": "uint256"},
      {"name": "active", "type": "bool"},
      {"name": "name", "type": "string"}
    ],
    "stateMutability": "view"
  }
] as const

export const NFT_ACCESS_PASS_ABI = [
  {
    "type": "function",
    "name": "hasAccess",
    "inputs": [{"name": "_user", "type": "address"}],
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [{"name": "owner", "type": "address"}],
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "view"
  }
] as const