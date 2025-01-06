
import { PageProps } from '@/.next/types/app/api/auth/[...nextauth]/route';
import { getAppointmentById } from '@/actions/appointments';
import PatientAppointmentCard from '@/components/Dashboard/Doctor/PatientAppointmentCard';
import React from 'react'

const page = async ({params: paramsPromise}: PageProps) => {

  const { id } = await paramsPromise

  let appointments = null;
  
  try {
    appointments = (await getAppointmentById(id))?.data || null;

  } catch (err) {
    console.error("Failed to fetch appointments:", err);
    
  }
  
  return (

    <div>
        <PatientAppointmentCard appointments={appointments ?? null}/>
    </div>

  )
}

export default page