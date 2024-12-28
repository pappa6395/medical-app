
import { getAppointmentByDoctorId, getAppointments } from '@/actions/appointments';
import AdminAppointmentPanel from '@/components/Dashboard/Doctor/AdminAppointmentPanel';
import AdminPatientPanel from '@/components/Dashboard/Doctor/AdminPatientPanel';
import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader';
import PatientPanel from '@/components/Dashboard/Doctor/PatientPanel';
import NotAuthorized from '@/components/NotAuthorized';
import { authOptions } from '@/lib/auth';
import { AppointmentProps, PatientProps } from '@/utils/types';
import { Appointment } from '@prisma/client';
import { CalendarDays, UsersRound } from 'lucide-react';
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
    if (user?.role !== "ADMIN") {
      return <NotAuthorized/>
    }
    
    const appointments = (await getAppointments())?.data || []

    // Option 1 : [patientIds] => remove dups => fetch users with these ids
    // Option 2 : [patientId, name, email] => remove dups

    
  return (

    <div>
      {/* Header */}
      {/* 2 Panels */}
      <div className="grid col-span-full md:grid-cols-12 dark:bg-slate-950">
        {/* Patient Panel */}
        <div className="col-span-5 px-3 border-r border-gray-100">
          <PanelHeader title={"Appointments"} count={appointments.length??0} icon={CalendarDays}/>
          <div className='px-3'>
            <AdminAppointmentPanel appointments={appointments} />
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