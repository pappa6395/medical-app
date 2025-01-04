import { Calendar } from 'lucide-react'
import React from 'react'
import NewButton from './NewButton'
import { Appointment } from '@prisma/client';

const HomeDisplayCard = ({
  appointments, 
  href,
  title,
}: {
  appointments: Appointment[]; 
  href: string;
  title: string;
}) => {

  const uniquePatientsMap = new Map();

      appointments.forEach((app) => {
        if (!uniquePatientsMap.has(app.patientId)) {
          uniquePatientsMap.set(app.patientId, {
            patientId : app.patientId,
            name: `${app.firstName} ${app.lastName}`,
            email: app.email,
            phone: app.phone,
            location: app.location,
            gender: app.gender,
            occupation: app.occupation,
            dob: app.dob,
          });
        }
      });
      
      const patients = Array.from(uniquePatientsMap.values())
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
                      You have {count} {title}s today.
                    </p>
                  ) : (
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                      You have {count} {title} today.
                    </p>
                  )}
            </div>
            <NewButton  title={`New ${title}`} href={href}/>
        </div>
    </div>

  )
}

export default HomeDisplayCard