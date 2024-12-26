import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'



const page = async () => {

    const session = await getServerSession(authOptions)
    const id = session?.user.id

    if (id) {
        redirect(`/onboarding/${id}`)
    }

  return (

    <div>page</div>

  )
}

export default page