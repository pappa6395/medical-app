import React from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import AvailabilitySetting from '@/components/Dashboard/Doctor/AvailabilitySetting'
import { getDoctorAvailabilityById } from '@/actions/onboarding'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import DoctorServiceSettings from '@/components/Dashboard/Doctor/DoctorServiceSettings'


const page = async() => {

  const session = await getServerSession(authOptions);
  const user = session?.user
  const profile = await getDoctorAvailabilityById(user?.id)

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
            <AvailabilitySetting profile={profile?.data} />
          </TabsContent>
          <TabsContent value="service">
            <DoctorServiceSettings profile={profile?.data} />
          </TabsContent>
        </div>
    </Tabs>
    </div>
  )
}

export default page