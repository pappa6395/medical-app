

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAppointmentByDoctorId } from '@/actions/appointments';
import { getDoctorsById } from '@/actions/users';
import ApproveBtn from '@/components/Dashboard/ApproveBtn';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { timeAgo } from '@/utils/timeAgo';
import { CalendarCheck, Check, CircleEllipsis, CircleX, History } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { format } from "date-fns";
import pdfIcon from '@/public/pdf.png';
import Image from 'next/image';
import { DoctorDetail } from "@/utils/types";
import { PageProps } from "@/.next/types/app/api/auth/[...nextauth]/route";


const page = async ({params: paramsPromise}: PageProps) => {

  const { id } = await paramsPromise
  console.log("ID:", id);

  const appointments = (await getAppointmentByDoctorId(id))?.data || []
  console.log("Appointments:", appointments);
  const doctor = await getDoctorsById(id) as DoctorDetail
  const status = doctor?.doctorProfile?.status??"PENDING"

  const dob = doctor?.doctorProfile?.dob as Date
  const medLicense = doctor?.doctorProfile?.medicalLicenseExpiry as Date
  const formattedDob = format(dob, "dd/MM/yyyy")
  const formattedMedLicense = format(medLicense, "dd/MM/yyyy")

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
            <div className='flex flex-col items-center'>
                <ApproveBtn status={status} profileId={doctor?.doctorProfile?.id}/>
                <h2 className='scroll-m-20 text-lg 
                font-normal tracking-tight first:mt-0'>
                     Appointments ({appointments.length.toString().padStart(2,'0')})
                </h2>
            </div>
        </div>
        <div className="w-full">
            <Tabs defaultValue="doctordetails" className="w-full">
                <TabsList>
                    <TabsTrigger value="doctordetails">Doctor Details</TabsTrigger>
                    <TabsTrigger value="educationinfo">Education Info </TabsTrigger>
                    <TabsTrigger value="practiceinfo">Practice Info </TabsTrigger>
                    <TabsTrigger value="additionalinfo">Additional info </TabsTrigger>
                    <TabsTrigger value="appointments">Appointments </TabsTrigger>
                </TabsList>
                <TabsContent value="doctordetails">
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
                            >Profile Information
                            </h2>
                            <div className="grid grid-cols-2 gap-4 py-2">
                                <div className="flex items-center col-span-full divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Medical License
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.medicalLicense}
                                    </span>
                                </div>
                                <div className="flex items-center divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Years of Experience
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.yearsOfExperience}
                                    </span>
                                </div>
                                <div className="flex items-center col-span-full divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Medical License Expiry
                                    </span>
                                    <span className="px-2">
                                        {formattedMedLicense}
                                    </span>
                                </div>
                                <div className="flex items-center col-span-full divide-x-2 divide-gray-300">
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.bio}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>  
                </TabsContent>
                <TabsContent value="educationinfo">
                    <div className="grid">
                        <div className="p-4">
                            <h2 className="text-sm tracking-widest 
                            uppercase border-b pb-2 mb-1"
                            >Education Information
                            </h2>
                            <div className="grid grid-cols-2 gap-4 py-2">
                                <div className="flex items-center divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Graduation Year
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.graduationYear}
                                    </span>
                                </div>
                                <div className="flex items-center divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Primary Specialization
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.primarySpecialization}
                                    </span>
                                </div>
                                <div className="flex items-center col-span-full divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Medical School
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.medicalSchool}
                                    </span>
                                </div>
                                <div className="space-y-3 col-span-full">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Other Specialties
                                    </span>
                                    <div className="flex w-auto gap-4 p-1">
                                        {doctor?.doctorProfile?.otherSpecialties 
                                        && doctor?.doctorProfile?.otherSpecialties.map((item,i) => {
                                            return (
                                                <div  key={i} className="px-2 py-1 border border-gray-200">
                                                    {item}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="space-y-3 col-span-full">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Academic Documents
                                    </span>
                                    <div className="flex w-auto gap-4 p-1">
                                        {doctor?.doctorProfile?.boardCertificates 
                                        && doctor?.doctorProfile?.boardCertificates.map((item,i) => {
                                            return (
                                                <div  key={i} className="flex px-2 py-1 border border-gray-200 gap-2">
                                                    <Image 
                                                        src={pdfIcon} 
                                                        alt="pdficon" 
                                                        width={18} 
                                                        height={18}
                                                        className="h-4 w-4 mt-1"
                                                    />
                                                    {item}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </TabsContent>
                <TabsContent value="practiceinfo">
                    <div className="grid">
                        <div className="p-4">
                            <h2 className="text-sm tracking-widest 
                            uppercase border-b pb-2 mb-1"
                            >Practice Information
                            </h2>
                            <div className="grid grid-cols-2 gap-4 py-2">
                                <div className="flex items-center divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Hospital Name
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.hospitalName}
                                    </span>
                                </div>
                                <div className="flex items-center divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Hourly Charge
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.hourlyWage}
                                    </span>
                                </div>
                                <div className="flex items-center divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Hospital Address
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.hospitalAddress}
                                    </span>
                                </div>
                                <div className="flex items-center divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Hospital Contact
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.hospitalContactNumber}
                                    </span>
                                </div>
                                <div className="flex items-center divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Hospital Hours of operation
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.hospitalHoursOfOperation}
                                    </span>
                                </div>
                                <div className="flex items-center divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Do you accept Insurance
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.insuranceAccepted}
                                    </span>
                                </div>
                                <div className="flex items-center col-span-full divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Hospital Email Address
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.hospitalEmailAddress}
                                    </span>
                                </div>
                                <div className="flex items-center col-span-full divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Hospital Website address
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.hospitalWebsite}
                                    </span>
                                </div>
                                <div className="space-y-3 col-span-full">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Hospital Services
                                    </span>
                                    <div className="flex w-auto gap-4 p-1">
                                        {doctor?.doctorProfile?.servicesOffered && 
                                        doctor?.doctorProfile?.servicesOffered.map((item,i) => {
                                            return (
                                                <div  key={i} className="px-2 py-1 border border-gray-200">
                                                    {item}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </TabsContent>
                <TabsContent value="additionalinfo">
                    <div className="grid">
                        <div className="p-4">
                            <h2 className="text-sm tracking-widest 
                            uppercase border-b pb-2 mb-1"
                            >Additional Informaiton
                            </h2>
                            <div className="grid grid-cols-2 gap-4 py-2">
                                <div className="col-span-full">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Education History
                                    </span>
                                    <div className="px-2 py-2">
                                        <span className="px-2">
                                            {doctor?.doctorProfile?.educationHistory}
                                        </span>
                                    </div>
                                    
                                </div>
                                <div className="flex items-center col-span-full divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Published Works or Research
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.research}
                                    </span>
                                </div>
                                <div className="flex items-center col-span-full divide-x-2 divide-gray-300">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Accomplishments or awards
                                    </span>
                                    <span className="px-2">
                                        {doctor?.doctorProfile?.accomplishments}
                                    </span>
                                </div>
                                <div className="space-y-3 col-span-full">
                                    <span className="mr-3 tracking-wider font-semibold 
                                    text-slate-700"
                                    >Academic Documents
                                    </span>
                                    <div className="flex w-auto gap-4 p-1">
                                        {doctor?.doctorProfile?.additionalDocuments 
                                        && doctor?.doctorProfile?.additionalDocuments.map((item,i) => {
                                            return (
                                                <div  key={i} className="flex px-2 py-1 border border-gray-200 gap-2">
                                                    <Image 
                                                        src={pdfIcon} 
                                                        alt="pdficon" 
                                                        width={18} 
                                                        height={18}
                                                        className="h-4 w-4 mt-1"
                                                    />
                                                    {item}
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
                                        item.status === "approved" ? "text-teal-600" 
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