import MegaMenu from '@/components/Frontend/MegaMenu'
import NavBar from '@/components/Frontend/Navbar'
import React, { ReactNode } from 'react'

const Layout = ({children}:{children:ReactNode}) => {
  return (
    <div className='bg-blue-950'>
        <NavBar />
        <div className="max-w-5xl mx-auto py-6">
          <MegaMenu />
        </div>
        {children}
    </div>
  )
}

export default Layout