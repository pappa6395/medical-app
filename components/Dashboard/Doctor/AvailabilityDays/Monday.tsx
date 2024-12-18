
import { createAvailability, updateAvailabilityById } from '@/actions/onboarding'
import React from 'react'
import toast from 'react-hot-toast'
import SelectedTimes from './SelectedTimes'
import { timesArray } from '@/config/constants'


const Monday = ({profile, day}: {profile: any ; day: string;}) => {
    

    let initialData: string[] = ["8:00 AM"]

    if (profile && profile?.availability) {
        initialData = profile.availability[day] || [];
    }

    const newAvailability = profile?.availability

    const [selectedTimes, setSelectedTimes] = React.useState<string[]>(initialData)
    const [isLoading, setIsLoading] = React.useState(false)
    
    //let initialData = profile && profile.availability[day] || [];
    
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
        setSelectedTimes([...timesArray])
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
            if (profile?.id && newAvailability?.id) {

                const data = {
                    monday: selectedTimes,
                    doctorProfileId: profile.id,
                };
                const updatedAvail = await updateAvailabilityById(newAvailability?.id, data)
                toast.success("Availability updated")
                console.log("Availability updated:", updatedAvail);
                

            } else if (profile?.id) {

                console.log("Availablity not found");
                const data = {
                    monday: selectedTimes,
                    doctorProfileId: profile.id,
                };
                const createdAvail = await createAvailability(data)
                toast.success("Availability created") 
                console.log("Availability created:", createdAvail);
                
            }

        } catch (error) {
            toast.error("Profile not found")
            console.log("Error creating availability:", error);
            
        } finally {
            setIsLoading(false)
        }

    }

  return (

    <>
        <SelectedTimes 
            handleAddAll={handleAddAll} 
            handleRemoveTime={handleRemoveTime} 
            handleAddTime={handleAddTime} 
            selectedTimes={selectedTimes} 
            timesArray={timesArray} 
            handleClearAll={handleClearAll} 
            isLoading={isLoading} 
            handleSubmit={handleSubmit}
            day={day} 
        />
    </>

  )
}

export default Monday