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
  SUBSCRIPTION_MANAGER: '0x62D69EcE0806188dCC981bF9B5F9dC39b173df71',
  NFT_ACCESS_PASS: '0x4C2D391b2C3F9ee868eB8c36d40Ada064A663C16',
}