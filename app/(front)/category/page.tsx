
import { PageProps } from '@/.next/types/app/(front)/service/[slug]/page'
import { getService } from '@/actions/services'
import { getDoctors } from '@/actions/users'
import DoctorCard from '@/components/DoctorCard'
import Link from 'next/link'
import React from 'react'



const page = async ({
    searchParams 
}: PageProps) => {
     
    
    const { mode } = await searchParams
    console.log("Mode:", mode);
    
    const allDoctors = (await getDoctors()) || [];
    
    const doctors = allDoctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === mode);

    const services = (await getService()).data || []

    // const doctorsMode: any = doctors.find(doctor => doctor.doctorProfile?.operationMode === mode);
    // const otherMode = (await getDoctorCategoryByDoctorMode(doctorsMode))?.data || []
      
  return (

    <div className='container p-8'>
        <h1 
            className='scroll-m-20 text-3xl font-extrabold 
            tracking-tight lg:text-4xl pb-6  capitalize'
        >
            {mode} ({doctors?.length.toString().padStart(2,"0")})
        </h1>
        <div className='max-5-xl mx-auto grid grid-cols-12 gap-6 lg:gap-10'>
            <div className='col-span-4 shadow border border-gray-200/50 rounded-sm p-6'>
                <h2 className='scroll-m-20 text-xl font-semibold 
                tracking-tight lg:text-2xl capitalize'
                >
                    Operations
                </h2>
                {/* {doctors && doctors.length > 0 && (
                    <div className='py-3 flex flex-col text-sm gap-2'>
                        {otherMode.map((doctor) => {
                            return (
                                <Link 
                                    href={`/category?mode=${mode}`}
                                    key={doctor.id} 
                                    className='hover:text-blue-600'
                                >
                                    {doctor.doctorProfile?.operationMode}
                                </Link>
                            )
                        })}
                    </div>
                )} */}
                {services && services.length > 0 && (
                    <div className='py-3 flex flex-col text-sm gap-2'>
                        {services.map((service) => {
                            return (
                                <Link 
                                    href={`/service/${service.slug}`}
                                    key={service.id} 
                                    className='hover:text-blue-600'
                                >
                                    {service.title}
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
            <div className='col-span-8 grid grid-cols-2 gap-4'>
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

export default page