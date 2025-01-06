import { getAppointmentByDoctorId } from '@/actions/appointments'
import DoctorInboxForm from '@/components/Dashboard/DoctorInboxForm'
import InboxForm from '@/components/Dashboard/InboxForm'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import { PatientProps } from '@/utils/types'
import { Appointment } from '@prisma/client'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {

    const session = await getServerSession(authOptions)
    const user = session?.user || null;
    const userId = user?.id || ""

    if (!userId) {
        return <div>You must be logged in to access this page.</div>
    }
    if (user?.role !== "DOCTOR") {
      return <NotAuthorized/>
    }
    
    let appointments = [] as Appointment[]
    
    try {
      appointments = (await getAppointmentByDoctorId(userId))?.data || []
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
    }
      
  return (

    <div>
      <div className="relative py-4 w-full max-h-full">
        <DoctorInboxForm
          title={"New Message"} 
          session={session ?? null} 
          appointments={appointments ?? []} />
      </div>
    </div> 

  )
}

export default page