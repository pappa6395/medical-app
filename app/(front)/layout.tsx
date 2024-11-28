import Footer from '@/components/Frontend/Footer'
import MegaMenu from '@/components/Frontend/MegaMenu'
import NavBar from '@/components/Frontend/Navbar'
import React, { ReactNode } from 'react'


const Layout = ({children}:{children:ReactNode}) => {
  return (
    <div className='bg-white'>
        <NavBar />
        {/* <div className="bg-white mx-auto py-4 fixed border-t border-gray-400/50  
        top-20 sm:top-16 z-40 w-full max-w-screen" >
          <MegaMenu />
        </div> */}
        <div className='mt-16'>
          {children}
        </div>
        <Footer />
    </div>
  )
}

export default Layout