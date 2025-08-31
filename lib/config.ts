import { createConfig, http } from 'wagmi'
import { metaMask } from 'wagmi/connectors'
import { defineChain } from 'viem'

// Somnia testnet configuration
export const somniaTestnet = defineChain({
  id: 50312,
  name: 'Somnia Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'STT',
    symbol: 'STT',
  },
  rpcUrls: {
    default: { http: ['https://dream-rpc.somnia.network'] },
  },
  blockExplorers: {
    default: { name: 'Somnia Testnet Explorer', url: 'https://shannon-explorer.somnia.network' },
  },
})

export const config = createConfig({
  chains: [somniaTestnet],
  connectors: [metaMask()],
  transports: {
    [somniaTestnet.id]: http(),
  },
  ssr: false,
})

// Contract addresses (deployed on Somnia testnet)
export const CONTRACTS = {
  SUBSCRIPTION_MANAGER: '0x5bB5f5C706904F2D3e205a1dC9EE1dff91B86CfF',
  NFT_ACCESS_PASS: '0x2F58Cdb7d6DCD17A281f14f1aD935804Fc3cc1c9',
}