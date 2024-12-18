import React from 'react'
import Image from 'next/image'
import doctorProfile1 from '../../../../public/doctorProfile1.jpeg'
import DoctorDetails from '@/components/DoctorDetails'
import FixedBookButton from '@/components/FixedBookButton'
import { getDoctorsBySlug } from '@/actions/users'
import { PageProps } from '@/.next/types/app/(front)/doctors/[slug]/page'

const page = async ({params: paramsPromise}: PageProps) => {

    const { slug } = await paramsPromise

    // Fetch doctor data from API or database
    const doctorSlug = await getDoctorsBySlug(slug) || null;

  return (
    <div>
        {doctorSlug && doctorSlug?.id ? (
            <div className='bg-slate-50 dark:bg-slate-950 py-8 min-h-screen'>
            <div className="bg-white dark:bg-slate-900 border 
                border-gray-200 dark:border-gray-500 
                    min-w-screen mx-4 md:mx-24 shadow-md rounded-lg
                    ">
                <div className='py-24 px-8'>
                    <div className='flex items-center justify-between'>
                        <div className=''>
                            <div className='flex flex-col'>
                                <h2 className='uppercase font-bold 
                                text-2xl tracking-widest'>
                                    {doctorSlug.name}
                                </h2>
                                <p className='text-gray-500 text-xs uppercase'>
                                    {doctorSlug.doctorProfile?.primarySpecialization}
                                </p>
                            </div>
                            <div className='py-6'>
                                <p>{doctorSlug.doctorProfile?.operationMode}</p>
                                <p>{doctorSlug.doctorProfile?.hospitalAddress}</p>
                            </div>
                        </div>
                        <Image 
                            src={doctorSlug.doctorProfile?.profilePicture?? doctorProfile1} 
                            alt="doctor" 
                            width={200} 
                            height={250} 
                            className='w-24 h-24 rounded-full 
                            object-scale-down bg-gray-200'/>
                    </div>
                </div>
                <div>
                    <DoctorDetails doctor={doctorSlug} />
                </div>
            </div>
            <FixedBookButton price={doctorSlug.doctorProfile?.hourlyWage}/>
        </div>
        ) : (
            <div className='flex flex-col items-center justify-center h-screen'>
                <p className='text-gray-500 text-2xl'>Doctor Detail not found</p>
            </div>
        )}
    </div>
  )
}

export default page