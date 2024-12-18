"use client"
import React, { useState } from 'react'
import Availability from './Availability'
import { DoctorDetail } from '@/utils/types'


const DoctorDetails = ({doctor}: {doctor: DoctorDetail}) => {

    const [isActive, setIsActive] = useState("availability")

  return (

    <div className=''>
        <div className="flex justify-between items-center shadow-sm">
            <button 
                className={isActive === 'details' ? 
                    (
                        'py-4 px-4 w-full bg-blue-600 text-white uppercase tracking-wide border-b-2 border-white'
                    ) : (
                        'py-4 px-4 w-full bg-slate-50 text-slate-800 uppercase tracking-wide border-b-2 border-blue-500'
                    )}
                onClick={() => setIsActive("details")} >
                Service Details
            </button>
            <button 
                className={isActive === 'availability' 
                    ? ('py-4 px-8 w-full bg-blue-600 text-white uppercase tracking-wider border-b-2 border-white') 
                    : ('py-4 px-8 w-full bg-slate-50 text-slate-800 uppercase tracking-wider border-b-2 border-blue-500')}
                onClick={() => setIsActive("availability")}>
                Availability
            </button>
        </div>
        <div className='py-8 px-6 mx-auto'>   
            {isActive === "availability" ? (
                <div>
                    <Availability />
                </div>
            ) : (
                <div>
                    Service Details Component
                </div>
            )}
            
            
        </div>
       
    </div>

  )
}

export default DoctorDetails