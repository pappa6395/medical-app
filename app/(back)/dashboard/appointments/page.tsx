import { getAppointments } from '@/actions/appointments'
import AdminDisplayCard from '@/components/Dashboard/Doctor/AdminDisplayCard'
import HomeDisplayCard from '@/components/Dashboard/Doctor/HomeDisplayCard'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import NewLinkButton from '@/components/Dashboard/Doctor/NewLinkButton'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import { Appointment } from '@prisma/client'

import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {

  const session = await getServerSession(authOptions)
  const user = session?.user
  const userId = user?.id || ""

  if (!userId) {
      return <div>You must be logged in to access this page.</div>
  };
  if (user?.role !== "ADMIN") {
    return <NotAuthorized/>
  };

  let appointments = [] as Appointment[]
  try {
    appointments = (await getAppointments())?.data || []
  } catch (err) {
    console.error("Failed to fetch appointments:", err);
    
  };
    
  return (

    <div>
        <div className='flex items-center justify-end py-2 px-2 border-b border-gray-200'>
          <div className='flex items-center gap-4'>
            <NewLinkButton title="New Appointment" href={`#`}/>
          </div>
        </div>
        {/* Display Panel */}
        <div className='mt-4'>
          <AdminDisplayCard 
            count={appointments.length ?? 0}
            href={"#"} 
            title={"Appointments"} />
        </div>
    </div>

  )
}

export default page