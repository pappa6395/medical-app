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
                    "border border-gray-100 shadow-sm text-xs py-3 px-4 inline-block w-full rounded-md bg-white dark:bg-slate-700", 
                    status === "approved" ? "bg-green-100/80" : status === "rejected" ? "bg-red-100/80" : "bg-white",
                    pathName === `/dashboard/doctor/appointments/view/${id??""}`
                    && "border-slate-600 border-2")}
            >
                <div className="flex justify-between items-center ">
                    <h4 className="scroll-m-20 text-lg font-medium tracking-tight">{firstName ?? ""} {lastName ?? ""}</h4>
                    <div className="flex items-center flex-shrink-0 text-slate-500">
                        <History className="w-4 h-4 mr-2" />
                        <span className="scroll-m-20 text-base font-normal tracking-tight">{timeAgo(createdAt) ?? ""}</span>
                    </div>
                    
                </div> 
                <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <CalendarCheck className="w-4 h-4" />
                        <span className="scroll-m-20 text-base font-normal tracking-tight">{appointmentFormattedDate ?? ""}</span>
                    </div>
                    <div className={cn("flex items-center", 
                        status === "approved" ? "text-teal-400" 
                        : status === "rejected" ? "text-rose-400" 
                        : "text-slate-500" )}
                    >
                        {status === "approved" ? (
                                <Check className="mr-2 w-4 h-4" />
                            ) : status === "pending" ? (
                                <CircleEllipsis className="mr-2 w-4 h-4" />
                            ) : status === "rejected" ? ( 
                                <CircleX className="mr-2 w-4 h-4" />
                            ) : <CircleEllipsis className="mr-2 w-4 h-4" />
                        }
                        <span className="scroll-m-20 font-normal 
                        tracking-tight"
                        >
                            {status??"pending"}
                        </span>
                    </div>
                    <span className="scroll-m-20 text-lg font-normal tracking-tight">{appointmentTime ?? ""}</span>
                </div>
            </Link>
        </div>
    </div>


  )
}

export default RecentAppointmentCard