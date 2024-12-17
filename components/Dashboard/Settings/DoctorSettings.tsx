"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useEffect } from 'react'
import AvailabilitySetting from '../Doctor/AvailabilitySetting'
import DoctorServiceSettings from '../Doctor/DoctorServiceSettings'
import { DoctorProfile } from '@prisma/client'
import { getDoctorAvailabilityById } from '@/actions/onboarding'

type DoctorSettingsProps = {
    initialProfile: any,
    userId: string,
    services?: any,
    specialties?: any,
    symptoms?: any,
}

const DoctorSettings = ({
    initialProfile, 
    userId,
    services,
    specialties,
    symptoms,

}: DoctorSettingsProps) => {

    const [profile, setProfile] = React.useState(initialProfile)

    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const updatedProfile = await getDoctorAvailabilityById(userId);
                setProfile(updatedProfile?.data as Partial<DoctorProfile>);
                console.log("Updated Doctor Availability:", updatedProfile);

            } catch (error) {
                console.log("Failed to fetch doctor availability:", error);

            }
        };

        fetchAvailability()
        },[userId])
        
  return (

    <div className='max-w-5xl mx-auto px-6 py-6'>
    <h2 className='pb-4 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl'>Settings</h2>
    <Tabs defaultValue="availability" className="">
      <TabsList className="">
        <TabsTrigger value="availability">Availability</TabsTrigger>
        <TabsTrigger value="service">Service Settings</TabsTrigger>
      </TabsList>
      <div className=''>
        <TabsContent value="availability" className='w-full'>
          {/* Availability Setting */}
          <AvailabilitySetting profile={profile} />
        </TabsContent>
        <TabsContent value="service" className='w-full'>
          <DoctorServiceSettings 
            profile={profile}
            services={services}
            specialties={specialties}
            symptoms={symptoms}
            />
        </TabsContent>
      </div>
  </Tabs>
  </div>

  )
}

export default DoctorSettings