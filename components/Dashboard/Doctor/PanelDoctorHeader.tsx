
import { DoctorProps, PatientProps } from '@/utils/types';
import { Appointment } from '@prisma/client';
import { LucideIcon } from 'lucide-react'
import React from 'react'


const PanelHeader = ({
  title="",
  appointments=[], 
  count=0,
  icon,
}: {
  title: string, 
  appointments?: Appointment[];
  count?: number, 
  icon: LucideIcon
}) => {

  const Icon = icon

  const uniquePatientsMap = new Map();
      
  if (appointments) {
      appointments.forEach((app) => {
          if (!app.doctorId) return;
          if (!uniquePatientsMap.has(app.doctorId)) {
              uniquePatientsMap?.set(app.doctorId, {
              doctorId : app.doctorId ?? "",
              doctorName: app.doctorName ?? "",
              });
          }
      });
  }
  const doctors = Array.from(uniquePatientsMap.values()) as DoctorProps[]
  const countDoctors = doctors.length ?? 0;

  return (

    <div className='flex items-center justify-between px-6 py-3 border-b border-gray-200'>
        <div className='flex items-center gap-2'>
            <Icon className='w-4 h-4 flex-shrink-0'/>
            <span className='scroll-m-20 text-xl font-bold tracking-tight'>{title || "Unknown"}</span>
            <span className='bg-white dark:text-slate-600 w-6 h-6 rounded-full 
              flex items-center justify-center shadow-sm border text-xs'
              >
                {count || count > 0 
                ? count?.toString().padStart(2, "0") 
                : countDoctors.toString().padStart(2,"0")}
              </span>
        </div>
    </div>

  )
}

export default PanelHeader