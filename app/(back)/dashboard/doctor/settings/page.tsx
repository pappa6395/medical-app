
import { getDoctorAvailabilityById } from '@/actions/onboarding'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import React from "react"
import DoctorSettings from "@/components/Dashboard/Settings/DoctorSettings"
import { getService } from '@/actions/services'
import { getSpecialty } from '@/actions/specialties'
import { getSymptom } from '@/actions/symptoms'


const fetchData = async (fetchFn: Function, defaultValue: any) => {
  try {
    return await fetchFn() || defaultValue;
  } catch (err) {
    console.error(`Failed to fetch data:`, err);
    return defaultValue;
  }
};

const page = async () => {

  const session = await getServerSession(authOptions);
  const user = session?.user || null;
  const userId = user?.id || "";
  
  if (!user) {
    return <div>You must be logged in to access this page.</div>
  }

  const profile = await fetchData(() => getDoctorAvailabilityById(user.id), {})
  const services = await fetchData(getService, {})
  const specialties = await fetchData(getSpecialty, {})
  const symptoms =  await fetchData(getSymptom, {})
  
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