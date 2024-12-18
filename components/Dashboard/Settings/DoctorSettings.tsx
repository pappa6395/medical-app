"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useEffect } from 'react'
import AvailabilitySetting from '../Doctor/AvailabilitySetting'
import DoctorServiceSettings from '../Doctor/DoctorServiceSettings'
import { Availability, DoctorProfile } from '@prisma/client'
import { getDoctorAvailabilityById } from '@/actions/onboarding'

type DoctorSettingsProps = {
    initialProfile: DoctorProfile | undefined | null;
    userId: string;
    services?: any;
    specialties?: any;
    symptoms?: any;
}

const DoctorSettings = ({
    initialProfile, 
    userId,
    services,
    specialties,
    symptoms,

}: DoctorSettingsProps) => {


    console.log("DoctorSettings profile:", initialProfile);
    

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
          <AvailabilitySetting profile={initialProfile} />
        </TabsContent>
        <TabsContent value="service" className='w-full'>
          <DoctorServiceSettings 
            profile={initialProfile}
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