import { DoctorDetail } from '@/utils/types'
import { Appointment } from '@prisma/client';
import React from 'react'
import Image from 'next/image'
import doctorProfile1 from '@/public/doctorProfile1.jpeg'
import { CheckCircle, CircleEllipsis, CircleX } from 'lucide-react';
import DoctorDetails from './DoctorDetails';

const DoctorSlugDetails = ({
    doctorSlug,
    appointment,
    patientId,
}: {
    doctorSlug: DoctorDetail | undefined | null;
    appointment: Appointment | undefined | null;
    patientId: string;
}) => {


  return (

    <div>
        {doctorSlug && doctorSlug?.id ? (
            <div className='bg-slate-50 dark:bg-slate-950 py-8 min-h-screen'>
            <div className="bg-white dark:bg-slate-900 border 
                border-gray-200 dark:border-gray-500 
                    mx-4 md:mx-24 shadow-md rounded-lg
                    ">
                <div className='py-16 px-8'>
                    <div className='flex sm:justify-between items-center px-9'>
                        <div className=''>
                            <div className='flex flex-col sm:flex-row justify-center items-center py-3 space-x-2'>
                                <Image 
                                    src={doctorSlug.doctorProfile?.profilePicture || doctorProfile1} 
                                    alt="doctor" 
                                    width={200} 
                                    height={250} 
                                    className='w-32 h-32 rounded-full 
                                    object-scale-down bg-gray-200
                                    block sm:hidden'
                                    />
                                <div className='flex sm:block mt-2 sm:ml-0 ml-3'>
                                    <div className=''>
                                        <h2 className='uppercase font-bold 
                                        text-2xl tracking-widest text-nowrap'>
                                            {`${doctorSlug.doctorProfile?.firstName || "Unknown"} ${doctorSlug.doctorProfile?.lastName || "Unknown"}`}
                                        </h2>
                                        <p className='text-gray-500 text-xs uppercase'>
                                            {doctorSlug.doctorProfile?.primarySpecialization || ""}
                                        </p>
                                    </div>
                                    <div className='block sm:hidden pt-5'>
                                        {doctorSlug?.doctorProfile?.status === "APPROVED" ? (
                                            <p className='flex gap-2 items-center -translate-y-1'>
                                                <CheckCircle className='w-6 h-6 text-green-500' />
                                            </p>
                                        ) : doctorSlug?.doctorProfile?.status === "PENDING" ? (
                                            <p className='flex gap-2 items-center -translate-y-1'>
                                                <CircleEllipsis className='w-6 h-6 text-amber-500' />
                                            </p>
                                        ) : (
                                            <p className='flex gap-2 items-center -translate-y-1'>
                                                <CircleX className='w-6 h-6 text-red-500' />
                                            </p>
                                        )} 
                                    </div>
                                </div>
                                <div className='flex items-center sm:justify-between w-full gap-6'>
                                    <div className='py-6 block sm:hidden'>
                                        <p>{doctorSlug.doctorProfile?.operationMode || ""}</p>
                                        <p>{doctorSlug.doctorProfile?.hospitalAddress || ""}</p>
                                    </div>
                                </div>
                                <div className='hidden sm:block'>
                                    {doctorSlug?.doctorProfile?.status === "APPROVED" ? (
                                        <div className='flex gap-2 items-center -translate-y-1'>
                                            <CheckCircle className='w-6 h-6 text-green-500' />
                                            <span className='border rounded-md
                                            p-2 bg-green-500 dark:bg-green-600 text-green-100'
                                            >Verified
                                            </span>
                                        </div>
                                    ) : doctorSlug?.doctorProfile?.status === "PENDING" ? (
                                        <div className='flex gap-2 items-center -translate-y-1'>
                                            <CircleEllipsis className='w-6 h-6 text-amber-500' />
                                            <span className='border rounded-md
                                            p-2 bg-amber-500 dark:bg-amber-600 text-amber-100'
                                            >Pending
                                            </span>
                                        </div>
                                    ) : (
                                        <div className='flex gap-2 items-center -translate-y-1'>
                                            <CircleX className='w-6 h-6 text-red-500' />
                                            <span className='border rounded-md
                                            p-2 bg-red-500 dark:bg-red-600 text-red-100'
                                            >Unverified
                                            </span>
                                        </div>
                                    )} 
                                </div>
                            </div>
                            <div className='py-6 px-2 hidden sm:block'>
                                <p>{doctorSlug?.doctorProfile?.operationMode}</p>
                                <p>{doctorSlug?.doctorProfile?.hospitalAddress}</p>
                            </div> 
                        </div>
                        <Image 
                            src={doctorSlug?.doctorProfile?.profilePicture?? doctorProfile1} 
                            alt="doctor" 
                            width={200} 
                            height={250} 
                            className='w-32 h-32 rounded-full 
                            object-scale-down bg-gray-200
                            mr-6 hidden sm:block'
                        />
                    </div>
                </div>
                <div>
                    <DoctorDetails doctor={doctorSlug ?? null} appointment={appointment ?? null} patientId={patientId ?? ""} />
                </div>
            </div>
        </div>
        ) : (
            <div className='flex flex-col items-center justify-center h-screen'>
                <p className='text-gray-500 text-2xl'>Doctor Detail not found</p>
            </div>
        )}
    </div>

  )
}

export default DoctorSlugDetails