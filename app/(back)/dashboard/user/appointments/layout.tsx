
import { getAppointmentByDoctorId, getAppointmentByPatientId } from '@/actions/appointments';
import ListPanel from '@/components/Dashboard/Doctor/ListPanel';
import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader';
import NotAuthorized from '@/components/NotAuthorized';
import { authOptions } from '@/lib/auth';
import { Calendar } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React, { ReactNode } from 'react'


const layout = async ({children}: {children: ReactNode}) => {

    
    const session = await getServerSession(authOptions)
    const user = session?.user
    const userId = user?.id || ""
    const role = user?.role

    if (user?.role !== "USER") {
      return <div><NotAuthorized/></div>
  }
    
    const appointments = (await getAppointmentByPatientId(userId))?.data || []

    console.log("Appointment by ID:",appointments);
    

  return (

    <div>
      {/* Header */}
      {/* 2 Panels */}
      <div className="grid col-span-full md:grid-cols-12 dark:bg-slate-950">
        {/* List Panel */}
        <div className="col-span-5 px-3 py-3 border-r border-gray-100">
          <PanelHeader title={"Appointments"} count={appointments.length??0} icon={Calendar}/>
          <div className='px-3'>
            <ListPanel appointment={appointments} role={role} />
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