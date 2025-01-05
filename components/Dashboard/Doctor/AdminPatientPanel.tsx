"use client"

import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { PatientProps } from "@/utils/types"
import SalesCard from "@/components/ui/saleCard"
import { Appointment } from "@prisma/client"


export function AdminDoctorPanel({
    appointments
}: {
    appointments: Appointment[]; 
}) {

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
                doctorId: app.doctorId ?? "",
                dob: app.dob ?? new Date(),
            });
            }
        });
    }
    const patients = Array.from(uniquePatientsMap.values() || []) as PatientProps[]

  return (
    <div>
        <ScrollArea className="h-auto space-x-4">
            {patients?.map((data, index) => {
                return (
                    <div key={index} className="index">
                        <SalesCard 
                            email={data.email || ""}
                            name={data.name || ""}
                            image={null}
                            profileId={data.patientId || ""}
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