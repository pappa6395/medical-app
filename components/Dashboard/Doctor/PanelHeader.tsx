
import { PatientProps } from '@/utils/types';
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
      appointments?.forEach((app) => {
        if (!app.patientId) return;
        if (!uniquePatientsMap.has(app.patientId)) {
          uniquePatientsMap?.set(app.patientId, {
            patientId : app.patientId ?? "",
            name: `${app.firstName ?? ""} ${app.lastName ?? ""}`,
            email: app.email ?? "",
            phone: app.phone ?? "",
            location: app.location ?? "",
            gender: app.gender ?? "",
            occupation: app.occupation ?? "",
            doctorId: app.doctorId ?? "",
            dob: app.dob ?? "",
          });
        }
      });
    }
    const patients = Array.from(uniquePatientsMap.values() || []) as PatientProps[]
    const countPatients = patients?.length.toString().padStart(2, "0") ?? 0;
    const countAppointments = appointments?.length.toString().padStart(2, "0") ?? 0;

  return (

    <div className='flex items-center justify-between px-6 py-3 border-b border-gray-200'>
        <div className='flex items-center gap-2'>
            <Icon className='w-4 h-4 flex-shrink-0'/>
            <span className='scroll-m-20 text-xl font-bold tracking-tight'>{title || "Unknown"}</span>
            <span className='bg-white dark:text-slate-600 w-6 h-6 rounded-full 
              flex items-center justify-center shadow-sm border text-xs'
              > 
                
                {title === "Appointments" ? countAppointments 
                : title === "Patients" ? countPatients 
                : count?.toString().padStart(2, "0")}
              </span>
        </div>
    </div>

  )
}

export default PanelHeader