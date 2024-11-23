import NavBar from '@/components/Frontend/Navbar'
import React, { ReactNode } from 'react'

const Layout = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <NavBar />
        {children}
    </div>
  )
}

export default Layout