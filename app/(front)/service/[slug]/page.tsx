
import { PageProps } from '@/.next/types/app/api/auth/[...nextauth]/route'
import { getDoctorsByServiceSlug, getOtherDoctorServicesByService } from '@/actions/doctors'
import DoctorCard from '@/components/DoctorCard'
import ServicePanel from '@/components/ServicePanel'
import generateSlug from '@/utils/generateSlug'
import { Doctor } from '@/utils/types'
import { Service } from '@prisma/client'
import Link from 'next/link'
import React from 'react'



const page = async ({
    params: paramsPromise, 
    searchParams 
}: PageProps) => {
     
    const { slug } = await paramsPromise
    const title = slug.split("-").join(" ")
    const { type } = await searchParams
    console.log("Type:", type);
    
    let services = null;
    try {
        services = (await getDoctorsByServiceSlug(slug))?.data || null
    } catch (err) {
        console.error("Failed to fetch doctors by service slug: ", err);
    }
    

    const serviceSlug = services?.find(service => service.slug === slug);
    
    const doctorService = serviceSlug?.doctorProfile?.map((doctor) => {
        return {
            id: doctor.userId,
            name: `${doctor.firstName} ${doctor.lastName}`,
            email: doctor.email??"",
            phone: doctor.phone??"",
            slug: generateSlug(`${doctor.firstName} ${doctor.lastName}`),
            doctorProfile: doctor,
        }
    })
    //console.log("Doctor Service:", doctorService);
    
    const otherServices = (await getOtherDoctorServicesByService(serviceSlug))?.data || []
   // console.log("Other Services:", otherServices);
    

  return (

    <div className='p-8'>
        <ServicePanel doctors={doctorService} services={otherServices} title={title} />
    </div>

  )
}

export default page