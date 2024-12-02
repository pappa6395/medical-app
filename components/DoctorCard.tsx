import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import doctorProfile1 from '../public/doctorProfile1.jpeg'
import { Stethoscope, Video } from 'lucide-react'

interface DoctorProps {
    name: string;
  }

const DoctorCard = ({doctor, isInPerson = false }: {doctor: DoctorProps, isInPerson?: boolean}) => {
 

    const timeStamps = [
        {
            time: "8:30",
            period: "am"
        },
        {
            time: "9:30",
            period: "am"
        },
        {
            time: "10:30",
            period: "am"
        },
        {
            time: "11:30",
            period: "am"
        },
        {
            time: "1:30",
            period: "pm"
        },
        {
            time: "2:30",
            period: "pm"
        },
        {
            time: "3:30",
            period: "pm"
        },
    ]

  return (

    <div>
        {isInPerson ? (
             <div 
             className='border dark:border-gray-600
             bg-slate-50 dark:bg-slate-900 inline-flex flex-col py-7 px-6 rounded-md 
             hover:border-gray-400 shadow-md'>
             <Link href="/doctors/slug">
                 <h2 className='uppercase font-bold text-2xl py-2 tracking-widest'>{doctor.name}</h2>
                 <p className=''>
                     3250 Lincoln Highway, Kendall Park, NJ 08824
                </p> 
                 <div className='flex items-center justify-evenly gap-4 py-4'>
                     <div className="relative">
                         <Image 
                             src={doctorProfile1} 
                             alt="doctor" 
                             width={200} 
                             height={250} 
                             className='w-24 h-24 rounded-full 
                             object-scale-down bg-gray-200'/>
                        {!isInPerson &&  <p className='absolute 
                             bottom-0 right-2 bg-blue-200 text-blue-700 
                             w-9 h-9 flex items-center justify-center 
                             rounded-full'>
                             <Video className='w-5 h-5' />
                         </p>}
                     </div>
                     <div className='flex flex-col gap-2'>
                         <p className='flex items-center'>
                             <Stethoscope className='w-4 h-4 mr-2 flex-shrink-0' />
                             <span>Family Medicine</span>
                         </p>
                         <p className="text-sm text-center bg-green-200 dark:bg-green-800 py-3 px-1 uppercase">
                             Available today
                         </p>
                     </div>
                 </div>
             </Link>
             <div className="pt-6 pb-2 border-t border-gray-400">
                 <h3 className='flex gap-4 justify-between items-center'>
                     <span className='text-gray-600 dark:text-slate-400'>Tue, Mar 12</span>
                     <span className='font-bold'>$137</span>
                 </h3>
                 <div className="py-3 grid grid-cols-3 gap-2">
                     {timeStamps.slice(0,5).map((item,i) => {
                         return (
                             <Link href="#" key={i} 
                             className='bg-blue-600 text-white text-sm text-center p-2'>
                                 {item.time}{item.period}
                             </Link>
                         )
                     })}
                     <Link 
                         href="/doctors/slug" 
                         className='bg-blue-900 text-center
                          text-white p-2 text-sm'>
                             <span>More time</span>
                     </Link>
                 </div>
             </div>
         </div>
        ) : (
            <div 
            className='border dark:border-gray-500
            bg-slate-50 dark:bg-slate-800 inline-flex flex-col py-7 px-6 rounded-md 
            hover:border-gray-400 shadow-md'>
            <Link href="/doctors/slug">
                <h2 className='uppercase font-bold text-2xl 
                py-2 tracking-widest'
                >{doctor.name}
                </h2>
                    <p className='text-transparent -mt-5'>
                        3250 Lincoln Highway, Kendall Park, NJ 08824
                    </p>
                <div className='flex items-center justify-evenly gap-4 py-4'>
                    <div className="relative">
                        <Image 
                            src={doctorProfile1} 
                            alt="doctor" 
                            width={200} 
                            height={250} 
                            className='w-24 h-24 rounded-full 
                            object-scale-down bg-gray-200'/>
                       {!isInPerson &&  <p className='absolute 
                            bottom-0 right-2 bg-blue-200 text-blue-700 
                            w-9 h-9 flex items-center justify-center 
                            rounded-full'>
                            <Video className='w-5 h-5' />
                        </p>}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='flex items-center'>
                            <Stethoscope className='w-4 h-4 mr-2 flex-shrink-0' />
                            <span>Family Medicine</span>
                        </p>
                        <p className="text-sm text-center bg-green-200 dark:bg-green-800 py-3 px-1 uppercase">
                            Available today
                        </p>
                    </div>
                </div>
            </Link>
            <div className="pt-6 pb-2 border-t border-gray-400">
                <h3 className='flex gap-4 justify-between items-center'>
                    <span className='text-gray-600 dark:text-slate-400'>Tue, Mar 12</span>
                    <span className='font-bold'>$137</span>
                </h3>
                <div className="py-3 grid grid-cols-3 gap-2">
                    {timeStamps.slice(0,5).map((item,i) => {
                        return (
                            <Link href="#" key={i} 
                            className='bg-blue-600 text-white text-sm text-center p-2'>
                                {item.time}{item.period}
                            </Link>
                        )
                    })}
                    <Link 
                        href="/doctors/slug" 
                        className='bg-blue-900 text-center
                         text-white p-2 text-sm'>
                            <span>More time</span>
                    </Link>
                </div>
            </div>
        </div>
        )}
        
    </div>

  )
}

export default DoctorCard