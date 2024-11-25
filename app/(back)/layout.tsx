import NavBar from '@/components/Dashboard/NavBar'
import SideBar from '@/components/Dashboard/SideBar'
import React, { ReactNode } from 'react'

const Layout = ({children}:{children:ReactNode}) => {
  return (
    <div>
       <NavBar/>
       <div className='flex'>
        <SideBar />
        <div className='p-8'>
          {children}
        </div>
       </div>
    </div>
  )
}

export default Layout