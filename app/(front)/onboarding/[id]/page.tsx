
import { PageProps } from '@/.next/types/app/(front)/onboarding/[id]/page';
import OnboardingSteps from '@/components/Onboarding/OnboardingSteps'
import React from 'react'



const page = async({params: paramsPromise}: PageProps) => {

    const { id } = await paramsPromise
    console.log("Onboarding ID:", id);

    // Get existing doctor profile
    
  return (

    <div className='bg-teal-700 dark:bg-slate-800'>
        <div className='max-w-5xl mx-auto py-8 min-h-screen'>
            <OnboardingSteps id={id} />
        </div>
    </div>
    

  )
}

export default page