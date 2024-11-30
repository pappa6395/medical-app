import Footer from '@/components/Frontend/Footer'
import MegaMenu from '@/components/Frontend/MegaMenu'
import NavBar from '@/components/Frontend/Navbar'
import { SiteHeader } from '@/components/SiteHeader'
import React, { ReactNode } from 'react'


const Layout = ({children}:{children:ReactNode}) => {
  return (
    <div className=''>
        <SiteHeader />
          {children}
        <Footer />
    </div>
  )
}

export default Layout