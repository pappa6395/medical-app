
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const Layout = async ({children}:{children:ReactNode}) => {
  
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect(`/login?returnUrl=/onboarding`)
  }


  return (
    <div className=''>
       {children}
    </div>
  )
}

export default Layout