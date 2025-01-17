"use client"

import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { Appointment } from "@prisma/client"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { DoctorProps } from "@/utils/types"
import generateSlug from "@/utils/generateSlug"


export function DoctorPanel({
    appointments,
}: {
    appointments: Appointment[]; 
}) {
    
    const pathName = usePathname();

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

  return (
    <div>
        <ScrollArea className="h-96 space-x-4">
            {doctors.map((item: DoctorProps, i) => {
                const slug = generateSlug(item.doctorName??"Unknown Name")
                return (
                    <div key={i} className="mt-2 mr-4 cursor-pointer">
                        <Link 
                            href={`/doctors/${slug}?id=${item.doctorId}`}
                            className={cn(
                                "border border-gray-100 shadow-sm text-xs py-3 px-4 inline-block w-full rounded-md bg-white dark:bg-slate-700 focus:border-green-500", 
                                pathName === `/dashboard/doctor/patients/view/${item.doctorId}`
                                && "border-green-600 bg-green-50 border-2")}
                        >
                            <div className="flex justify-between items-center ">
                                <h4 className="scroll-m-20 text-lg 
                                font-medium tracking-tight"
                                >
                                    {item.doctorName}
                                </h4>
                            </div> 
                        </Link>
                    </div>
                )
            })}
        </ScrollArea>
    </div>
    
  )
}


export default DoctorPanel