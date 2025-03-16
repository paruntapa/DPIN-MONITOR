"use client"
import React from 'react'
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'
const Appbar = () => {
  return (
    <div className='flex items-center justify-between w-full h-16 p-4 gap-6 text-white'>
    <div>DpInn Monitor</div>
    <div >
    <SignedOut>
      <div className='gap-4 justify-center flex'>
        <div>
        <SignInButton />
        </div> 
        <div>
        <SignUpButton />
        </div>
      </div>
    </SignedOut>
    <SignedIn>
        <UserButton />
    </SignedIn>
    </div>
    </div>
  )
}

export default Appbar