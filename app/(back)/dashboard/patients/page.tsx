import { getAppointmentByDoctorId, getAppointments } from '@/actions/appointments'
import AdminPatientDisplay from '@/components/Dashboard/AdminPatientDisplay'
import AdminDisplayCard from '@/components/Dashboard/Doctor/AdminDisplayCard'
import HomeDisplayCard from '@/components/Dashboard/Doctor/HomeDisplayCard'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import NewLinkButton from '@/components/Dashboard/Doctor/NewLinkButton'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import generateSlug from '@/utils/generateSlug'
import { Appointment } from '@prisma/client'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {

  const session = await getServerSession(authOptions)
  const user = session?.user || null;
  const userId = user?.id || ""
  const role = user?.role.toLowerCase()

    if (!userId) {
        return <div>You must be logged in to access this page.</div>
    }
    if (user?.role !== "ADMIN") {
      return <NotAuthorized/>
    }
    
  let appointments = [] as Appointment[];
  
      try {
        appointments = (await getAppointments())?.data || []
      } catch (err) {
        console.error("failed to fetch appointments:", err);
        
      }


  return (

    <div>
        <div className='flex items-center justify-end py-2 px-2 border-b border-gray-200'>
          <div className='flex items-center gap-4'>
            <NewLinkButton title="New Patient" href={"/register"}/>
          </div>
        </div>
        {/* Display Panel */}
        <div className='mt-4'>
          <AdminPatientDisplay 
            appointments={appointments}
            title={"Patient"} />
        </div>
    </div>

  )
}

export default page