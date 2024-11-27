import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

const Providers = ({ children }: {children: ReactNode}) => {


  return (

    <div>
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
    </div>

  )
}

export default Providers