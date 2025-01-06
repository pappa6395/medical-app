
import { getAppointments } from '@/actions/appointments';
import AdminPatientPanel from '@/components/Dashboard/Doctor/AdminPatientPanel';
import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader';
import NotAuthorized from '@/components/NotAuthorized';
import { authOptions } from '@/lib/auth';
import { Appointment } from '@prisma/client';
import { CircleUserRound } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React, { ReactNode } from 'react'


const PatientLayout = async ({children}: {children: ReactNode}) => {

    
    const session = await getServerSession(authOptions)
    const user = session?.user || null;
    const userId = user?.id || "";
    

    if (!userId) {
        return <div>You must be logged in to access this page.</div>
    }
    if (user?.role !== "ADMIN") {
      return <NotAuthorized/>
    }
    
    let appointments = [] as Appointment[];

    try {
      appointments = (await getAppointments())?.data || []
    } catch (err) {
      console.error("failed to fetch appointments:", err);
      
    }
    
  return (

    <div>
      {/* Header */}
      {/* 2 Panels */}
      <div className="grid col-span-full md:grid-cols-12 dark:bg-slate-950">
        {/* Patient Panel */}
        <div className="col-span-5 px-3 border-r border-gray-100">
          <PanelHeader title={"Patients"} appointments={appointments ?? []} icon={CircleUserRound}/>
          <div className='px-3'>
            <AdminPatientPanel appointments={appointments ?? []} />
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