import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ServiceProps } from '@/utils/types'


const ServiceCard  = ({ service }: {service: ServiceProps}) => {


  return (

    <Link href={`/services/${service.slug}`} className='rounded-md 
    bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 
    duration-300 flex gap-4 overflow-hidden'>
        <Image
            src={service.image} 
            alt={service.title} 
            width={1170} 
            height={848}
            className='w-1/3 object-cover aspect-video'/>
        <div className='flex flex-col w-2/3 py-4'>
            <h2>{service.title}</h2>
            <p className='text-[0.6rem]'>936 Doctors Available</p>
        </div>
    </Link>

  )
}

export default ServiceCard