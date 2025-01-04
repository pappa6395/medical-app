import { getAppointmentByDoctorId } from '@/actions/appointments'
import { getDoctors } from '@/actions/users'
import AdminDisplayCard from '@/components/Dashboard/Doctor/AdminDisplayCard'
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


  if (!userId) {
      return (
        <div>You must be logged in to access this page.</div>
      )
  }
  if (user?.role !== "ADMIN") {
    return <NotAuthorized/>
  }
  
  const doctors = (await getDoctors()) || []

  return (

    <div>
        <div className='flex items-center justify-end py-2 px-2 border-b border-gray-200'>
          <div className='flex items-center gap-4'>
            <NewButton title="New Doctor" href={`#`}/>
          </div>
        </div>
        {/* Display Panel */}
        <div className='mt-4'>
          <AdminDisplayCard
            title={"Doctor"} 
            href={`#`}
            count={doctors.length??0}  
          />
        </div>
    </div>

  )
}

export default page