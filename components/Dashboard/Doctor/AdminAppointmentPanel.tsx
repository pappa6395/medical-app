"use client"

import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { AppointmentProps, PatientProps } from "@/utils/types"
import SalesCard from "@/components/ui/saleCard"
import { Appointment } from "@prisma/client"
import PatientCard from "@/components/PatientCard"


export function AdminDoctorPanel({
    appointments,
}: {
    appointments: Appointment[]; 
}) {


  return (
    <div>
        <ScrollArea className="h-[500px] space-x-4">
            {appointments?.map((data, index) => {
                return (
                    <div key={index} className="index">
                        <PatientCard 
                            email={data.email || ""}
                            name={`${data.firstName || "Unknown"} ${data.lastName || "Unknown"}`}
                            appointmentId={data.id || ""}
                            createdAt={data.createdAt || new Date()}
                            className="py-4 mr-4"
                        />
                    </div>
                )})
            }
        </ScrollArea>
    </div>
    
  )
}


export default AdminDoctorPanel