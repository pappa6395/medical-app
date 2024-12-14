"use client"
import React, { useState } from 'react'
import { HiUserCircle } from 'react-icons/hi'
import ServiceList from './Services/ServiceList'
import LinkCard from './Doctors/LinkCard'
import medicalImage from '../../public/medicalimage1.jpg'
import { BriefcaseMedical, Microscope, Stethoscope, Syringe } from 'lucide-react'


const TabbedItems = () => {
    const services = [
        {
            title: "Telehealth",
            image: medicalImage,
            slug: "telehealth",

        },
        {
            title: "Video Prescription",
            image: medicalImage,
            slug: "video prescription",

        },
        {
            title: "UTI Consult",
            image: medicalImage,
            slug: "uti consult",

        },
        {
            title: "Mental Health",
            image: medicalImage,
            slug: "mental health",

        },
        {
            title: "ED Consult",
            image: medicalImage,
            slug: "ed consult",

        },
        {
            title: "Urgent Care",
            image: medicalImage,
            slug: "urgent care",

        },
    ]
    const tabs = [
        {
            title: "Popular Services",
            icon: <Syringe/>,
            component: <ServiceList data={services}/>,
            content: []
        },
        {
            title: "Doctors",
            icon: <Stethoscope/>,
            component: <LinkCard className='bg-slate-800'/>,
            content: ["Match and meet our doctors today. We are ready to cure you"]
        },
        {
            title: "Specialties",
            icon: <BriefcaseMedical/>,
            component: <LinkCard className='bg-blue-900'/>,
            content: ["Specialists are ready for you to help you find the solutions"]
        },
        {
            title: "Symptoms",
            icon: <Microscope/>,
            component: <LinkCard className='bg-green-600'/>,
            content: ["Medical tips and knowledges are waiting right for you here"]
        },
    ]

    const [activeTab, setActiveTab] = useState(0)

  return (

    <div className='w-full'>
        <div className="text-lg font-medium flex w-full
        text-gray-500 border-b border-gray-200
        dark:text-gray-400 dark:border-gray-700">
            <ul className="flex justify-center flex-col md:flex-row 
            w-full mx-auto bg-slate-50 dark:bg-slate-950">
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