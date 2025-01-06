

import { getAppointmentByDoctorId } from '@/actions/appointments';
import { getDoctorsById } from '@/actions/users';
import React from 'react'
import { PageProps } from "@/.next/types/app/api/auth/[...nextauth]/route";
import AdminDoctorCard from "@/components/Dashboard/AdminDoctorCard";
import { Appointment } from "@prisma/client";


const page = async ({params: paramsPromise}: PageProps) => {

  const { id } = await paramsPromise

    let appointments = [] as Appointment[]
    let doctor = null;
    try {
        const [appointmentsResponse, doctorResponse] = await Promise.all([
            getAppointmentByDoctorId(id),
            getDoctorsById(id)
        ])
        appointments = appointmentsResponse?.data || [];
        doctor = doctorResponse || null;
    } catch (err) {
        console.error("Failed to fetch doctor or appointments:", err);
  
    }

  return (

    <div>
        <AdminDoctorCard appointments={appointments ?? []} doctor={doctor ?? null} />
    </div>

  )
}

export default page