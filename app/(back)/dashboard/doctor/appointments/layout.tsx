
import { getAppointmentByDoctorId } from '@/actions/appointments';
import ListPanel from '@/components/Dashboard/Doctor/ListPanel';
import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader';
import NotAuthorized from '@/components/NotAuthorized';
import { authOptions } from '@/lib/auth';
import { Appointment } from '@prisma/client';
import { Calendar } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React, { ReactNode } from 'react'


const layout = async ({children}: {children: ReactNode}) => {

    
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
    
    let appointments = [] as Appointment[];

    try {
      appointments = (await getAppointmentByDoctorId(userId))?.data || []
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
    }
    


  return (

    <div>
      {/* Header */}
      {/* 2 Panels */}
      <div className="grid col-span-full md:grid-cols-12 dark:bg-slate-950">
        {/* List Panel */}
        <div className="col-span-5 py-3 border-r border-gray-100">
          <PanelHeader title={"Appointments"} appointments={appointments || []} icon={Calendar}/>
          <div className='w-[330px] md:w-full'>
            <ListPanel appointments={appointments || []} role={role} />
          </div>
        </div>
        <div className="md:col-span-7 col-span-full">
            {children}
        </div>
      </div>
      
    </div>


  )
}

export default layout