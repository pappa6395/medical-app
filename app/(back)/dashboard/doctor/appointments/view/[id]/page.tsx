import HomeDisplayCard from '@/components/Dashboard/Doctor/HomeDisplayCard'
import ListPanel from '@/components/Dashboard/Doctor/ListPanel'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader'
import { Calendar } from 'lucide-react'
import React from 'react'

const page = () => {

  return (

    <div>
      {/* Header */}
      {/* 2 Panels */}
      <div className="grid grid-cols-12 dark:bg-slate-950">
        {/* List Panel */}
        <div className="col-span-5 px-3 py-3 border-r border-gray-100">
          <PanelHeader title={"Appointments"} count={"21"} icon={Calendar} />
          <div className='px-3'><ListPanel /></div>
        </div>
        <div className="col-span-7">
        <div className='flex items-center justify-end py-2 px-4 border-b border-gray-200'>
            <div className='flex items-center gap-4'>
                <NewButton title="New Appointment" href="#"/>
            </div>
        </div>
        
          {/* Display Panel */}
          <div className=''>
            <h2>Detail Page</h2>
          </div>
        </div>
      </div>
    </div>

  )
}

export default page