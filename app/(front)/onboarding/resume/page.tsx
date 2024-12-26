
import TrackingForm from '@/components/Frontend/TrackingForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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

    <div className='min-h-screen flex items-center justify-center'>
       <Card className="mx-auto max-w-md bg-white dark:bg-slate-900 ">
        <CardHeader>
          <CardTitle className="text-xl">Resume your application</CardTitle>
          <CardDescription>Please enter the 10-Character tracking number of your application.</CardDescription>
        </CardHeader>
        <CardContent className="border-none shadow-none">
          <TrackingForm />
        </CardContent>
      </Card>
    </div>

  )
}

export default page