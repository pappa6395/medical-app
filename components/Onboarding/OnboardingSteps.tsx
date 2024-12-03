"use client"

import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import BioDataForm from './BioDataForm'
import ContactInfo from './ContactInfo'
import ProfessionInfo from './ProfessionInfo'


const OnboardingSteps = ({id}: {id: string}) => {

  const params = useSearchParams()
  const page = params.get("page")

  const steps = [
    {
      title: "Bio Data",
      page: "bioData",
      component: <BioDataForm />
    },
    {
      title: "Contact Information",
      page: "contact",
      component: <ContactInfo />
    },
    {
      title: "Profession Information",
      page: "profession",
      component: <ProfessionInfo />
    },
    {
      title: "Education Information",
      page: "education",
      component: <></>
    },
    {
      title: "Practice Information",
      page: "practice",
      component: <></>
    },
    {
      title: "Additional Information",
      page: "additional",
      component: <></>
    },
    {
      title: "Availability",
      page: "availability",
      component: <></>
    },
  ]

  const currentStep = steps.find((step) => step.page === page);

  return (

    <div className='grid grid-cols-12 mx-auto overflow-hidden rounded-lg
    shadow-inner border border-slate-200 min-h-screen bg-slate-200'>
        <div className="col-span-full sm:col-span-3 uppercase divde-y-2 divide-gray-300">
          {steps.map((step,i) => {
            return (
              <Link
                key={i}
                href={`/onboarding/${id}?page=${step.page}`} 
                className={cn("block py-3 px-4 bg-teal-600 text-slate-100 text-base shadow-inner", 
                  step.page === page ? "bg-teal-800 text-slate-100" : "")}
              >{step.title}
              </Link>
              )
            })}
        </div>
        <div className="col-span-full sm:col-span-9 p-4">
          {currentStep?.component}
        </div>
    </div>

  )
}

export default OnboardingSteps