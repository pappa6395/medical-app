
import { PageProps } from '@/.next/types/app/api/auth/[...nextauth]/route';
import { getAppointmentById } from '@/actions/appointments';
import PatientAppointmentCard from '@/components/Dashboard/Doctor/PatientAppointmentCard';
import React from 'react'

const page = async ({params: paramsPromise}: PageProps) => {

  const { id } = await paramsPromise

  const appointments = (await getAppointmentById(id))?.data || null;
  
  return (

    <div>
        <PatientAppointmentCard appointments={appointments ?? null}/>
    </div>

  )
}

export default page