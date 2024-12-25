import { Button } from '@/components/ui/button'
import { AlignHorizontalDistributeCenter, Calendar, LucideIcon, Plus } from 'lucide-react'
import React from 'react'
import NewButton from './NewButton'



const PanelHeader = ({
  title, 
  count,
  icon,
}: {
  title: string, 
  count: number, 
  icon: LucideIcon
}) => {

  const Icon = icon

  return (

    <div className='flex items-center justify-between px-6 border-b border-gray-200'>
        <div className='flex items-center gap-2'>
            <Icon className='w-4 h-4 flex-shrink-0'/>
            <span>{title}</span>
            <span className='bg-white dark:text-slate-600 w-6 h-6 rounded-full 
            flex items-center justify-center shadow-sm border text-xs'
            >{count.toString().padStart(2, "0")}
            </span>
        </div>
        
    </div>

  )
}

export default PanelHeader