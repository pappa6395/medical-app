import NavBar from '@/components/Dashboard/NavBar'
import SideBar from '@/components/Dashboard/SideBar'
import React, { ReactNode } from 'react'

const Layout = ({children}:{children:ReactNode}) => {
  return (
    <div className='grid min-h-screen w-full md:grid-cols=[220px_1fr] 
    lg:grid-cols-[280px_1fr]'>
        <SideBar />
        <div className='flex flex-col'>
            <NavBar />
          <div className='p-4'>
            {children}
          </div>   
        </div>
    </div>
  )
}

export default Layout