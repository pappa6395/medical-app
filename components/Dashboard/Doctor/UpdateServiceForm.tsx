"use client"

import DatePickerInput from '@/components/FormInputs/DatePickerInput'
import MultiSelectInput from '@/components/FormInputs/MultiSelectInput'
import ShadSelectInput from '@/components/FormInputs/ShadSelectInput'
import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { ShadSelectInputProps, ShadSelectOptionProps } from '@/utils/types'
import { DoctorProfile, User } from '@prisma/client'
import { Loader } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'

const UpdateServiceForm = ({
    services, 
    specialties, 
    symptoms,
    profile
}: {
    services: ShadSelectOptionProps[];
    specialties: ShadSelectOptionProps[];
    symptoms: ShadSelectOptionProps[];
    profile: DoctorProfile | undefined | null;
}) => {

    console.log("profile:", profile?.id);
    
    // if (status === 'loading') {
    //     return <div>
    //             <Loader className="mr-1 w-4 h-4 animate-spin" />
    //             <span>Loading a user...</span>
    //             </div>
    // }

    const [selectedServiceId, setSelectedServiceId] = React.useState<string>("")
    const [selectedSpecialtyId, setSelectedSpecialtyId] = React.useState<string>("")
    const [selectedSymptomId, setSelectedSymptomId] = React.useState<ShadSelectOptionProps[]>([])

    const handleUpdateService = () => {

        const serviceProviding = {
            serviceId: selectedServiceId,
            specialityId: selectedSpecialtyId,
            symptomId: selectedSymptomId.map((item) => item.value),
            doctorId: profile?.id
        }
        console.log("Service Providing:",serviceProviding);
        
        
    }

  return (
    <div className=''>
        <CardContent className='space-y-3'>
            <ShadSelectInput 
                label='Select Service' 
                optionTitle='Service' 
                options={services}
                selectOption={selectedServiceId}
                setSelectOption={setSelectedServiceId}
            />
             <ShadSelectInput 
                label='Select Specialty' 
                optionTitle='Specialty' 
                options={specialties}
                selectOption={selectedSpecialtyId}
                setSelectOption={setSelectedSpecialtyId}
            />
             <MultiSelectInput 
                label='Select Symptom' 
                optionTitle='Symptom' 
                options={symptoms}
                selectOption={selectedSymptomId}
                setSelectOption={setSelectedSymptomId}
            />
        </CardContent>
        <Button type="submit" onClick={handleUpdateService}>Save</Button>
    </div>

  )
}

export default UpdateServiceForm