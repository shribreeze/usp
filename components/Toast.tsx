import { useEffect, useState } from 'react'
import { cn } from '../lib/utils'

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

export default function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000) // 3 seconds
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-right duration-300">
      <div 
        className={cn(
          "bg-orange-500 text-white px-4 py-3 rounded-lg shadow-lg border-l-4 border-orange-600",
          "flex items-center gap-3 max-w-sm"
        )}
      >
        <span className="text-xl">⏰</span>
        <div>
          <p className="font-medium text-sm">Subscription Expiring Soon!</p>
          <p className="text-xs opacity-90">{message}</p>
        </div>
      </div>
    </div>
  )
}