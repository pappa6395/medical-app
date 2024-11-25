import React from 'react'
import Image from 'next/image'
import doctorProfile1 from '../../../../public/doctorProfile1.jpeg'
import DoctorDetails from '@/components/DoctorDetails'
import FixedBookButton from '@/components/FixedBookButton'

const page = () => {


  return (
    <div>
        <div className='bg-slate-50 min-h-screen'>
            <div className="bg-white border border-gray-200 
                max-w-screen mx-24 shadow-md rounded-lg">
                <div className='py-24 px-8'>
                    <div className='flex items-center justify-between'>
                        <div className=''>
                            <div className='flex flex-col'>
                                <h2 className='uppercase font-bold 
                                text-2xl tracking-widest'>
                                    Vijal Patel, PA-C
                                </h2>
                                <p className='text-gray-500 text-xs uppercase'>Adult Health</p>
                            </div>
                            <div className='py-6'>
                                <p>In-person doctor visit</p>
                                <p>3250 Lincolm Highway, Kendall Park, NJ 08824</p>
                            </div>
                        </div>
                        <Image 
                            src={doctorProfile1} 
                            alt="doctor" 
                            width={200} 
                            height={250} 
                            className='w-24 h-24 rounded-full 
                            object-scale-down bg-gray-200'/>
                    </div>
                </div>
                <div>
                    <DoctorDetails />
                </div>
            </div>
            <FixedBookButton />
        </div>
    </div>
    
    

  )
}

export default page