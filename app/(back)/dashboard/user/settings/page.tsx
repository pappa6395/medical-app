

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import React from "react"
import UserSettings from '@/components/Dashboard/Settings/UserSettings'
import NotAuthorized from '@/components/NotAuthorized'
import { getRecentAppointmentByPatientId } from '@/actions/appointments'


const page = async () => {

  const session = await getServerSession(authOptions);
  const user = session?.user;
  const userId = user?.id??""
  
  if (!user?.id) {
    return <div>You must be logged in to access this page.</div>
  }
  if (user?.role !== "USER") {
    return <NotAuthorized/>
  }

  const appointment = (await getRecentAppointmentByPatientId(userId))?.data || null
  
  
  return (

    <div>
      <UserSettings 
        initialProfile={appointment}
        userId={userId}
      />
    </div>

  )
}

export default page