
import { getAppointmentByDoctorId } from '@/actions/appointments';
import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader';
import PatientPanel from '@/components/Dashboard/Doctor/PatientPanel';
import NotAuthorized from '@/components/NotAuthorized';
import { authOptions } from '@/lib/auth';
import { PatientProps } from '@/utils/types';
import { UsersRound } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React, { ReactNode } from 'react'


const PatientLayout = async ({children}: {children: ReactNode}) => {

    
    const session = await getServerSession(authOptions)
    const user = session?.user
    const userId = user?.id || ""
    const role = user?.role
    

    if (!userId) {
        return <div>You must be logged in to access this page.</div>
    }
    if (user?.role !== "DOCTOR") {
      return <NotAuthorized/>
    }
    
    const appointments = (await getAppointmentByDoctorId(userId))?.data || []

    // Option 1 : [patientIds] => remove dups => fetch users with these ids
    // Option 2 : [patientId, name, email] => remove dups

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
          doctorId: app.doctorId,
          dob: app.dob,
        });
      }
    });
    
    const patients = Array.from(uniquePatientsMap.values()) as PatientProps[]
    console.log("Patients:", patients);
    
    

  return (

    <div>
      {/* Header */}
      {/* 2 Panels */}
      <div className="grid col-span-full md:grid-cols-12 dark:bg-slate-950">
        {/* Patient Panel */}
        <div className="col-span-5 px-3 py-3 border-r border-gray-100">
          <PanelHeader title={"Patients"} count={patients.length??0} icon={UsersRound}/>
          <div className='px-3'>
            <PatientPanel patients={patients} role={role} userId={userId} />
          </div>
        </div>
        <div className="col-span-7 md:grid hidden px-3">
            {children}
        </div>
      </div>
      
    </div>


  )
}

export default PatientLayout