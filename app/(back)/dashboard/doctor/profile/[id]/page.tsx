

import { PageProps } from '@/.next/types/app/(back)/dashboard/doctor/profile/[id]/page';
import { getDoctorProfileById, getDoctorProfileByUserId } from '@/actions/onboarding';
import { getSpecialty } from '@/actions/specialties';
import OnboardingSteps from '@/components/Onboarding/OnboardingSteps'
import { DoctorProfile } from '@prisma/client';
import React from 'react'



const page = async({params: paramsPromise}: PageProps) => {

    const { id } = await paramsPromise
    console.log("Onboarding ID:", id);


    const specialties = (await getSpecialty()).data || [];
    const doctorProfile = (await getDoctorProfileByUserId(id))?.data as DoctorProfile
    
    //console.log("Doctor Profile:", doctorProfile);


  return (

    <div className='bg-teal-700 dark:bg-slate-800'>
        <div className='max-w-5xl mx-auto py-8 min-h-screen'>
            <OnboardingSteps 
              id={id} 
              specialties={specialties} 
              doctorProfile={doctorProfile} />
        </div>
    </div>
    

  )
}

export default page