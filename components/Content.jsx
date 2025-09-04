"use client"
import React from 'react'
import { FreeItems } from './free-items'
import { PremiumContents } from './premium-contents'

export default function Content() {
  return (
    <div className="bg-[color:var(--usp-bg)] relative mx-auto max-w-6xl px-6 pb-24 mb-16 md:mb-24">
        <div className="pt-10 md:pt-12">
          <FreeItems />
        </div>
        <div className="mt-10 md:mt-12">
          <PremiumContents />
        </div>
      </div>
  )
}