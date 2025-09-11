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
  SUBSCRIPTION_MANAGER: '0xC37011F5F79F26F4e19EBE7838b63A7754f66764',
  NFT_ACCESS_PASS: '0xf012e795f7f5670F8A2DfAdF14c92ACA647651b0',
}