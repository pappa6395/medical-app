"use client"

import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { Doctor } from "@/utils/types"
import SalesCard from "@/components/ui/saleCard"
import ApproveBtn from "../ApproveBtn"


export function AdminDoctorPanel({
    doctors,
}: {
    doctors: Doctor[]; 
}) {


  return (
    <div>
        <ScrollArea className="h-auto space-x-4">
            {doctors?.map((data, index) => {
                const status = data.doctorProfile?.status??"PENDING"
                return (
                    <div key={index} className="flex items-center justify-between mr-6">
                        <Link href={`/dashboard/doctors/view/${data.id??""}`}>
                            <SalesCard 
                                email={data.email ?? ""}
                                name={data.name ?? ""}
                                status={status ?? "PENDING"}
                                image={data.doctorProfile?.profilePicture ?? null}
                                profileId={data.doctorProfile?.id ?? ""}
                                className="py-4 mr-4"
                            />
                        </Link>
                        <div>
                            <ApproveBtn status={status ?? "PENDING"} profileId={data.doctorProfile?.id ?? ""} />
                        </div> 
                    </div>
                )})
            }
        </ScrollArea>
    </div>
    
  )
}


export default AdminDoctorPanel