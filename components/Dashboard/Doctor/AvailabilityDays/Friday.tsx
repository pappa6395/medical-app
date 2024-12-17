
import { createAvailability, updateAvailabilityById } from '@/actions/onboarding'
import React from 'react'
import toast from 'react-hot-toast'
import SelectedTimes from './SelectedTimes'
import { timesArray } from '@/config/constants'

const Friday = ({profile, day}: {profile: any; day: string; }) => {

    //console.log("Availability:", profile.availability);
    
    let initialData: string[] = ["8:00 AM"]

    if (profile && profile?.availability) {
        initialData = profile && profile?.availability[day] || [];
    };
    const newAvailability = profile?.availability || "";

    //let initialData = profile && profile?.availability[day] || [];

    const [selectedTimes, setSelectedTimes] = React.useState<string[]>(initialData)
    const [isLoading, setIsLoading] = React.useState(false)

    
    const handleAddTime = (time: string) => {

        if(!selectedTimes.includes(time)) {
            setIsLoading(true),
            setSelectedTimes((prev)=>([...prev, time])),
            setIsLoading(false) 
        } else {
            toast.error("Selected time is already added!")
        }        
        
    }
    const handleRemoveTime = (index: number) => {   
        setSelectedTimes(selectedTimes.filter((_,i) => i !== index))
    }
    const handleAddAll = () => {
        setIsLoading(true),
        setSelectedTimes([...timesArray]),
        setIsLoading(false)
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
                    friday: selectedTimes,
                    doctorProfileId: profile.id,
                };
                await updateAvailabilityById(newAvailability?.id, data)
                toast.success("Availability updated")

            } else if (profile?.id) {
                console.log("Availablity not found");
                const data = {
                    friday: selectedTimes,
                    doctorProfileId: profile.id,
                };
                await createAvailability(data)
                toast.success("Availability created")

            }

        } catch (error) {
            toast.error("Profile not found")
            console.log("Error Profile and availability:", error);
            
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

export default Friday