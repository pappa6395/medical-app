
import { createAvailability, updateAvailabilityById } from '@/actions/onboarding'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Loader, Plus, X } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'

const Monday = ({profile}: {profile: any}) => {

    const availability = profile?.availability || ""
    const timesArray = [
        "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
    ]

    const [selectedTimes, setSelectedTimes] = React.useState<string[]>([])
    const [isLoading, setIsLoading] = React.useState(false)

    console.log(selectedTimes);
    
    const handleAddTime = (time: string) => {

        if(!selectedTimes.includes(time)) {
            setIsLoading(true),
            setSelectedTimes((prev)=>([...prev, time])),
            setIsLoading(false) 
        } else {
            toast.error("Selected time is already added!")
        }        
        
    }
    const handleAddAll = () => {
        setIsLoading(true),
        setSelectedTimes([...timesArray]),
        setIsLoading(false)
    }
    const handleRemoveTime = (index: number) => {   
        setSelectedTimes(selectedTimes.filter((_,i) => i !== index))
    }
    const handleClearAll = () => {
        setIsLoading(true),
        setSelectedTimes([]),
        setIsLoading(false) 
    }
    const handleSubmit = async() => {

        setIsLoading(true)

        try {
            if (profile?.id && availability?.id) {

                const data = {
                    monday: selectedTimes,
                    doctorProfileId: profile.id,
                };
                await updateAvailabilityById(availability?.id, data)
                toast.success("Availability updated")
                console.log(data);

            } else if (profile?.id) {

                console.log("Availablity not found");
                const data = {
                    monday: selectedTimes,
                    doctorProfileId: profile.id,
                };
                await createAvailability(data)
                toast.success("Availability created")
                console.log(data);  

            }
            

        } catch (error) {
            toast.error("Profile not found")
            console.log("Error creating availability:", error);
            
        } finally {
            setIsLoading(false)
        }

    }

  return (

    <div className='p-2 grid grid-cols-1 sm:grid-cols-2  
    border-gray-200 dark:border-gray-600 shadow rounded-md'
    >
       <div className='p-4'>
         <h2 className=''
         >Select the time your available for this day
         </h2>
         <div className='py-5 grid grid-cols-3 gap-3'>
            <button 
                onClick={handleAddAll} 
                className='bg-sky-50 flex flex-wrap 
            py-2 px-2 items-center justify-center border 
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
                    py-2 px-2 items-center justify-center border 
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
       <div className='p-4'>
         <h2>Here is your selected time</h2>
         <div className='py-5 grid grid-cols-3 gap-3'>
            {selectedTimes.map((time, i) => {
                return (
                    <button 
                        key={i}
                        onClick={() => handleRemoveTime(i)}  
                        className='bg-sky-200 flex flex-wrap 
                        py-2 px-2 items-center justify-center border 
                        border-gray-100 rounded-md hover:bg-sky-600 
                        text-slate-600 text-sm md:text-base shadow-sm'
                    >
                        <span>{time}</span>
                        <X className='w-3 h-3 ml-2' />
                    </button>
                )
            })}
         </div>
           {selectedTimes.length > 0 && (
             <div className='border-t border-gray-200 flex items-center justify-between pt-4'>
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

export default Monday