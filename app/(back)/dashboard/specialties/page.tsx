import React from 'react'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader'
import { Landmark, LayoutGrid } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getSpecialty } from '@/actions/specialties'
import SpecialtyManyCards from '@/components/Dashboard/SpecialtyManyCards'

const page = async() => {

  const specialties = (await getSpecialty()).data || []

  return (

    <div>
      {/* Header */}
    
      {/* 2 Panels */}
      <div className="grid grid-cols-12 dark:bg-slate-950">
        {/* List Panel */}
        <div className="lg:col-span-5 col-span-full px-3 py-3 border-r border-gray-100">
          <div className='flex items-center justify-between gap-4'>
            <PanelHeader title={"Specialties"} count={(specialties.length).toString().padStart(2,"0")} icon={Landmark}/>
            <span className='lg:hidden'>
              <NewButton title="New Specialty" href="/dashboard/specialties/new"/>
            </span>
          </div>
        <div className='px-3'>
        <ScrollArea className="h-96 space-x-4">
            {specialties.map((specialty, i) => (
              <div key={i} className="mt-2 mr-4">
                <SpecialtyManyCards specialties={specialty} />
              </div>
            ))}
        </ScrollArea>
        </div>
        </div>
        <div className="lg:col-span-7 px-3 col-span-full hidden lg:block">
          <div className='flex items-center justify-end py-2 px-2 border-b border-gray-200'>
              <div className='flex items-center gap-4'>
                  <NewButton title="New Specialty" href="/dashboard/specialties/new"/>
              </div>
          </div>
          {/* Display Panel */}
          <div className='flex items-center justify-center h-1/2 px-4'>
              <div className='text-center border-gray-100 dark:bg-slate-700
              shadow-md rounded-md py-4 px-6 flex flex-col items-center gap-1'>
                  <LayoutGrid />
                  <div className='py-3'>
                    {" "}
                      <p>You have {(specialties.length).toString().padStart(2,"0")} services today.</p>
                  </div>
                  <NewButton  title="New Specialty" href={"/dashboard/specialties/new"}/>
              </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default page