"use client"

import React from 'react'
import DoctorCard from './DoctorCard'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Doctor } from '@/utils/types'
import { Service } from '@prisma/client'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu"
import generateSlug from '@/utils/generateSlug'

const FindDoctorPanel = ({
    doctors,
    title,
   
}: {
    doctors: Doctor[];
    title: string;

}) => {




  return (

    <div className='grid'>
        <div className='flex justify-start items-center pb-5 ml-3'>
            <h1 
                className='scroll-m-20 text-3xl font-extrabold 
                tracking-tight lg:text-4xl capitalize'
            >
                {title} ({doctors?.length.toString().padStart(2,"0")})
            </h1>
            <div className='block md:hidden'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline"><Menu className='w-4 h-4' /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel className='text-xl'>Operations</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                            {doctors.map((doctor, i) => {
                                const slug = generateSlug(`${doctor.doctorProfile?.firstName} ${doctor.doctorProfile?.lastName}`)
                                return (
                                    <div key={i} className='scroll-m-20 text-base font-medium py-2'>
                                        <DropdownMenuItem asChild>
                                        <Link 
                                            href={`/doctors/${slug}?id=${doctor.id}`} 
                                            className='hover:text-blue-600'
                                        >
                                            {`${doctor.doctorProfile?.firstName} ${doctor.doctorProfile?.lastName}`}
                                        </Link>
                                    </DropdownMenuItem>
                                    </div>  
                                )
                            })}
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        <div className='w-full grid grid-cols-12 justify-center gap-4 lg:gap-10'>
            <div className='hidden md:block md:col-span-3 shadow border border-gray-200/50 rounded-sm p-6'>
                <h2 className='scroll-m-20 text-xl font-semibold 
                tracking-tight lg:text-2xl capitalize'
                >
                    List of Doctors
                </h2>
                {doctors && doctors.length > 0 && (
                    <div className='py-3 flex flex-col text-sm gap-2'>
                        {doctors.map((doctor) => {
                            const slug = generateSlug(`${doctor.doctorProfile?.firstName} ${doctor.doctorProfile?.lastName}`)
                            return (
                                <Link 
                                    href={`/doctors/${slug}?id=${doctor.id}`}
                                    key={doctor.id} 
                                    className='hover:text-blue-600 font-medium
                                    text-lg py-3'
                                >
                                    {`${doctor.doctorProfile?.firstName} ${doctor.doctorProfile?.lastName}`}
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
            <div className='col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {doctors && doctors.length > 0 ? (
                    doctors.map((doctor) => {
                        return (
                        <DoctorCard key={doctor.id} doctor={doctor} />
                        )
                    })
                ) : "No doctor available in this category."} 
            </div>
        </div>
    </div>

  )
}

export default FindDoctorPanel