import { getAppointments } from '@/actions/appointments'
import HomeDisplayCard from '@/components/Dashboard/Doctor/HomeDisplayCard'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'

import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {

  const session = await getServerSession(authOptions)
  const user = session?.user
  const userId = user?.id || ""

  if (!userId) {
      return <div>You must be logged in to access this page.</div>
  }
  if (user?.role !== "ADMIN") {
    return <NotAuthorized/>
  }

  
  const appointments = (await getAppointments())?.data || []

    
  return (

    <div>
        <div className='flex items-center justify-end py-2 px-2 border-b border-gray-200'>
          <div className='flex items-center gap-4'>
            <NewButton title="New Appointment" href={`#`}/>
          </div>
        </div>
        {/* Display Panel */}
        <div className='mt-4'>
          <HomeDisplayCard 
            appointments={appointments} 
            href={`#`} 
            title={"Appointments"} />
        </div>
    </div>

  )
}

export default page