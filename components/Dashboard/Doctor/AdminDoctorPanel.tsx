"use client"

import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { Doctor } from "@/utils/types"
import SalesCard from "@/components/ui/saleCard"


export function AdminDoctorPanel({
    doctors,
}: {
    doctors: Doctor[]; 
}) {


  return (
    <div>
        <ScrollArea className="h-auto space-x-4">
            {doctors.map((data, index) => {
                const status = data.doctorProfile?.status??"PENDING"
                return (
                    <Link key={index} href={`/dashboard/doctors/view/${data.id}`}>
                        <SalesCard 
                            email={data.email}
                            name={data.name}
                            status={status}
                            image={data.doctorProfile?.profilePicture}
                            profileId={data.doctorProfile?.id}
                            className="py-4 mr-4"
                        />
                    </Link> 
                )})
            }
        </ScrollArea>
    </div>
    
  )
}


export default AdminDoctorPanel