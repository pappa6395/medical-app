


import { PageProps } from '@/.next/types/app/api/auth/[...nextauth]/route';
import { getAppointmentByPatientIdAndDoctorId } from '@/actions/appointments';
import AppointmentDoctors from '@/components/Dashboard/Doctor/AppointmentDoctors';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react'

const page = async ({params: paramsPromise}: PageProps) => {

  const { id } = await paramsPromise
  
  const session = await getServerSession(authOptions)
  const user = session?.user || null;
  const userId = user?.id || ""

  const appointments = (await getAppointmentByPatientIdAndDoctorId(id, userId))?.data || []

  return (

    <div>
        <AppointmentDoctors appointments={appointments ?? []}/>
    </div>

  )
}

export default page