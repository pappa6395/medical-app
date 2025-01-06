

import { getAppointmentByPatientId, getRecentAppointmentByPatientId } from '@/actions/appointments';
import React from 'react'
import { PageProps } from '@/.next/types/app/api/auth/[...nextauth]/route';
import AdminPatientDetail from '@/components/Dashboard/AdminPatientDetails';
import { Appointment } from '@prisma/client';

const page = async ({params: paramsPromise}: PageProps) => {

    const { id } = await paramsPromise

    let appointments = [] as Appointment[]
    let patients = null;
    try {
        const [appointmentsResponse, patientsResponse] = await Promise.all([
            getAppointmentByPatientId(id),
            getRecentAppointmentByPatientId(id)
        ])
        appointments = appointmentsResponse?.data || []
        patients = patientsResponse?.data || null

    } catch (err) {
        console.error("Failed to fetch appointments or patients:", err);
        
    }


  return (

    <div>
        <AdminPatientDetail appointments={appointments ?? []} patients={patients ?? null} />
    </div>

  )
}

export default page