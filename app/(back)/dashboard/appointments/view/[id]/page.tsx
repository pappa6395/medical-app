

import { getAppointmentById } from '@/actions/appointments';
import React from 'react'
import { PageProps } from '@/.next/types/app/api/auth/[...nextauth]/route';
import AdminAppointmentCard from '@/components/Dashboard/AdminAppointmentCard';


const page = async ({params: paramsPromise}: PageProps) => {

  const { id } = await paramsPromise

  let appointment = null;
  try {
    appointment = (await getAppointmentById(id))?.data || null;
  } catch (err) {
    console.error("failed to fetch appointment:", err);
    
  }
    
  return (

  <div>
    <AdminAppointmentCard appointment={appointment ?? null} />
  </div>

  )
}

export default page