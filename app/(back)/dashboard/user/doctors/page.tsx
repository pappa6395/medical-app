import { getAppointmentByDoctorId, getAppointmentByPatientId } from '@/actions/appointments'
import HomeDisplayCard from '@/components/Dashboard/Doctor/HomeDisplayCard'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import generateSlug from '@/utils/generateSlug'
import { DoctorProps } from '@/utils/types'
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
    if (user?.role !== "USER") {
      return <NotAuthorized/>
    }
    
    
    const appointments = (await getAppointmentByPatientId(userId))?.data || []
    
    const uniquePatientsMap = new Map();

      appointments.forEach((app) => {
        if (!uniquePatientsMap.has(app.doctorId)) {
          uniquePatientsMap.set(app.doctorId, {
            doctorId : app.doctorId,
            doctorName: app.doctorName,
          });
        }
      });
      
    const doctors = Array.from(uniquePatientsMap.values()) as DoctorProps[]
          

  return (

    <div>
        <div className='flex items-center justify-end py-2 px-2 border-b border-gray-200'>
          <div className='flex items-center gap-4'>
            <NewButton title="New Doctor" href={`/category?mode=Telehealth`}/>
          </div>
        </div>
        {/* Display Panel */}
        <div className='mt-4'>
          <HomeDisplayCard 
            count={doctors.length??0} 
            href={`/category?mode=Telehealth`} 
            title={"Doctor"} />
        </div>
    </div>

  )
}

export default page