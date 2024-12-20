import React from 'react'
import ListPanel from '@/components/Dashboard/Doctor/ListPanel'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader'
import { Calendar, LayoutGrid } from 'lucide-react'
import ServiceForm from '@/components/Dashboard/ServiceForm'
import HomeDisplayCard from '@/components/Dashboard/Doctor/HomeDisplayCard'
import { getService } from '@/actions/services'
import ServiceManyCards from '@/components/Dashboard/ServiceManyCards'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ServiceFormProps } from '@/utils/types'

const page = async() => {

  const services = (await getService()).data || []

  return (

    <div>
      {/* Header */}
    
      {/* 2 Panels */}
      <div className="grid grid-cols-12 dark:bg-slate-950">
        {/* List Panel */}
        <div className="lg:col-span-5 col-span-full px-3 py-3 border-r border-gray-100">
          <div className='flex items-center justify-between gap-4'>
            <PanelHeader title={"Services"} count={+(services.length).toString().padStart(2,"0")} icon={LayoutGrid}/>
            <span className='lg:hidden'>
              <NewButton title="New Service" href="/dashboard/services/new"/>
            </span>
          </div>
        <div className='px-3'>
        <ScrollArea className="h-96 space-x-4">
            {services.map((service, i) => (
              <div key={i} className="mt-2 mr-4">
                <ServiceManyCards service={service}/>
              </div>
            ))}
        </ScrollArea>
        </div>
        </div>
        <div className="lg:col-span-7 px-3 col-span-full hidden lg:block">
          <div className='flex items-center justify-end py-2 px-2 border-b border-gray-200'>
              <div className='flex items-center gap-4'>
                  <NewButton title="New Service" href="/dashboard/services/new"/>
              </div>
          </div>
          {/* Display Panel */}
          <div className='flex items-center justify-center h-1/2 px-4'>
              <div className='text-center border-gray-100 dark:bg-slate-700
              shadow-md rounded-md py-4 px-6 flex flex-col items-center gap-1'>
                  <LayoutGrid />
                  <div className='py-3'>
                    {" "}
                      <p>You have {(services.length).toString().padStart(2,"0")} services today.</p>
                      <p>11 New Patients, 3 Follow Ups, 4 Annual Physicals</p>
                  </div>
                  <NewButton  title="New Service" href={"/dashboard/services/new"}/>
              </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default page