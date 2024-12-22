import { PageProps } from '@/.next/types/app/(front)/service/[slug]/page'
import { getDoctorsBySlug } from '@/actions/doctors'
import DoctorCard from '@/components/DoctorCard'
import generateSlug from '@/utils/generateSlug'
import { Doctor } from '@/utils/types'
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
    
    const services = (await getDoctorsBySlug(slug))?.data || []
    console.log("doctors:", services);

    const serviceSlug = services.find(service => service.slug === slug);
    
    const doctorService = serviceSlug?.doctorProfile.map((doctor) => {
        return {
            id: doctor.userId,
            name: `${doctor.firstName} ${doctor.lastName}`,
            email: doctor.email??"",
            phone: doctor.phone??"",
            slug: generateSlug(`${doctor.firstName} ${doctor.lastName}`),
            doctorProfile: doctor,
        }
    })
    console.log("Doctor Service:", doctorService);
    

  return (

    <div className='container p-8'>
        <h1 
            className='scroll-m-20 text-3xl font-extrabold 
            tracking-tight lg:text-4xl pb-6  capitalize'
        >
            {title} (10)
        </h1>
        <div className='max-5-xl mx-auto grid grid-cols-12 gap-6 lg:gap-10'>
            <div className='col-span-4 shadow border border-gray-200/50 rounded-sm p-6'>
                <h2 className='scroll-m-20 text-xl font-semibold 
                tracking-tight lg:text-2xl capitalize'
                >
                    Other Services
                </h2>
                <div className='py-3 flex flex-col text-sm'>
                    <Link href={"#"} className='hover:text-blue-600'>
                        Link One
                    </Link>
                    <Link href={"#"} className='hover:text-blue-600'>
                        Link One
                    </Link>
                    <Link href={"#"} className='hover:text-blue-600'>
                        Link One
                    </Link>
                    <Link href={"#"} className='hover:text-blue-600'>
                        Link One
                    </Link>
                    <Link href={"#"} className='hover:text-blue-600'>
                        Link One
                    </Link>
                    <Link href={"#"} className='hover:text-blue-600'>
                        Link One
                    </Link>
                </div>
                
            </div>
            <div className='col-span-8 grid grid-cols-2 gap-4'>
                {doctorService && doctorService.length > 0 ? (
                    doctorService.map((doctor) => {
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

export default page