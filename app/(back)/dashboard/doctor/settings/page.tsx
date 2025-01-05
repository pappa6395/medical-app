
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
  const user = session?.user || null;
  const userId = user?.id || "";
  
  if (!user) {
    return <div>You must be logged in to access this page.</div>
  }

  const profile = (await getDoctorAvailabilityById(user.id))?.data || null;
  
  const services = (await getService())?.data || null;
  const specialties = (await getSpecialty())?.data || null;
  const symptoms =  (await getSymptom())?.data || null;
  
  return (

    <div>
      <DoctorSettings 
        initialProfile={profile ?? null}
        userId={userId ?? ""}
        services={services ?? null}
        specialties={specialties ?? null}
        symptoms={symptoms ?? null}
      />
    </div>

  )
}

export default page