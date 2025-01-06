import { getAppointmentByPatientId } from '@/actions/appointments'
import DoctorDisplayCard from '@/components/Dashboard/Doctor/DoctorDisplayCard'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import { Appointment } from '@prisma/client'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {

  const session = await getServerSession(authOptions)
  const user = session?.user || null;
  const userId = user?.id || ""
  const role = user?.role.toLowerCase() || undefined


  if (user?.role !== "USER") {
      return <div><NotAuthorized/></div>
  }
  
  let appointments = [] as Appointment[]

  try {
    appointments = (await getAppointmentByPatientId(userId))?.data || []
  } catch (err) {
    console.error("Failed to fetch appointments:", err);
    
  }

  //console.log("Appointment by ID:",appointments);
  
      
  return (

    <div>
        <div className='flex items-center justify-end py-2 px-2 border-b border-gray-200'>
          <div className='flex items-center gap-4'>
            <NewButton title="New Appointment" href={`/dashboard/${role}/appointments/new`}/>
          </div>
        </div>
        {/* Display Panel */}
        <div className='mt-4'>
          <DoctorDisplayCard 
            appointments={appointments || []} 
            title={"New Appointment"} 
            href={`/dashboard/${role}/appointments/new`}
          />
        </div>
    </div>

  )
}

export default page