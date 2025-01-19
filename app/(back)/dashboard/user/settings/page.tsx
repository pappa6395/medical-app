

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import React from "react"
import UserSettings from '@/components/Dashboard/Settings/UserSettings'
import NotAuthorized from '@/components/NotAuthorized'
import { getRecentAppointmentByPatientId } from '@/actions/appointments'
import { Appointment } from '@prisma/client'


const page = async () => {

  const session = await getServerSession(authOptions);
  const user = session?.user || null;
  const userId = user?.id || ""
  
  if (!user?.id) {
    return <div>You must be logged in to access this page.</div>
  }
  if (user?.role !== "USER") {
    return <NotAuthorized/>
  }

  let appointment = null;
  try {
    appointment = (await getRecentAppointmentByPatientId(userId))?.data || null
  } catch (err) {
    console.error("Failed to fetch recent appointment:", err);
  }


  return (

    <div>
      <UserSettings 
        initialProfile={appointment ?? null}
        userId={userId ?? ""}
      />
    </div>

  )
}

export default page