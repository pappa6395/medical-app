

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageProps } from '@/.next/types/app/(back)/dashboard/doctors/view/[id]/page';
import { getAppointmentByDoctorId, getAppointmentById, getAppointmentByPatientIdAndDoctorId, getAppointments } from '@/actions/appointments';
import { getDoctorsById } from '@/actions/users';
import ApproveBtn from '@/components/Dashboard/ApproveBtn';
import { ScrollArea } from '@/components/ui/scroll-area';
import { authOptions } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { timeAgo } from '@/utils/timeAgo';
import { CalendarCheck, Check, CircleEllipsis, CircleX, History } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react'
import { getFormattedDate } from "@/utils/formattedDate";
import { format } from "date-fns";

const page = async ({params: paramsPromise}: PageProps) => {

  const { id } = await paramsPromise
  console.log("ID:", id);

  const session = await getServerSession(authOptions)
  const user = session?.user
  const userId = user?.id || ""

  const appointments = (await getAppointmentByDoctorId(id))?.data || []
  console.log("Appointments:", appointments);
  const doctor = await getDoctorsById(id) 
  const status = doctor?.doctorProfile?.status??"PENDING"

  const dob = doctor?.doctorProfile?.dob as Date
  const formattedDob = format(dob, "dd/MM/yyyy")

  return (

    <div>
      <ScrollArea className="h-auto w-auto space-x-4">
        <div className='flex items-center w-full justify-between p-4'>
            <div className=''>
                <h2 className='scroll-m-20 text-xl 
                font-semibold tracking-tight first:mt-0'
                >
                    {doctor?.name} 
                </h2>
                <h2 className=''>
                    {doctor?.email} | {doctor?.phone}
                </h2>
            </div>
            <div className=''>
                <ApproveBtn status={status}/>
                <h2 className='scroll-m-20 text-xl 
                font-medium tracking-tight first:mt-0'>
                     Appointments
                </h2>
            </div>
        </div>
        <div className="w-full">
            <Tabs defaultValue="details" className="w-full">
                <TabsList>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="appointments">Appointments ({appointments.length??"0"})</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                    <div className="grid">
                        <div className="p-4">
                            <h2 className="text-sm tracking-widest 
                            uppercase border-b pb-2 mb-1"
                            >Bio Data
                            </h2>
                            <div className="grid grid-cols-2 gap-4 py-2">
                                <div className="flex items-center divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >First Name
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.firstName}
                                    </span>
                                </div>
                                <div className="flex items-center divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Last Name
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.lastName}
                                    </span>
                                </div>
                                <div className="flex items-center divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Middle Name
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.middleName}
                                    </span>
                                </div>
                                <div className="flex items-center divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Date of Birth
                                    </span>
                                    <span className="px-2">
                                        {formattedDob}
                                    </span>
                                </div>
                                <div className="flex items-center divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Gender
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.gender}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <h2 className="text-sm tracking-widest 
                            uppercase border-b pb-2 mb-1"
                            >Profile Info
                            </h2>
                            <div className="grid grid-cols-2 gap-4 py-2">
                                <div className="flex items-center divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >First Name
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.firstName}
                                    </span>
                                </div>
                                <div className="flex items-center divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Last Name
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.lastName}
                                    </span>
                                </div>
                                <div className="flex items-center divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Middle Name
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.middleName}
                                    </span>
                                </div>
                                <div className="flex items-center divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Date of Birth
                                    </span>
                                    <span className="px-2">
                                        {formattedDob}
                                    </span>
                                </div>
                                <div className="flex items-center divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Gender
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.gender}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </TabsContent>
                <TabsContent value="appointments">
                    <div className="grid grid-cols-2">
                        {appointments.map((item) => {
                        return (
                        <div key={item.id} className="grid col-span-1 mt-2 mr-4 cursor-pointer">
                                <Link 
                                    href={`/dashboard/doctor/appointments/view/${item.patientId}`}
                                    className={cn(
                                        "border border-gray-100 shadow-sm text-xs py-3 px-4 inline-block rounded-md bg-white dark:bg-slate-700")}
                                >
                                    <div className="flex justify-between items-center ">
                                        <h4 className="scroll-m-20 text-base font-medium tracking-tight">{item.firstName} {item.lastName}</h4>
                                        <div className="flex items-center flex-shrink-0 text-slate-500">
                                            <History className="w-4 h-4 mr-2" />
                                            <span className="scroll-m-20 text-base font-normal tracking-tight">{timeAgo(item.createdAt)}</span>
                                        </div>
                                        
                                    </div> 
                                    <div className="flex justify-between items-center gap-4 py-2">
                                        <div className="flex items-center gap-2">
                                            <CalendarCheck className="w-4 h-4" />
                                            <span className="scroll-m-20 text-base font-normal tracking-tight">{item.appointmentFormattedDate}</span>
                                        </div>
                                        <span className="scroll-m-20 text-lg font-normal tracking-tight">{item.appointmentTime}</span>
                                    </div>
                                    <div className={cn("flex items-center pt-2", 
                                        item.status === "approved" ? "text-teal-400" 
                                        : item.status === "rejected" ? "text-rose-400" 
                                        : "text-slate-500" )}
                                    >
                                        {item.status === "approved" ? (
                                                <Check className="mr-2 w-4 h-4" />
                                            ) : item.status === "pending" ? (
                                                <CircleEllipsis className="mr-2 w-4 h-4" />
                                            ) : item.status === "rejected" ? ( 
                                                <CircleX className="mr-2 w-4 h-4" />
                                            ) : <CircleEllipsis className="mr-2 w-4 h-4" />
                                        }
                                        <span className="scroll-m-20 font-normal 
                                        tracking-tight"
                                        >
                                            {item.status === "" ? "pending" : item.status}
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

export default page