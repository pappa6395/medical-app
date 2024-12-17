"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import BioDataForm from './BioDataForm'
import ProfileInfoForm from './ProfileInfoForm'
import ContactInfoForm from './ContactInfoForm'
import EducationInfoForm from './EducationInfoForm'
import PracticeInfoForm from './PracticeInfoForm'
import AdditionalInfoForm from './AdditionalInfoForm'
import { useOnBoardingContext } from '@/context/context'
import { Speciality } from '@prisma/client'


const OnboardingSteps = ({id, specialties}: {id: string; specialties: Speciality[]}) => {

  console.log("Onboarding Steps ID:", id);
  
  const params = useSearchParams()
  const page = params.get("page")?? "bioData"

  const {
    trackingNumber, 
    doctorProfileId,
    resumingDoctorData
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
          formId={doctorProfileId? doctorProfileId : resumingDoctorData.id} 
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
          formId={doctorProfileId? doctorProfileId : resumingDoctorData.id}
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
          formId={doctorProfileId? doctorProfileId : resumingDoctorData.id} 
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
          specialties={specialties} 
          formId={doctorProfileId? doctorProfileId : resumingDoctorData.id}
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
          formId={doctorProfileId? doctorProfileId : resumingDoctorData.id}
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
          nextPage="final"
          formId={doctorProfileId? doctorProfileId : resumingDoctorData.id}
        />
    },
    // {
    //   title: "Availability",
    //   page: "availability",
    //   component: 
    //     <AvailabilityInfoForm 
    //       title="Availability Information"
    //       description="Please fill in your Availability information"
    //       page={page}
    //       userId={id}
    //       formId={doctorProfileId}
    //     />
    // },
  ]

  const currentStep = steps.find((step) => step.page === page);

  return (

    <div className='grid grid-cols-12 mx-auto overflow-hidden rounded-lg
    shadow-inner border border-slate-200 min-h-screen bg-slate-200 dark:bg-slate-800'>
        <div className="col-span-full sm:col-span-3 bg-teal-600 dark:bg-teal-800 uppercase divde-y-2 divide-gray-300">
          {steps.map((step,i) => {
            return (
              <Link
                key={i}
                href={`/onboarding/${id}?page=${step.page}`} 
                className={cn(
                  "block py-3 px-4 bg-teal-600 dark:bg-teal-800 text-slate-100 dark:text-slate-200 text-base shadow-inner border-b border-gray-400 dark:border-gray-200", 
                  step.page === page ? "bg-teal-800 text-slate-100" : "")}
              >{step.title}
              </Link>
              )
            })}
        </div>
        <div className="col-span-full sm:col-span-9 p-4">
          {trackingNumber || resumingDoctorData.trackingNumber && (
            <p className='text-sm text-teal-600'>
            Your tracking number: 
            <span className='font-bold'>
              {trackingNumber ? trackingNumber : resumingDoctorData.trackingNumber}
            </span> 
            <span className='text-xs'>Use this to resume application or
            check status of application</span>
            </p>
          )}
          {currentStep?.component}
        </div>
    </div>

  )
}

export default OnboardingSteps