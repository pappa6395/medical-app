import { Appointment } from '@prisma/client'
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import { Calendar, Mail, Phone, Video } from 'lucide-react';
import { getAgeFromDoB } from '@/utils/getAgeFromDoB';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { convertTimeStringToDateTime } from '@/utils/convertTimeStringtoDateTime';


const AdminAppointmentCard = ({
    appointment
}: {
    appointment: Appointment | undefined | null;
}) => {

    const convertTime = convertTimeStringToDateTime(
        appointment?.appointmentDate || null ,
        appointment?.appointmentTime || null
    )

    const dob = appointment?.dob?.toLocaleDateString("en-us", {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    const medicalDocs = appointment?.medicalDocument.map((item,i) => {
        return (
        <Button key={i} variant={"outline"} asChild>
            <Link href={item} download>
            {`Doc-${i+1}`}
            </Link>
        </Button>
        )
    })

  return (

    <div>
    <div className='flex justify-between mt-2 border-b px-4 py-4'>
      <div className=''>
        <h2 className="scroll-m-20 pb-2 text-2xl 
          font-medium tracking-tight first:mt-2"
        >
        {`${appointment?.firstName} ${appointment?.lastName}`} 
        </h2>
        <div className="flex space-x-2 divide-x-2 divide-gray-200">
          <p className='px-2'>({appointment?.gender})</p>
          <p className='px-2'>{appointment?.phone}</p>
        </div>
      </div>
      <div>
        <h2 className="scroll-m-20 pb-2 text-2xl 
        font-medium tracking-tight first:mt-2"
        >
        {appointment?.appointmentFormattedDate}
        </h2>
        <div className='flex items-center font-medium text-lg'>
          <Calendar className='w-4 h-4 mr-2'/>
          <span>{appointment?.appointmentTime}</span>
        </div>
      </div>
    </div>
    <div className=''>
        <Card className='border border-green-600 shadow rounded-md'>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Appointment Status</CardTitle>
                        <CardDescription className='scroll-m-20 text-lg 
                            font-semibold tracking-tight py-2'>
                            { appointment?.status === "approved" 
                            ? "Your appointment is approved" 
                            : appointment?.status === "rejected" 
                            ? "Your appointment is cancelled" 
                            : "Your appointment is pending" }
                        </CardDescription>
                    </div>
                    <Button variant={"outline"}>
                        {appointment?.status === "approved" 
                        ? `${appointment.appointmentFormattedDate || ""} - ${appointment.appointmentTime || ""}` 
                        : appointment?.status === "rejected" 
                        ? "Cancelled" : "Pending"}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className='shadow-none border-none mb-3 space-y-2'>
                {appointment?.status === "approved" ? (
                    <div className='space-y-2'>
                        <div className="flex items-center justify-between">
                        <h3 className='capitalize'>{" "}{appointment?.meetingProvider || ""} Link</h3>
                        <Button 
                            variant={"outline"} 
                            asChild
                            disabled={new Date() < new Date(appointment?.appointmentDate??"") 
                            ? true : new Date() < new Date(convertTime) 
                            ? true : false}
                            className={new Date() < new Date(appointment?.appointmentDate??"") 
                            ? "opacity-50 cursor-not-allowed" : new Date() < new Date(convertTime) 
                            ? "opacity-50 cursor-not-allowed" : "" }
                        >
                            <Link 
                            href={new Date() < new Date(appointment?.appointmentDate??"") 
                                ? "#" : new Date() < new Date(convertTime) 
                                ? "#" : appointment?.meetingLink || ""}
                            ><Video className='h-4 w-4'/>Join Meeting
                            </Link>
                        </Button>
                        </div>
                        <div className="flex items-center justify-between">
                            <h3 className='capitalize'>{" "}Others</h3>
                            <div className='space-x-2'>
                                <Button variant={"outline"} asChild>
                                    <Link href={"#"}>
                                        <Phone className='h-4 w-4'/>
                                        <span>Call Doctor</span>
                                    </Link>
                                </Button>
                                <Button variant={"outline"} asChild>
                                    <Link href={"/dashboard/user/inbox/new"}>
                                        <Mail className='h-4 w-4'/>
                                        <span>Mail Doctor</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                    ) : (
                    ""
                    )} 
            </CardContent> 
        </Card>
    </div>
    <div className="grid grid-cols-5 py-4 divide-x-2 divide-gray-200">
      <div className="col-span-2 flex px-4 py-3 space-x-2 divide-x-2 
      divide-gray-200 border-b"
      >
        <p className='px-3'>Age</p>
        <p className='px-4'>{dob ? getAgeFromDoB(dob) : "N/A"}</p>
      </div>
      <div className="col-span-3 flex px-4 py-3 space-x-2 divide-x-2 
        divide-gray-200 border-b"
      >
        <p className='px-3'>Date of Birth</p>
        <p className='px-4'>{dob}</p>
      </div>
    </div>
    <div className="py-4">
      <div className="flex px-4 py-3 space-x-2 divide-x-2 
      divide-gray-200 border-b"
      >
      <p className='px-3'>Location</p>
      <p className='px-3'>{appointment?.location}</p>
      </div>
    </div>
    <div className="py-4">
      <div className="flex px-4 py-3 space-x-2 divide-x-2 
      divide-gray-200 border-b"
      >
      <p className='px-3'>Email Address</p>
      <p className='px-3'>{appointment?.email}</p>
      </div>
    </div>
    <div className="py-4">
      <div className="flex px-4 py-3 space-x-2 divide-x-2 
      divide-gray-200 border-b"
      >
      <p className='px-3'>Reason</p>
      <p className='px-3'>{appointment?.appointmentReason}</p>
      </div>
    </div>
    <div className="py-4">
      <div className="flex px-4 py-3 space-x-2 divide-x-2 
      divide-gray-200 border-b"
      >
      <p className='px-3'>Medical Docs</p>
      <p className='px-3'>{medicalDocs}</p>
      </div>
    </div> 
  </div>

  )
}

export default AdminAppointmentCard