import NavBar from '@/components/Dashboard/NavBar'
import SideBar from '@/components/Dashboard/SideBar'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const Layout = async ({children}:{children:ReactNode}) => {
  
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login")
  }

  const user = session.user;

  return (
    <div className='grid min-h-screen w-full md:grid-cols=[220px_1fr] 
    lg:grid-cols-[280px_1fr] dark:bg-slate-950'>
        <SideBar session={session} />
        <div className='flex flex-col'>
            <NavBar session={session} />
          <div className='p-4'>
            {children}
          </div>   
        </div>
    </div>
  )
}

export default Layout