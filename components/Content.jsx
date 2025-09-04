"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { FreeItems } from './free-items'
import { PremiumContents } from './premium-contents'
import { FreeItemsLocked } from './free-itemsLocked'

export default function Content() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div className="bg-[color:var(--usp-bg)] relative mx-auto max-w-6xl px-6 pb-24 mb-16 md:mb-24">
        <div className="pt-10 md:pt-12">
          {!isConnected ? (
            <FreeItemsLocked />
          ):(
            <FreeItems />
          )}
        </div>
        <div className="mt-10 md:mt-12">
          <PremiumContents />
        </div>
      </div>
  )
}