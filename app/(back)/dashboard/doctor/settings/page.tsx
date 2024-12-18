
import { getDoctorAvailabilityById } from '@/actions/onboarding'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import React from "react"
import DoctorSettings from "@/components/Dashboard/Settings/DoctorSettings"
import { getService } from '@/actions/services'
import { getSpecialty } from '@/actions/specialties'
import { getSymptom } from '@/actions/symptoms'


const page = async () => {

  const session = await getServerSession(authOptions);
  const user = session?.user;

  console.log("User:", user);
  
  if (!user) {
    return <div>You must be logged in to access this page.</div>
  }

  const profile = await getDoctorAvailabilityById(user.id)
  
  const services = (await getService()).data
  const specialties = (await getSpecialty()).data
  const symptoms =  (await getSymptom()).data
  
  return (

    <div>
      <DoctorSettings 
        initialProfile={profile?.data}
        userId={user.id}
        services={services}
        specialties={specialties}
        symptoms={symptoms}
      />
    </div>

  )
}

export default page