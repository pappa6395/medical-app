import { getAppointmentByDoctorId } from '@/actions/appointments'
import { getDoctorsById } from '@/actions/users'
import DoctorDisplayCard from '@/components/Dashboard/Doctor/DoctorDisplayCard'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import generateSlug from '@/utils/generateSlug'
import { Appointment } from '@prisma/client'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {

  const session = await getServerSession(authOptions)
  const user = session?.user
  const userId = user?.id || ""
  const role = user?.role.toLowerCase()
  
  if (!userId) {
      return <div>You must be logged in to access this page.</div>
  }
  if (user?.role !== "DOCTOR") {
    return <NotAuthorized/>
  }
  

  let appointments = [] as Appointment[];
  let doctors = null;

  try {
    const [appointmentsResponse, doctorsResponse] = await Promise.all([
      getAppointmentByDoctorId(userId),
      getDoctorsById(userId)
    ])
    appointments = appointmentsResponse?.data || []
    doctors = doctorsResponse || null

  } catch (err) {
    console.error("Failed to fetch appointments or doctors:", err);
    
  }

  return (

    <div>
        <div className='flex items-center justify-end py-2 px-2 border-b border-gray-200'>
          <div className='flex items-center gap-4'>
            <NewButton title="New Appointment" doctors={doctors ?? null} userId={userId ?? ""}/>
          </div>
        </div>
        {/* Display Panel */}
        <div className='mt-4'>
          <DoctorDisplayCard 
            appointments={appointments ?? []} 
            doctors={doctors}
            title={"Appointment"} />
        </div>
    </div>

  )
}

export default page