import { getAppointmentByDoctorId } from '@/actions/appointments'
import HomeDisplayCard from '@/components/Dashboard/Doctor/HomeDisplayCard'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import generateSlug from '@/utils/generateSlug'
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
    const slug = generateSlug(user?.name??"")
    
    const appointments = (await getAppointmentByDoctorId(userId))?.data || []

    const uniquePatientsMap = new Map();

      appointments.forEach((app) => {
        if (!uniquePatientsMap.has(app.patientId)) {
          uniquePatientsMap.set(app.patientId, {
            patientId : app.patientId,
            name: `${app.firstName} ${app.lastName}`,
            email: app.email,
            phone: app.phone,
            location: app.location,
            gender: app.gender,
            occupation: app.occupation,
            dob: app.dob,
          });
        }
      });
      
      const patients = Array.from(uniquePatientsMap.values())
      // console.log("Patients:", patients);

  return (

    <div>
        <div className='flex items-center justify-end py-2 px-2 border-b border-gray-200'>
          <div className='flex items-center gap-4'>
            <NewButton title="New User" href={`/doctor/${slug}`}/>
          </div>
        </div>
        {/* Display Panel */}
        <div className='mt-4'>
          <HomeDisplayCard 
            count={patients.length??0} 
            href={`/doctors/${slug}`} 
            title={"Patient"} />
        </div>
    </div>

  )
}

export default page