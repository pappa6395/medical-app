import { getAppointmentByDoctorId } from '@/actions/appointments'
import { getDoctorsById } from '@/actions/users'
import HomeDisplayCard from '@/components/Dashboard/Doctor/HomeDisplayCard'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import generateSlug from '@/utils/generateSlug'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {

  const session = await getServerSession(authOptions)
  const user = session?.user || null
  const userId = user?.id || ""

  if (!userId) {
      return <div>You must be logged in to access this page.</div>
  };

  if (user?.role !== "DOCTOR") {
    return <NotAuthorized/>
  };
  
  const appointments = (await getAppointmentByDoctorId(userId))?.data || [];
  const doctors = await getDoctorsById(userId) || null;
  const doctorSlug = generateSlug(
    `${doctors?.doctorProfile?.firstName || "Unknown"} ${doctors?.doctorProfile?.lastName || "Unknown"}`
  );
    
  return (

    <div>
        <div className='flex items-center justify-end py-2 px-2 border-b border-gray-200'>
          <div className='flex items-center gap-4'>
            <NewButton title="New Patient" href={`/doctors/${doctorSlug ?? ""}?id=${userId ?? ""}`}/>
          </div>
        </div>
        {/* Display Panel */}
        <div className='mt-4'>
          <HomeDisplayCard 
            appointments={appointments ?? []}
            href={`/doctors/${doctorSlug ?? ""}?id=${userId ?? ""}`} 
            title={"Patient"} />
        </div>
    </div>

  )
}

export default page