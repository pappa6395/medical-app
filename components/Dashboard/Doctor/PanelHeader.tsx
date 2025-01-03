
import { LucideIcon } from 'lucide-react'
import React from 'react'




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

    <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200'>
        <div className='flex items-center gap-2'>
            <Icon className='w-4 h-4 flex-shrink-0'/>
            <span className='scroll-m-20 text-xl font-bold tracking-tight'>{title}</span>
            <span className='bg-white dark:text-slate-600 w-6 h-6 rounded-full 
              flex items-center justify-center shadow-sm border text-xs'
              >
                {count.toString().padStart(2, "0")}
              </span>
        </div>
        
    </div>

  )
}

export default PanelHeader