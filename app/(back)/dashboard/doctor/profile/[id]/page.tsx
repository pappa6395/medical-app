
import { PageProps } from '@/.next/types/app/api/auth/[...nextauth]/route';
import { getDoctorProfileByUserId } from '@/actions/onboarding';
import { getSpecialty } from '@/actions/specialties';
import OnboardingSteps from '@/components/Onboarding/OnboardingSteps'
import React from 'react'


const page = async({params: paramsPromise}: PageProps) => {

    const { id } = await paramsPromise

    const specialties = (await getSpecialty()).data || [];
    const doctorProfile = (await getDoctorProfileByUserId(id))?.data || null;


  return (

    <div className='bg-teal-700 dark:bg-slate-800'>
        <div className='max-w-5xl mx-auto py-8 min-h-screen'>
            <OnboardingSteps 
              id={id ?? ""} 
              specialties={specialties ?? []} 
              doctorProfile={doctorProfile ?? null} />
        </div>
    </div>
    
  )
}

export default page