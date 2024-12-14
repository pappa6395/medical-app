import { Calendar } from 'lucide-react'
import React from 'react'
import NewButton from './NewButton'

const HomeDisplayCard = ({}) => {

  return (

    <div className='flex items-center justify-center h-1/2 px-4'>
        <div className='text-center border-gray-100 dark:bg-slate-700
        shadow-md rounded-md py-4 px-6 flex flex-col items-center gap-1'>
            <Calendar />
            <div className='py-3'>
                <p>You have 11 appointments today.</p>
                <p>11 New Patients, 3 Follow Ups, 4 Annual Physicals</p>
            </div>
            <NewButton  title="New Appointment" href="#"/>
        </div>
    </div>

  )
}

export default HomeDisplayCard