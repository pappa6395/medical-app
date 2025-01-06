import { Calendar } from 'lucide-react'
import React from 'react'
import NewButton from './NewButton'
import { Appointment } from '@prisma/client';
import { DoctorDetail } from '@/utils/types';

const DoctorDisplayCard = ({
  appointments=[], 
  doctors,
  title="",
}: {
  appointments: Appointment[]; 
  doctors: DoctorDetail | undefined | null;
  title: string;
}) => {

      const count = appointments.length ?? 0;
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
            <NewButton  title={`New ${title}`} doctors={doctors}/>
        </div>
    </div>

  )
}

export default DoctorDisplayCard