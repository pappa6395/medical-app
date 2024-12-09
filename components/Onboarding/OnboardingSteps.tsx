"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import BioDataForm from './BioDataForm'
import ProfileInfoForm from './ProfileInfoForm'
import ContactInfoForm from './ContactInfoForm'
import ProfessionInfoForm from './EducationInfoForm'
import EducationInfoForm from './EducationInfoForm'
import PracticeInfoForm from './PracticeInfoForm'
import AdditionalInfoForm from './AdditionalInfoForm'
import AvailabilityInfoForm from './AvailabilityForm'
import { useOnBoardingContext } from '@/context/context'


const OnboardingSteps = ({id}: {id: string}) => {

  const params = useSearchParams()
  const page = params.get("page")?? "bioData"
  const {
    trackingNumber, 
    doctorProfileId,
} = useOnBoardingContext()

  const steps = [
    {
      title: "Bio Data",
      page: "bioData",
      component: 
        <BioDataForm 
          title="Bio Data" 
          description="Please fill in your bio data information" 
          page={page}
          userId={id}
          nextPage={"profile"}
          formId={doctorProfileId} 
        />
    },
    {
      title: "Profile Information",
      page: "profile",
      component: 
        <ProfileInfoForm 
          title="Profile Information" 
          description="Please fill in your profile information" 
          page={page}
          userId={id}
          nextPage={"contact"}
          formId={doctorProfileId}
        />
    },
    {
      title: "Contact Information",
      page: "contact",
      component: 
        <ContactInfoForm 
          title="Contact Information" 
          description="Please fill in your contact information" 
          page={page}
          userId={id}
          nextPage={"education"}
          formId={doctorProfileId} 
        />
    },
    {
      title: "Education Information",
      page: "education",
      component: 
        <EducationInfoForm 
          title="Education Information"
          description="Please fill in your education information"
          page={page}
          userId={id}
          nextPage={"practice"} 
          formId={doctorProfileId}
        />
    },
    {
      title: "Practice Information",
      page: "practice",
      component: 
        <PracticeInfoForm 
          title="Practice Information"
          description="Please fill in your practice information"
          page={page}
          userId={id}
          nextPage={"additional"}
          formId={doctorProfileId}
        />
    },
    {
      title: "Additional Information",
      page: "additional",
      component: 
        <AdditionalInfoForm 
          title="Additional Information"
          description="Please fill in your Additional information"
          page={page}
          userId={id}
          nextPage={"availability"}
          formId={doctorProfileId}
        />
    },
    {
      title: "Availability",
      page: "availability",
      component: 
        <AvailabilityInfoForm 
          title="Availability Information"
          description="Please fill in your Availability information"
          page={page}
          userId={id}
          formId={doctorProfileId}
        />
    },
  ]

  const currentStep = steps.find((step) => step.page === page);

  return (

    <div className='grid grid-cols-12 mx-auto overflow-hidden rounded-lg
    shadow-inner border border-slate-200 min-h-screen bg-slate-200 dark:bg-slate-800'>
        <div className="col-span-full sm:col-span-3 uppercase divde-y-2 divide-gray-300">
          {steps.map((step,i) => {
            return (
              <Link
                key={i}
                href={`/onboarding/${id}?page=${step.page}`} 
                className={cn("block py-3 px-4 bg-teal-600 dark:bg-teal-800 text-slate-100 dark:text-slate-200 text-base shadow-inner", 
                  step.page === page ? "bg-teal-800 text-slate-100" : "")}
              >{step.title}
              </Link>
              )
            })}
        </div>
        <div className="col-span-full sm:col-span-9 p-4">
          {trackingNumber && (
            <p className='text-sm text-teal-600'>
            Your tracking number: 
            <span className='font-bold'>{trackingNumber}</span> 
            <span className='text-xs'>(Use this to resume application or
            check status of application)</span>
            </p>
          )}
          {currentStep?.component}
        </div>
    </div>

  )
}

export default OnboardingSteps