"use client"

import React from 'react'
import DoctorCard from './DoctorCard'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Doctor } from '@/utils/types'
import { Service, Speciality } from '@prisma/client'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu"

const ServicePanel = ({
    doctors,
    specialties,
    title,
}: {
    doctors: Doctor[] | undefined,
    specialties: Speciality[],
    title: string,
}) => {




  return (

    <div className='grid justify-start'>
        <div className='flex gap-4 items-center pb-5 ml-3'>
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
                        <DropdownMenuLabel>Operations</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                            {specialties.map((specialty,i) => {
                                return (
                                    <div key={i}>
                                        <DropdownMenuItem asChild>
                                            <Link 
                                                href={`/specialty/${specialty.slug}`}
                                                className='hover:text-blue-600'
                                            >
                                                {specialty.title}
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
        <div className='w-full mx-auto grid grid-cols-12 gap-6 lg:gap-10'>
            <div className='hidden md:block md:col-span-3 shadow border border-gray-200/50 rounded-sm p-6'>
                <h2 className='scroll-m-20 text-xl font-semibold 
                tracking-tight lg:text-2xl capitalize'
                >
                    Other Specialties
                </h2>
                {specialties && specialties.length > 0 && (
                    <div className='py-3 flex flex-col text-sm gap-2'>
                        {specialties.map((specialty) => {
                            return (
                                <Link 
                                    href={`/specialty/${specialty.slug}`}
                                    key={specialty.id} 
                                    className='hover:text-blue-600'
                                >
                                    {specialty.title}
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
                <div className='col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4'>
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

export default ServicePanel