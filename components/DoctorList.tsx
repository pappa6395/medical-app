import React from 'react'
import SectionHeading from './ui/SectionHeading'
import Link from 'next/link'
import { ArrowUpRight, Map } from 'lucide-react'
import DoctorListCarousel from './DoctorListCarousel'
import { Button } from './ui/button'
import { Doctor } from '@/utils/types'
import TagButtons from './TagButtons'


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
    

  return (

    <div className={className}>
        <div className='max-w-6xl py-20 mx-auto px-8'>
            <SectionHeading title={title}/>
            <div className='py-8 flex items-center justify-between'>
                {isInPerson ? (
                    <div className="overflow-hidden rounded-lg lg:col-span-2 h-96 lg:h-auto">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5009935726653!2d100.63610591074121!3d13.748633997310947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d61c115d6da53%3A0xef9f5136d7dfa7ae!2sSamitivej%20Srinakarin%20Hospital!5e0!3m2!1sen!2sth!4v1737174250832!5m2!1sen!2sth" 
                            width={300} 
                            height={100} 
                            style={{ border: 0}} 
                            loading="lazy" />
                    </div>
                ) : (
                    <TagButtons />
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