import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Plus, X } from 'lucide-react'
import React from 'react'

interface SelectedTimesProps {
    handleAddAll: () => void;
    handleRemoveTime: (index: number) => void;
    handleAddTime: (time: string) => void;
    selectedTimes: string[];
    timesArray: string[];
    handleClearAll: () => void;
    isLoading: boolean;
    handleSubmit: () => void;
    day: string;
}

const SelectedTimes = ({
    handleAddAll,
    handleRemoveTime,
    handleAddTime,
    selectedTimes,
    timesArray,
    handleClearAll,
    isLoading,
    handleSubmit,
    day,
}: SelectedTimesProps) => {

  return (

    <div className='p-2 grid grid-cols-1 sm:grid-cols-2 shadow rounded-md'
    >
       <div className='py-2'>
         <h2 className=''
         >Select the time your available for {day}
         </h2>
         <div className='py-5 px-3 grid grid-cols-2 md:grid-cols-3 gap-3
         border-r border-slate-200 dark:border-slate-600'>
            <button 
                onClick={handleAddAll} 
                className='bg-sky-50 flex flex-wrap 
            py-2 items-center justify-center border 
            border-blue-300 rounded-md focus:bg-sky-300 
            text-slate-600 text-sm md:text-base shadow-sm'
            >
                <span>Add All</span>
                <Plus className='w-3 h-3 ml-2' />
            </button>
            {timesArray.map((time, i) => {
                return (
                    <button 
                        key={i}
                        value={time}
                        onClick={() => handleAddTime(time)} 
                        className='bg-sky-50 flex flex-wrap 
                    py-2 items-center justify-center border 
                    border-gray-100 rounded-md hover:bg-sky-300 
                    text-slate-600 text-sm md:text-base shadow-sm'
                    >
                        <span>{time}</span>
                        <Plus className='w-3 h-3 ml-2' />
                    </button>
                )
            })}
         </div>
       </div>
       <div className='px-2 py-2'>
         <h2>Here is your Availability time for {day}</h2>
         <div className='py-5 px-3 grid grid-cols-2 md:grid-cols-3 gap-3'>
            {selectedTimes.map((time, i) => {
                return (
                    <button 
                        key={i}
                        onClick={() => handleRemoveTime(i)} 
                        className='bg-sky-200 flex flex-wrap 
                        py-2 px-2 items-center justify-center border 
                        border-gray-100 rounded-md hover:bg-sky-600 
                        hover:text-slate-200 text-slate-600 
                        text-sm md:text-base shadow-sm'
                    >
                        <span>{time}</span>
                        <X className='w-3 h-3 ml-2' />
                    </button>
                )
            })}
         </div>
           {selectedTimes.length > 0 && (
             <div className='border-t border-gray-200 flex items-center justify-between pt-4 px-2'>
            {isLoading ? (
                <Button disabled type="submit" className=''>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Saving...
                </Button>
            ) : (
                <Button variant="default" type="submit" onClick={handleSubmit} className=''>
                Save Settings
                </Button>
                )
            }  
             <button 
             onClick={handleClearAll} 
             className='bg-rose-50 flex flex-wrap
            py-2 px-2 items-center justify-center border 
            border-rose-300 rounded-md focus:bg-rose-300 
            text-slate-600 text-sm md:text-sm shadow-sm'
            >
                <span>Clear All</span>
                <X className='w-3 h-3 ml-2' />
            </button>
            </div>
           )}
       </div>
    </div>

  )
}

export default SelectedTimes