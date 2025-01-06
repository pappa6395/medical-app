import React from 'react'
import { getDoctorsById } from '@/actions/users'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getRecentAppointmentByPatientId } from '@/actions/appointments'
import { PageProps } from '@/.next/types/app/api/auth/[...nextauth]/route'
import DoctorSlugDetails from '@/components/DoctorSlugDetails'


const page = async ({
    searchParams
}: PageProps) => {

    const { id } = await searchParams
    const session = await getServerSession(authOptions);
    const patientId = session?.user.id ?? "";
    

    let doctorSlug = null;
    let appointment = null;
    try {
        const [doctorSlugResponse, appointmentResponse] = await Promise.all([
            getDoctorsById(id),
            getRecentAppointmentByPatientId(patientId)
        ])
        doctorSlug = doctorSlugResponse || null;
        appointment = appointmentResponse?.data || null;

    } catch (err) {
        console.error("Failed to get doctor profile:", err);
    }


  return (
    
    <div>
        <DoctorSlugDetails  
            doctorSlug={doctorSlug} 
            appointment={appointment} 
            patientId={patientId}/>
    </div>

  )
}

export default page