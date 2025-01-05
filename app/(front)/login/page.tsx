
import LoginPage from '@/components/Auth/LoginPage'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'


import React from 'react'


const page = async() => {

  const session = await getServerSession(authOptions)
  
  console.log("Login Session:", session);
  
  
  if (session) {
      redirect("/dashboard")
  }

  return (
    
    <div>
      <LoginPage />
    </div>

  )
}


export default page