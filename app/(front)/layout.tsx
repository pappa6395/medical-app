
import Footer from '@/components/Frontend/Footer'
import { SiteHeader } from '@/components/SiteHeader'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React, { ReactNode } from 'react'


const Layout =  async ({children}:{children:ReactNode}) => {

  const session = await getServerSession(authOptions);
  
  return (
    <div className='h-full'>
        <SiteHeader session={session} />
          {children}
        <Footer />
    </div>
  )
}

export default Layout