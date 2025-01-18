import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ServiceDoctorProfileCountProps } from '@/utils/types'


const ServiceCard  = ({ service }: {service: ServiceDoctorProfileCountProps}) => {


  return (

    <Link href={`/service/${service.slug}`} className='rounded-md 
    bg-emerald-50 dark:bg-emerald-900 hover:bg-slate-200 
    duration-300 flex items-center gap-4 overflow-hidden px-2'>
        <Image
            src={service.imageUrl} 
            alt={service.title} 
            width={1170} 
            height={848}
            className='w-14 h-14 object-contain aspect-video'/>
        <div className='flex flex-col w-2/3 py-4'>
            <h2>{service.title}</h2>
            <p className='text-[0.6rem]'>{service._count.doctorProfile.toString().padStart(2,"0")} Doctors Available</p>
        </div>
    </Link>

  )
}

export default ServiceCard