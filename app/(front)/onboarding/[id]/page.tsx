
import OnboardingSteps from '@/components/Onboarding/OnboardingSteps'
import React from 'react'



const page = async({params}: any) => {

    const { id } = await params
    console.log("ID:", id);
    
  return (

    <div className='bg-teal-600 dark:bg-slate-800'>
        <div className='max-w-5xl mx-auto py-8 min-h-screen'>
            <OnboardingSteps id={id} />
        </div>
    </div>
    

  )
}

export default page