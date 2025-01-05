import { getAppointmentByDoctorId } from '@/actions/appointments'
import InboxForm from '@/components/Dashboard/InboxForm'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import { PatientProps } from '@/utils/types'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {

    const session = await getServerSession(authOptions)
    const user = session?.user || null;
    const userId = user?.id || ""

    if (!userId) {
        return <div>You must be logged in to access this page.</div>
    }
    if (user?.role !== "DOCTOR") {
      return <NotAuthorized/>
    }
    
    const appointments = (await getAppointmentByDoctorId(userId))?.data || []

    const uniquePatientsMap = new Map();

    if (appointments) {
      appointments?.forEach((app) => {
        if (!app.patientId) return;
        if (!uniquePatientsMap.has(app.patientId)) {
          uniquePatientsMap?.set(app.patientId, {
            patientId : app.patientId ?? "",
            name: `${app.firstName ?? ""} ${app.lastName ?? ""}`,
            email: app.email ?? "",
            phone: app.phone ?? "",
            location: app.location ?? "",
            gender: app.gender ?? "",
            occupation: app.occupation ?? "",
            dob: app.dob ?? new Date(),
          });
        }
      });
    }
      
    const patients = Array.from(uniquePatientsMap.values() || []) as PatientProps[]
    // console.log("Patients:", patients);
    const users = patients?.map((patient) => {
      return {
          value: patient.patientId ?? "",
          label: patient.name ?? "",
      }
    })
      
  return (

    <div>
      <div className="relative py-4 w-full max-h-full">
        <InboxForm title={"New Message"} session={session ?? null} users={users ?? []} />
      </div>
    </div> 

  )
}

export default page