
import { getAppointmentByDoctorId, getAppointmentByPatientId } from '@/actions/appointments';
import DoctorPanel from '@/components/Dashboard/Doctor/DoctorPanel';
import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader';
import PatientPanel from '@/components/Dashboard/Doctor/PatientPanel';
import NotAuthorized from '@/components/NotAuthorized';
import { authOptions } from '@/lib/auth';
import { DoctorProps } from '@/utils/types';
import { log } from 'console';
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
      console.log("Doctors",doctors);
      
  
  return (

    <div>
      {/* Header */}
      {/* 2 Panels */}
      <div className="grid col-span-full md:grid-cols-12 dark:bg-slate-950">
        {/* Patient Panel */}
        <div className="col-span-5 px-3 py-3 border-r border-gray-100">
          <PanelHeader title={"Patients"} count={doctors.length??0} icon={UsersRound}/>
          <div className='px-3'>
            <DoctorPanel doctors={doctors} role={role} userId={userId} />
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