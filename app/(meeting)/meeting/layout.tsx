
import Footer from '@/components/Frontend/Footer'
import { SiteHeader } from '@/components/SiteHeader'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'


const Meeting =  async ({children}:{children:ReactNode}) => {

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login")
  }
  
  return (
    <div className=''>
          {children}
    </div>
  )
}

export default Meeting