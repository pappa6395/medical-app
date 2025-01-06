

import { PageProps } from '@/.next/types/app/api/auth/[...nextauth]/route';
import { getAppointmentById } from '@/actions/appointments';
import DoctorAppointmentDetails from '@/components/Dashboard/Doctor/DoctorAppointmentDetails';
import React from 'react'

const page = async ({params: paramsPromise}: PageProps) => {

  const { id } = await paramsPromise
  
  let appointment = null;
  try {
    appointment = (await getAppointmentById(id))?.data || null;
  } catch (err) {
    console.error("Failed to fetch appointment:", err);
    
  }

  return (

    <div>
      <DoctorAppointmentDetails appointment={appointment ?? null} />
    </div>
  )
}

export default page