

import { PageProps } from '@/.next/types/app/(front)/category/page'
import { getService } from '@/actions/services'
import { getDoctors } from '@/actions/users'
import CategoryPanel from '@/components/CategoryPanel'
import DoctorCard from '@/components/DoctorCard'
import { Menu } from 'lucide-react'
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

    <div className='p-8'>
        <CategoryPanel mode={mode} doctors={doctors} services={services}/>
    </div>

  )
}

export default page