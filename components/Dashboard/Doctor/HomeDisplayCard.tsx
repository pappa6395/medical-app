import { Calendar } from 'lucide-react'
import React from 'react'
import NewButton from './NewButton'
import { Appointment } from '@prisma/client';
import { PatientProps } from '@/utils/types';

const HomeDisplayCard = ({
  appointments=[], 
  href="",
  title="",
}: {
  appointments: Appointment[]; 
  href: string;
  title: string;
}) => {

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
            dob: app.dob || new Date(),
          });
        }
      });
    } 

    const patients = Array.from(uniquePatientsMap.values() || []) as PatientProps[]
    const count = patients.length??0;
    // console.log("Patients:", patients);

  return (

    <div className='flex items-center justify-center h-1/2 px-4'>
        <div className='text-center border-gray-100 dark:bg-slate-700
        shadow-md rounded-md py-4 px-6 flex flex-col items-center gap-1'>
            <Calendar />
            <div className='py-3'>
                  {count && count > 1 ? (
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                      You have {count || 0} {title || ""}s today.
                    </p>
                  ) : (
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                      You have {count || 0} {title || ""} today.
                    </p>
                  )}
            </div>
            <NewButton  title={`New ${title ?? ""}`} href={href ?? ""}/>
        </div>
    </div>

  )
}

export default HomeDisplayCard