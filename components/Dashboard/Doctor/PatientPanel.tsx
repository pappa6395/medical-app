"use client"

import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { Check, Mail, MapPin, UserCircle } from "lucide-react"
import { UserRole } from "@prisma/client"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { PatientProps } from "@/utils/types"


export function PatientPanel({
    patients,
    role,
    userId,
}: {
    patients: PatientProps[]; 
    role: UserRole | undefined 
    userId: string;
}) {

    const pathName = usePathname();
    const currentRole = role?.toLowerCase()

  return (
    <div>
        <ScrollArea className="h-96 space-x-4">
            {patients.map((item: PatientProps) => (
                <div key={item.patientId} className="mt-2 mr-4 cursor-pointer">
                    <Link 
                        href={`/dashboard/${currentRole}/patients/view/${item.patientId}`}
                        className={cn(
                            "border border-gray-100 shadow-sm text-xs py-3 px-4 inline-block w-full rounded-md bg-white dark:bg-slate-700", 
                            pathName === `/dashboard/doctor/appointments/view/${item.patientId}`
                            && "border-slate-600 border-2")}
                    >
                        <div className="flex justify-between items-center ">
                            <h4 className="scroll-m-20 text-lg font-medium tracking-tight">{item.name}</h4>
                            <div className="flex items-center flex-shrink-0 text-slate-500">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span className="scroll-m-20 text-sm font-normal tracking-tight">{item.location}</span>
                            </div>
                            
                        </div> 
                        <div className="flex justify-between items-center gap-4 py-2">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span className="scroll-m-20 text-sm font-normal 
                                tracking-tight">
                                    {item.email}
                                </span>
                            </div>
                            <span className="scroll-m-20 text-sm font-normal tracking-tight">{item.phone}</span>
                        </div>
                        <div className={cn("flex items-center pt-2 text-slate-500")}
                        >
                            <UserCircle className="mr-2 w-4 h-4" />
                            <span className="scroll-m-20 font-normal 
                            tracking-tight"
                            >
                                {item.gender}
                            </span>
                        </div>
                    </Link>
                </div>
            ))}
        </ScrollArea>
    </div>
    
  )
}


export default PatientPanel