"use client"

import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { PatientProps } from "@/utils/types"
import SalesCard from "@/components/ui/saleCard"


export function AdminDoctorPanel({
    patients,
}: {
    patients: PatientProps[]; 
}) {

    const image = null;

  return (
    <div>
        <ScrollArea className="h-auto space-x-4">
            {patients.map((data, index) => {
                return (
                    <div key={index} className="index">
                        <SalesCard 
                            email={data.email}
                            name={data.name}
                            image={image}
                            profileId={data.patientId}
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