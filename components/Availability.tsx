"use client"
import React from 'react'
import { Calendar } from "@/components/ui/calendar"
import { formattedDate } from '@/utils/formattedDate'
import Link from 'next/link'

const Availability = () => {

    const [bookDate, setBookDate] = React.useState<Date | undefined>(new Date())

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

    <div className='mb-52'>
        <h2 className='font-bold text-xl uppercase text-slate-500 
        py-4 tracking-wider'>
            Select a Date and Time
        </h2>
        <div className="grid grid-cols-4 gap-8 lg:gap-0 space-x-4">
            <div className="sm:col-span-2 mx-auto">
                <Calendar
                    mode="single"
                    selected={bookDate}
                    onSelect={setBookDate}
                    className="rounded-md border scale-105 mt-4"
                />
            </div>
            <div className='sm:col-span-2 mx-auto mt-3'>
                <div className='px-4'>
                    <h2 className='pb-4 font-semibold text-blue-700 py-3 px-4
                    border border-blue-500 text-center'>
                        {formattedDate(bookDate)}
                    </h2>
                    <div className="py-3 grid grid-cols-2 md:grid-cols-3 gap-2">
                    {timeStamps.slice(0,5).map((item,i) => {
                        return (
                            <button key={i} 
                            className='bg-blue-600 text-white text-center text-sm md:text-base p-2'>
                                {item.time}{item.period}
                            </button>
                        )
                    })}
                    <Link 
                        href="/doctors/slug" 
                        className='bg-blue-900 text-center
                         text-white p-2 truncate'>
                            More time
                    </Link>
                </div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Availability