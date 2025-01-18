"use client"

import React, { useState } from 'react'
import ServiceList from './Services/ServiceList'
import LinkCard from './Doctors/LinkCard'
import { BriefcaseMedical, Microscope, Stethoscope, Syringe } from 'lucide-react'
import { Service, Speciality, Symptom } from '@prisma/client'
import SymptomCard from './Doctors/SymptomCard'
import { ServiceDoctorProfileCountProps } from '@/utils/types'

type TabbedItemProps = {
    services: ServiceDoctorProfileCountProps[]
    specialties?: Speciality[];
    symptoms?: Symptom[]
}

const TabbedItems = ({ 
    services,
    specialties,
    symptoms,
 }: TabbedItemProps) => {
  
    const tabs = [
        {
            title: "Popular Services",
            icon: <Syringe/>,
            component: <ServiceList data={services}/>,
            content: []
        },
        // {
        //     title: "Doctors",
        //     icon: <Stethoscope/>,
        //     component: <LinkCard className='bg-slate-800' />,
        //     content: ["Match and meet our doctors today. We are ready to cure you"]
        // },
        {
            title: "Specialties",
            icon: <BriefcaseMedical/>,
            component: <LinkCard className='bg-slate-400 dark:bg-emerald-900 text-lg' specialties={specialties}/>,
            content: ["Specialists are ready for you to help you find the solutions"]
        },
        {
            title: "Symptoms",
            icon: <Microscope/>,
            component: <SymptomCard className='bg-slate-400 dark:bg-emerald-900 text-lg' symptoms={symptoms} />,
            content: ["Medical tips and knowledges are waiting right for you here"]
        },
    ]

    const [activeTab, setActiveTab] = useState(0)

  return (

    <div className='w-screen'>
        <div className="text-lg font-medium flex
        text-gray-500 border-b border-gray-200
        dark:text-gray-400 dark:border-gray-700">
            <ul className="flex justify-center flex-col md:flex-row 
            w-screen mx-auto bg-slate-50 dark:bg-green-950">
                {
                    tabs.map((tab,i) => {
                        return (
                            <li key={i} className="me-2">
                                <button 
                                    onClick={() => setActiveTab(i)}
                                    className={`w-full flex flex-row p-4 gap-2 border-b-2 rounded-t-lg
                                        ${activeTab === i 
                                            ? "text-gray-400 border-gray-300" 
                                            : "text-gray-600  border-transparent hover:text-gray-400 hover:border-gray-300"
                                    }`}
                                >
                                    {tab.icon}
                                    {tab.title}
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
        <div className='p-4 min-w-screen'>
            {tabs[activeTab].component}
         </div>
    </div>

  )
}

export default TabbedItems