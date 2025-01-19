"use client"

import React from 'react'
import { UserRole } from '@prisma/client'
import { CalendarCheck, Check, CircleEllipsis, CircleX, History } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { timeAgo } from '@/utils/timeAgo'
import { usePathname } from 'next/navigation'

type RecentAppointmentCardProps = {
  role: UserRole | undefined,
  id: string;
  status: string;
  firstName: string;
  lastName : string;
  appointmentTime: string;
  appointmentFormattedDate: string;
  createdAt: Date;
}

const RecentAppointmentCard = ({
  role=undefined,
  id="",
  status="",
  firstName="",
  lastName="",
  appointmentTime="",
  appointmentFormattedDate="",
  createdAt=new Date(),
}: RecentAppointmentCardProps) => {

  const pathName = usePathname()

  return (

    <div>
        <div className="mt-2 mr-2 cursor-pointer">
            <Link 
                href={`/dashboard/${role === "DOCTOR" ? "doctor" : "user"}/appointments/view/${id??""}`}
                className={cn(
                    "border border-gray-100 shadow-sm text-xs py-3 md:px-4 px-3 inline-block w-full rounded-md bg-white dark:bg-slate-700", 
                    status === "approved" ? "bg-green-100/80" : status === "rejected" ? "bg-red-100/80" : "bg-white",
                    pathName === `/dashboard/doctor/appointments/view/${id??""}`
                    && "border-slate-600 border-2")}
            >
                <div className="flex justify-between items-center ">
                    <h4 className="scroll-m-20 text-base md:text-lg font-medium tracking-tight">{firstName ?? ""} {lastName ?? ""}</h4>
                    <div className="flex items-center flex-shrink-0 text-slate-500 mr-4 md:mr-0">
                        <History className="w-4 h-4 mr-2" />
                        <span className="scroll-m-20 md:text-base text-sm font-normal tracking-tight">{timeAgo(createdAt) ?? ""}</span>
                    </div>
                    
                </div> 
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 w-[100px] md:w-[200px]">
                        <CalendarCheck className="w-4 h-4" />
                        <span className="scroll-m-20 text-base font-normal tracking-tight">{appointmentFormattedDate ?? ""}</span>
                    </div>
                    <div className='flex justify-start md:gap-6 gap-4'>
                        <div className={cn("flex items-center", 
                            status === "approved" ? "text-teal-400" 
                            : status === "rejected" ? "text-rose-400" 
                            : "text-slate-500" )}
                        >
                            {status === "approved" ? (
                                    <Check className="mr-2 md:size-4 size-3" />
                                ) : status === "pending" ? (
                                    <CircleEllipsis className="mr-2 md:size-4 size-3" />
                                ) : status === "rejected" ? ( 
                                    <CircleX className="mr-2 md:size-4 size-3" />
                                ) : <CircleEllipsis className="mr-2 md:size-4 size-3" />
                            }
                            <span className="scroll-m-20 font-normal 
                            tracking-tight md:text-xs text-[10px]"
                            >
                                {status??"pending"}
                            </span>
                        </div>
                        <p className="scroll-m-20 text-lg font-normal w-[95px] md:w-[80px] tracking-tight">{appointmentTime ?? ""}</p>
                    </div>  
                </div>
            </Link>
        </div>
    </div>


  )
}

export default RecentAppointmentCard