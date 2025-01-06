import { Appointment } from '@prisma/client'
import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import Image from 'next/image'
import pdfIcon from '@/public/pdf.png'
import { CalendarCheck, Check, CircleEllipsis, CircleX, History } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { timeAgo } from '@/utils/timeAgo';
import { formatCreatedDate } from '@/utils/formattedDate';


const AdminPatientDetail = ({
  appointments=[], 
  patients=null
}: {
  appointments: Appointment[]; 
  patients: Appointment | undefined | null;
}) => {

  const dob = patients?.dob as Date
  const formattedDob = formatCreatedDate(dob) || ""

  return (

    <div>
        <ScrollArea className="h-auto w-auto space-x-4">
            <div className='flex items-center w-full justify-between p-4'>
                <div className=''>
                    <h2 className='scroll-m-20 text-xl 
                    font-semibold tracking-tight first:mt-0'
                    >
                        {`${patients?.firstName || "Unknown"} ${patients?.lastName || "Unknown"}`}
                    </h2>
                    <h2 className=''>
                        {patients?.email || ""} | {patients?.phone || ""}
                    </h2>
                </div>
                <div className='flex flex-col items-center'>
                    <h2 className='scroll-m-20 text-lg 
                    font-normal tracking-tight first:mt-0'>
                        Appointments ({appointments?.length.toString().padStart(2,'0') || 0})
                    </h2>
                </div>
            </div>
            <div className="w-full">
                <Tabs defaultValue="patientdetails" className="w-full">
                    <TabsList>
                        <TabsTrigger value="patientdetails">Patient Details</TabsTrigger>
                        <TabsTrigger value="appointments">Appointments </TabsTrigger>
                    </TabsList>
                    <TabsContent value="patientdetails">
                        <div className="grid">
                            <div className="p-4">
                                <h2 className="text-sm tracking-widest 
                                uppercase border-b pb-2 mb-1"
                                >Patient Information
                                </h2>
                                <div className="grid grid-cols-2 gap-4 py-2">
                                    <div className="flex items-center divide-x-2 divide-gray-300">
                                        <span className="mr-3 tracking-wider font-semibold 
                                        text-slate-700 dark:text-slate-400"
                                        >First Name
                                        </span>
                                        <span className="px-2">
                                            {patients?.firstName || "Unknown"}
                                        </span>
                                    </div>
                                    <div className="flex items-center divide-x-2 divide-gray-300">
                                        <span className="mr-3 tracking-wider font-semibold 
                                        text-slate-700 dark:text-slate-400"
                                        >Last Name
                                        </span>
                                        <span className="px-2">
                                            {patients?.lastName || "Unknown"}
                                        </span>
                                    </div>
                                    <div className="flex items-center divide-x-2 divide-gray-300">
                                        <span className="mr-3 tracking-wider font-semibold 
                                        text-slate-700 dark:text-slate-400"
                                        >Date of Birth
                                        </span>
                                        <span className="px-2">
                                            {formattedDob || "Unknown"}
                                        </span>
                                    </div>
                                    <div className="flex items-center divide-x-2 divide-gray-300">
                                        <span className="mr-3 tracking-wider font-semibold 
                                        text-slate-700 dark:text-slate-400"
                                        >Gender
                                        </span>
                                        <span className="px-2">
                                            {patients?.gender || "Unknown"}
                                        </span>
                                    </div>
                                    <div className="flex items-center divide-x-2 divide-gray-300">
                                        <span className="mr-3 tracking-wider font-semibold 
                                        text-slate-700 dark:text-slate-400"
                                        >Location
                                        </span>
                                        <span className="px-2">
                                            {patients?.location || "Unknown"}
                                        </span>
                                    </div>
                                    <div className="flex items-center divide-x-2 divide-gray-300">
                                        <span className="mr-3 tracking-wider font-semibold 
                                        text-slate-700 dark:text-slate-400"
                                        >Occupation
                                        </span>
                                        <span className="px-2">
                                            {patients?.occupation || "Unknown"}
                                        </span>
                                    </div>
                                    <div className="flex items-center divide-x-2 divide-gray-300">
                                        <span className="mr-3 tracking-wider font-semibold 
                                        text-slate-700 dark:text-slate-400"
                                        >Email
                                        </span>
                                        <span className="px-2">
                                            {patients?.email || "Unknown"}
                                        </span>
                                    </div>
                                    <div className="flex items-center divide-x-2 divide-gray-300">
                                        <span className="mr-3 tracking-wider font-semibold 
                                        text-slate-700 dark:text-slate-400"
                                        >Phone No.
                                        </span>
                                        <span className="px-2">
                                            {patients?.phone || "Unknown"}
                                        </span>
                                    </div>
                                    <div className="flex items-center divide-x-2 divide-gray-300">
                                        <span className="mr-3 tracking-wider font-semibold 
                                        text-slate-700 dark:text-slate-400"
                                        >Appointment Reason
                                        </span>
                                        <span className="px-2">
                                            {patients?.appointmentReason || "Unknown"}
                                        </span>
                                    </div>
                                    <div className="space-y-3 col-span-full">
                                        <span className="mr-3 tracking-wider font-semibold 
                                        text-slate-700 dark:text-slate-400"
                                        >Medical Documents
                                        </span>
                                        <div className="flex w-auto gap-4 p-1">
                                            {patients?.medicalDocument.map((item,i) => {
                                                return (
                                                    <div key={i} className="flex px-2 py-1 border border-gray-200 gap-2">
                                                        <Image 
                                                            src={pdfIcon} 
                                                            alt="pdficon" 
                                                            width={18} 
                                                            height={18}
                                                            className="h-4 w-4 mt-1"
                                                        />
                                                        {item || "Unknown"}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>  
                    </TabsContent>
                    <TabsContent value="appointments">
                        <div className="grid grid-cols-2">
                            {appointments?.map((item, i) => {
                            return (
                            <div key={i} className="grid col-span-1 mt-2 mr-4 cursor-pointer">
                                    <Link 
                                        href={`/dashboard/doctor/appointments/view/${item.patientId || ""}`}
                                        className={cn(
                                            "border border-gray-100 shadow-sm text-xs py-3 px-4 inline-block rounded-md bg-white dark:bg-slate-700")}
                                    >
                                        <div className="flex justify-between items-center ">
                                            <h4 className="scroll-m-20 text-base font-medium tracking-tight">{item.firstName || "Unknown"} {item.lastName || "Unknown"}</h4>
                                            <div className="flex items-center flex-shrink-0 text-slate-500">
                                                <History className="w-4 h-4 mr-2" />
                                                <span className="scroll-m-20 text-base font-normal tracking-tight">{timeAgo(item.createdAt) || ""}</span>
                                            </div>
                                            
                                        </div> 
                                        <div className="flex justify-between items-center gap-4 py-2">
                                            <div className="flex items-center gap-2">
                                                <CalendarCheck className="w-4 h-4" />
                                                <span className="scroll-m-20 text-base font-normal tracking-tight">{item.appointmentFormattedDate || ""}</span>
                                            </div>
                                            <span className="scroll-m-20 text-lg font-normal tracking-tight">{item.appointmentTime || ""}</span>
                                        </div>
                                        <div className={cn("flex items-center pt-2", 
                                            item?.status === "approved" ? "text-teal-600" 
                                            : item?.status === "rejected" ? "text-rose-400" 
                                            : "text-slate-500" )}
                                        >
                                            {item?.status === "approved" ? (
                                                    <Check className="mr-2 w-4 h-4" />
                                                ) : item?.status === "pending" ? (
                                                    <CircleEllipsis className="mr-2 w-4 h-4" />
                                                ) : item?.status === "rejected" ? ( 
                                                    <CircleX className="mr-2 w-4 h-4" />
                                                ) : <CircleEllipsis className="mr-2 w-4 h-4" />
                                            }
                                            <span className="scroll-m-20 font-normal 
                                            tracking-tight"
                                            >
                                                {item?.status === "" ? "pending" : item?.status}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            )
                            })}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
      </ScrollArea>
    </div>

  )
}

export default AdminPatientDetail