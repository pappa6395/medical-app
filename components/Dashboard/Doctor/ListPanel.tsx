"use client"

import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { CalendarCheck, Check, CircleEllipsis, CircleX, History } from "lucide-react"
import { Appointment } from "@prisma/client"
import { timeAgo } from "@/utils/timeAgo"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"


export function ListPanel({appointment}: {appointment: Appointment[]}) {

    const pathName = usePathname();

  return (
    <div>
        <ScrollArea className="h-96 space-x-4">
            {appointment.map((item) => (
                <div key={item.id} className="mt-2 mr-4 cursor-pointer">
                    <Link 
                        href={`/dashboard/doctor/appointments/view/${item.id}`}
                        className={cn(
                            "border border-gray-100 shadow-sm text-xs py-3 px-4 inline-block w-full rounded-md bg-white dark:bg-slate-700", 
                            item.status === "approved" ? "bg-green-100/80" : item.status === "rejected" ? "bg-red-100/80" : "bg-white",
                            pathName === `/dashboard/doctor/appointments/view/${item.id}`
                            && "border-slate-600 border-2")}
                    >
                        <div className="flex justify-between items-center ">
                            <h4 className="scroll-m-20 text-lg font-medium tracking-tight">{item.firstName} {item.lastName}</h4>
                            <span className="scroll-m-20 text-lg font-normal tracking-tight">{item.appointmentTime}</span>
                        </div> 
                        <div className="flex justify-between items-center gap-4 py-2">
                            <div className="flex items-center gap-2">
                                <CalendarCheck className="w-4 h-4" />
                                <span className="scroll-m-20 text-base font-normal tracking-tight">{item.appointmentFormattedDate}</span>
                            </div>
                            <div className="flex items-center flex-shrink-0">
                                <History className="w-4 h-4 mr-2" />
                                <span className="scroll-m-20 text-base font-normal tracking-tight">{timeAgo(item.createdAt)}</span>
                            </div>
                        </div>
                        <div className={cn("flex items-center pt-2", 
                            item.status === "approved" ? "text-teal-400" 
                            : item.status === "pending" ? "text-slate-500" 
                            : "text-rose-400" )}
                        >
                            {item.status === "approved" ? (
                                    <Check className="mr-2 w-4 h-4" />
                                ) : item.status === "pending" ? (
                                    <CircleEllipsis className="mr-2 w-4 h-4" />
                                ) : item.status === "rejected" ? ( 
                                    <CircleX className="mr-2 w-4 h-4" />
                                ) : ""   
                            }
                            <span className="scroll-m-20 font-normal 
                            tracking-tight"
                            >
                                {item.status}
                            </span>
                        </div>
                    </Link>
                </div>
            ))}
        </ScrollArea>
    </div>
    
  )
}


export default ListPanel