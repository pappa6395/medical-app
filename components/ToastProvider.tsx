import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

const ToastProvider = ({ children }: {children: ReactNode}) => {


  return (

    <div>
        {children}
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
    </div>

  )
}

export default ToastProvider