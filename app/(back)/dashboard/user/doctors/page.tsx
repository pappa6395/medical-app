
import { getAppointmentByPatientId } from '@/actions/appointments'
import NewLinkButton from '@/components/Dashboard/Doctor/NewLinkButton'
import PatientDisplayCard from '@/components/Dashboard/Doctor/PatientDisplayCard'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
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
    if (user?.role !== "USER") {
      return <NotAuthorized/>
    }
    
    
    let appointments = [] as Appointment[]

    try { 
      appointments = (await getAppointmentByPatientId(userId))?.data || []
    } catch (err) {
      console.error("Failed to fetch appointments", err);
      
    }
          

  return (

    <div>
        <div className='flex items-center justify-end py-2 px-2 border-b border-gray-200'>
          <div className='flex items-center gap-4'>
            <NewLinkButton title="New Doctor" href={`/category?mode=Telehealth`}/>
          </div>
        </div>
        {/* Display Panel */}
        <div className='mt-4'>
          <PatientDisplayCard 
            appointments={appointments} 
            href={`/category?mode=Telehealth`} 
            title={"Doctor"} />
        </div>
    </div>

  )
}

export default page