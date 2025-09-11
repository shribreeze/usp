import { useState, useEffect, createContext, useContext } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { formatEther } from 'viem'
import { CONTRACTS } from '../lib/config'
import { SUBSCRIPTION_MANAGER_ABI } from '../lib/contracts'
import Toast from './Toast'

interface ToastContextType {
  showToast: (message: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export default function GlobalToastProvider({ children }: { children: React.ReactNode }) {
  const { address } = useAccount()
  const [showAlert, setShowAlert] = useState(false)
  const [alertShown, setAlertShown] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Read subscription data
  const { data: subscription } = useReadContract({
    address: CONTRACTS.SUBSCRIPTION_MANAGER as `0x${string}`,
    abi: SUBSCRIPTION_MANAGER_ABI,
    functionName: 'getSubscription',
    args: address ? [address] : undefined,
    query: { 
      enabled: !!address && mounted,
      refetchInterval: 2000
    },
  })

  // Monitor subscription for 15-second alert
  useEffect(() => {
    if (!subscription || !subscription[3]) {
      setShowAlert(false)
      setAlertShown(false)
      return
    }

    const checkRemainingTime = () => {
      const planId = Number(subscription[0])
      const pricePerSecond = planId === 1 
        ? 100000000000n    // Silver: 0.0000001 STT per second
        : 10000000000000n  // Gold: 0.00001 STT per second

      const now = BigInt(Math.floor(Date.now() / 1000))
      const timeElapsed = now - subscription[2]
      const cost = timeElapsed * pricePerSecond
      const currentBalance = subscription[1] - cost
      const balanceValue = currentBalance > 0n ? currentBalance : 0n

      const remainingBalance = Number(formatEther(balanceValue))
      const pricePerSecondNum = Number(formatEther(pricePerSecond))
      const remainingSeconds = remainingBalance / pricePerSecondNum

      // Show alert when 15 seconds remaining (only once)
      if (remainingSeconds <= 15 && remainingSeconds > 0 && !alertShown) {
        setShowAlert(true)
        setAlertShown(true)
      }

      // Reset alert flag when balance is refilled
      if (remainingSeconds > 15 && alertShown) {
        setAlertShown(false)
      }
    }

    checkRemainingTime()
    const interval = setInterval(checkRemainingTime, 2000)
    return () => clearInterval(interval)
  }, [subscription, alertShown])

  const showToast = (message: string) => {
    // Can be used for other toast messages if needed
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast 
        message="⚠️ Only 15 seconds of subscription remaining! Add balance to continue."
        isVisible={showAlert}
        onClose={() => setShowAlert(false)}
      />
    </ToastContext.Provider>
  )
}