
import { getDoctorAvailabilityById } from '@/actions/onboarding'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import React from "react"
import DoctorSettings from "@/components/Dashboard/Settings/DoctorSettings"
import { getService } from '@/actions/services'
import { getSpecialty } from '@/actions/specialties'
import { getSymptom } from '@/actions/symptoms'
import { ServiceDoctorProfileCountProps } from '@/utils/types'
import { Speciality, Symptom } from '@prisma/client'



const page = async () => {

  const session = await getServerSession(authOptions);
  const user = session?.user || null;
  
  
  if (!user) {
    return <div>You must be logged in to access this page.</div>
  }

  const userId = user?.id || "";
  // const profile = (await getDoctorAvailabilityById(user.id))?.data || null;
  // const services = (await getService())?.data || [];
  // const specialties = (await getSpecialty())?.data || [];
  // const symptoms =  (await getSymptom())?.data || [];

  let profile = null;
  let services = [] as ServiceDoctorProfileCountProps[]
  let specialties = [] as Speciality[]
  let symptoms = [] as Symptom[]

  try {
    const [
      profileResponse, 
      servicesResponse, 
      specialtiesResponse, 
      symptomsResponse
    ] = await Promise.all(
      [
        getDoctorAvailabilityById(userId),
        getService(),
        getSpecialty(),
        getSymptom(),
      ]
    );

    profile = profileResponse?.data || null;
    services = servicesResponse?.data || [];
    specialties = specialtiesResponse?.data || [];
    symptoms = symptomsResponse?.data || [];

  } catch (error) {
    console.error('Failed to fetch data:', error);
    
  }
  
  return (

    <div>
      <DoctorSettings 
        initialProfile={profile ?? null}
        userId={userId ?? ""}
        services={services ?? []}
        specialties={specialties ?? []}
        symptoms={symptoms ?? []}
      />
    </div>

  )
}

export default page