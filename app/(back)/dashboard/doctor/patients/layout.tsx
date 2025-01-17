
import { getAppointmentByDoctorId } from '@/actions/appointments';
import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader';
import PatientPanel from '@/components/Dashboard/Doctor/PatientPanel';
import NotAuthorized from '@/components/NotAuthorized';
import { authOptions } from '@/lib/auth';
import { Appointment } from '@prisma/client';
import { UsersRound } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React, { ReactNode } from 'react'


const PatientLayout = async ({children}: {children: ReactNode}) => {
    
    const session = await getServerSession(authOptions)
    const user = session?.user || null;
    const userId = user?.id || ""
    const role = user?.role || undefined
    

    if (!userId) {
        return <div>You must be logged in to access this page.</div>
    }
    if (user?.role !== "DOCTOR") {
      return <NotAuthorized/>
    }
    
    let appointments = [] as Appointment[]
    try {
      appointments = (await getAppointmentByDoctorId(userId))?.data || []
    } catch (err) {
      console.log("Failed to fetch appointments:", err);
      
    }
    

  return (

    <div>
      <div className="grid col-span-full grid-cols-1 md:grid-cols-12 dark:bg-slate-950">
        <div className="col-span-5 px-0 mr-2 md:mr-0 md:px-3 border-r border-gray-100">
          <PanelHeader 
            title={"Patients"} 
            appointments={appointments ?? []} 
            icon={UsersRound ?? ""}/>
          <div className='px-0 md:px-3 py-3'>
            <PatientPanel appointments={appointments ?? []} role={role ?? undefined} />
          </div>
        </div>
        <div className="md:col-span-7 col-span-full">
            {children}
        </div>
      </div>
    </div>

  )
}

export default PatientLayout