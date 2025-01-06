
import { getAppointmentByPatientId } from '@/actions/appointments';
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
    const user = session?.user || null;
    const userId = user?.id || ""
    const role = user?.role || undefined

    if (user?.role !== "USER") {
      return <div><NotAuthorized/></div>
  }
    
  let appointments = [] as Appointment[]
  try {
    appointments = (await getAppointmentByPatientId(userId))?.data || []
  } catch (err) {
    console.error("Failed to fetch Appointment:", err);
    
  }

  return (

    <div>
      {/* Header */}
      {/* 2 Panels */}
      <div className="grid col-span-full md:grid-cols-12 dark:bg-slate-950">
        {/* List Panel */}
        <div className="col-span-5 px-3 py-3 border-r border-gray-100">
          <PanelHeader title={"Appointments"} count={appointments?.length??0} icon={Calendar}/>
          <div className='px-3'>
            <ListPanel appointments={appointments ?? []} role={role ?? undefined} />
          </div>
        </div>
        <div className="col-span-7 md:grid hidden px-3">
            {children}
        </div>
      </div>
      
    </div>


  )
}

export default layout