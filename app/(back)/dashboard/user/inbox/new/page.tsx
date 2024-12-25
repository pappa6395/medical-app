import { getAppointmentByDoctorId, getAppointmentByPatientId } from '@/actions/appointments'
import InboxForm from '@/components/Dashboard/InboxForm'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import { DoctorProps, PatientProps } from '@/utils/types'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {

    const session = await getServerSession(authOptions)
    const user = session?.user
    const userId = user?.id || ""
    

    if (!userId) {
        return <div>You must be logged in to access this page.</div>
    }
    if (user?.role !== "USER") {
      return <NotAuthorized/>
    }
    
    const appointments = (await getAppointmentByPatientId(userId))?.data || []

    const uniquePatientsMap = new Map();

      appointments.forEach((app) => {
        if (!uniquePatientsMap.has(app.doctorId)) {
          uniquePatientsMap.set(app.doctorId, {
            doctorId : app.doctorId,
            doctorName: app.doctorName,
          });
        }
      });
      
      const doctors = Array.from(uniquePatientsMap.values()) as DoctorProps[]
      const users = doctors.map((doctor) => {
        return {
            value: doctor.doctorId,
            label: doctor.doctorName??"",
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