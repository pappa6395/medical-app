import { Button } from '@/components/ui/button'
import { AlignHorizontalDistributeCenter, Calendar, Plus } from 'lucide-react'
import React from 'react'
import NewButton from './NewButton'

const PanelHeader = () => {

  return (

    <div className='flex items-center justify-between py-3 px-6 border-b border-gray-200'>
        <div className='flex items-center gap-1'>
            <Calendar className='w-4 h-4 flex-shrink-0'/>
            <span>Appointments</span>
            <span className='bg-white w-6 h-6 rounded-full 
            flex items-center justify-center shadow-sm border text-xs'
            >11
            </span>
        </div>
        
    </div>

  )
}

export default PanelHeader