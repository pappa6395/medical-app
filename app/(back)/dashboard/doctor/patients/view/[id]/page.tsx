

import { PageProps } from '@/.next/types/app/(back)/dashboard/user/appointments/view/[id]/page';
import { getAppointmentByPatientIdAndDoctorId } from '@/actions/appointments';
import { ScrollArea } from '@/components/ui/scroll-area';
import { authOptions } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { timeAgo } from '@/utils/timeAgo';
import { CalendarCheck, Check, CircleEllipsis, CircleX, History } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react'

const page = async ({params: paramsPromise}: PageProps) => {

  const { id } = await paramsPromise
  console.log("ID:", id);

  const session = await getServerSession(authOptions)
  const user = session?.user
  const userId = user?.id || ""

  const appointments = (await getAppointmentByPatientIdAndDoctorId(id, userId))?.data || []
  console.log("Appointments:", appointments);
  

  return (

    <div>
      <ScrollArea className="h-96 space-x-4">
      <h2 className='"scroll-m-20 text-lg font-medium tracking-tight"'>
        Appointments ({appointments.length.toString().padStart(2,"0")})
      </h2>
       <div className="grid grid-cols-1 md:grid-cols-2">
          {appointments.map((item) => {
            return (
              <div key={item.id} className="mt-2 mr-4 cursor-pointer">
                    <Link 
                        href={`/dashboard/doctor/appointments/view/${item.patientId}`}
                        className={cn(
                            "border border-gray-100 shadow-sm text-xs py-3 px-4 inline-block w-full rounded-md bg-white dark:bg-slate-700")}
                    >
                        <div className="flex justify-between items-center ">
                            <h4 className="scroll-m-20 text-base font-medium tracking-tight">{item.firstName} {item.lastName}</h4>
                            <div className="flex items-center flex-shrink-0 text-slate-500">
                                <History className="w-4 h-4 mr-2" />
                                <span className="scroll-m-20 text-base font-normal tracking-tight">{timeAgo(item.createdAt)}</span>
                            </div>
                            
                        </div> 
                        <div className="flex justify-between items-center gap-4 py-2">
                            <div className="flex items-center gap-2">
                                <CalendarCheck className="w-4 h-4" />
                                <span className="scroll-m-20 text-base font-normal tracking-tight">{item.appointmentFormattedDate}</span>
                            </div>
                            <span className="scroll-m-20 text-lg font-normal tracking-tight">{item.appointmentTime}</span>
                        </div>
                        <div className={cn("flex items-center pt-2", 
                            item.status === "approved" ? "text-teal-400" 
                            : item.status === "rejected" ? "text-rose-400" 
                            : "text-slate-500" )}
                        >
                            {item.status === "approved" ? (
                                    <Check className="mr-2 w-4 h-4" />
                                ) : item.status === "pending" ? (
                                    <CircleEllipsis className="mr-2 w-4 h-4" />
                                ) : item.status === "rejected" ? ( 
                                    <CircleX className="mr-2 w-4 h-4" />
                                ) : <CircleEllipsis className="mr-2 w-4 h-4" />
                            }
                            <span className="scroll-m-20 font-normal 
                            tracking-tight"
                            >
                                {item.status === "" ? "pending" : item.status}
                            </span>
                        </div>
                    </Link>
                </div>
            )
          })}
       </div>
      </ScrollArea>
      
    </div>

  )
}

export default page