"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { Appointment } from '@prisma/client'
import UserProfilePanel from '../Doctor/UserProfilePanel'


const UserSettings = ({
  initialProfile, 
  userId
}: {
  initialProfile: Appointment | undefined | null;
  userId: string | undefined;
}) => {



  return (

    <div className='max-w-5xl mx-auto px-6 py-6'>
    <h2 className='pb-4 scroll-m-20 text-2xl font-bold 
    tracking-tight lg:text-4xl'>
      Settings
    </h2>
    <Tabs defaultValue="userprofile" className="">
      <TabsList className="">
        <TabsTrigger value="userprofile">User Profile</TabsTrigger>
        <TabsTrigger value="service">Service Settings</TabsTrigger>
      </TabsList>
      <div className=''>
        <TabsContent value="userprofile" className='w-full'>
          {/* Availability Setting */}
          <UserProfilePanel initialProfile={initialProfile} profileId={userId} />
        </TabsContent>
        <TabsContent value="service" className='w-full'>
          Coming soon
        </TabsContent>
      </div>
  </Tabs>
  </div>

  )
}

export default UserSettings