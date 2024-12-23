import React from 'react'
import SectionHeading from './ui/SectionHeading'
import ToggleButton from './ToggleButton'
import Link from 'next/link'
import { ArrowUpRight, Map } from 'lucide-react'
import DoctorListCarousel from './DoctorListCarousel'
import { Button } from './ui/button'
import { Doctor } from '@/utils/types'


const DoctorList = ({ 
    title="", 
    isInPerson,
    doctors, 
    className = "bg-slate-100 py-8 lg:py-24" 
}: {
    title?: string; 
    isInPerson?: boolean;
    doctors: Doctor[]; 
    className?:string;
}) => {
    
    // const doctors: {name: string}[] = [
    //     {
    //         name: "John"
    //     },
    //     {
    //         name: "David"
    //     },
    //     {
    //         name: "Sandy"
    //     },
    //     {
    //         name: "Gilgamesh"
    //     },
    //     {
    //         name: "Spongbob"
    //     },
    //     {
    //         name: "Harry"
    //     },
    // ]

  return (

    <div className={className}>
        <div className='max-w-6xl py-20 mx-auto px-8'>
            <SectionHeading title={title}/>
            <div className='py-8 flex items-center justify-between'>
                {isInPerson ? (
                    <Link href="#" className='text-blue-500 font-semibold text-sm flex items-center'>
                        <Map className='mr-2 flex-shrink-0 w-4 h-4'/>
                        <span>Map View</span>
                    </Link>
                ) : (
                    <ToggleButton />
                )}
               <Button asChild>
                    <Link href={`/category?mode=${title}`}>
                        See All
                        <ArrowUpRight className='h-4 w-4 ms-2' />
                    </Link>
               </Button>
            </div>
            <div className='py-6 flex items-center justify-center'>
                <DoctorListCarousel doctors={doctors} isInPerson={isInPerson} />
            </div>
        </div>
    </div>

  )
}

export default DoctorList