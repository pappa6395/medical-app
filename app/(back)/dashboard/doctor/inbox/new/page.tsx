import { getAppointmentByDoctorId } from '@/actions/appointments'
import InboxForm from '@/components/Dashboard/InboxForm'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import { PatientProps } from '@/utils/types'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {

    const session = await getServerSession(authOptions)
    const user = session?.user
    const userId = user?.id || ""
    const role = user?.role.toLowerCase()

    if (!userId) {
        return <div>You must be logged in to access this page.</div>
    }
    if (user?.role !== "DOCTOR") {
      return <NotAuthorized/>
    }
    
    const appointments = (await getAppointmentByDoctorId(userId))?.data || []

    const uniquePatientsMap = new Map();

      appointments.forEach((app) => {
        if (!uniquePatientsMap.has(app.patientId)) {
          uniquePatientsMap.set(app.patientId, {
            patientId : app.patientId,
            name: `${app.firstName} ${app.lastName}`,
            email: app.email,
            phone: app.phone,
            location: app.location,
            gender: app.gender,
            occupation: app.occupation,
            dob: app.dob,
          });
        }
      });
      
      const patients = Array.from(uniquePatientsMap.values()) as PatientProps[]
      // console.log("Patients:", patients);
      const users = patients.map((patient) => {
        return {
            value: patient.patientId,
            label: patient.name,
        }
      })
      


  return (

    <div>
      <div className="relative py-4 w-full max-h-full">
        <InboxForm title={"New Message"} session={session} users={users} />
      </div>
    </div> 

  )
}

export default page