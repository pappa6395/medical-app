"use client"

import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { SessionProvider } from 'next-auth/react';

const ToastProvider = ({ children }: {children: ReactNode}) => {


  return (

    <SessionProvider>
      <HMSRoomProvider>
        {children}
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
      </HMSRoomProvider>
    </SessionProvider>

  )
}

export default ToastProvider