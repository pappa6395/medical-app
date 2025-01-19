
import { getAppointmentByPatientId } from '@/actions/appointments';
import DoctorPanel from '@/components/Dashboard/Doctor/DoctorPanel';
import PanelDoctorHeader from '@/components/Dashboard/Doctor/PanelDoctorHeader';
import NotAuthorized from '@/components/NotAuthorized';
import { authOptions } from '@/lib/auth';
import { Appointment } from '@prisma/client';
import { UsersRound } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React, { ReactNode } from 'react'


const PatientLayout = async ({children}: {children: ReactNode}) => {

    
  const session = await getServerSession(authOptions)
  const user = session?.user || null
  const userId = user?.id || ""
    

  if (!userId) {
      return <div>You must be logged in to access this page.</div>
  }
  if (user?.role !== "USER") {
    return <NotAuthorized/>
  }
  
  
  let appointments = [] as Appointment[]
  
  try { 
    appointments = (await getAppointmentByPatientId(userId))?.data || []
  } catch (err) {
    console.error("Failed to fetch appointments", err);
    
  }
        
    
  return (

    <div>
      {/* Header */}
      {/* 2 Panels */}
      <div className="grid col-span-full grid-cols-1 md:grid-cols-12 dark:bg-slate-950">
        {/* Patient Panel */}
        <div className="col-span-5 px-3 py-3 border-r border-gray-100">
          <PanelDoctorHeader title={"Doctors"} appointments={appointments ?? []} icon={UsersRound ?? ""}/>
          <div className='px-3'>
            <DoctorPanel appointments={appointments ?? []} />
          </div>
        </div>
        <div className="md:col-span-7 col-span-full px-3">
            {children}
        </div>
      </div>
      
    </div>


  )
}

export default PatientLayout