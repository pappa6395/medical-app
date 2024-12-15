

import { getService } from "@/actions/services";
import { getSpecialty } from "@/actions/specialties";
import { getSymptom } from "@/actions/symptoms";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UpdateServiceForm from "./UpdateServiceForm";
import { DoctorProfile } from "@prisma/client";


export default async function DoctorServiceSettings({profile}: {profile: DoctorProfile | undefined | null;}) {

  const allServices = (await getService()).data
  const allSpecialties = (await getSpecialty()).data
  const allSymptoms =  (await getSymptom()).data

  const services = allServices?.map((item) => {
    return {
        label: item.title,
        value: item.id,
    }
  }) || [];
  const specialties = allSpecialties?.map((item) => {
    return {
        label: item.title,
        value: item.id,
    }
  }) || [];
  const symptoms = allSymptoms?.map((item) => {
    return {
        label: item.title,
        value: item.id,
    }
  }) || [];

  

  return (

    <div className="grid gap-6 w-full">
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Choose Service</CardTitle>
                <CardDescription>update your service and specialty here</CardDescription>
                <UpdateServiceForm 
                    services={services} 
                    specialties={specialties} 
                    symptoms={symptoms}
                    profile={profile} 
                />
            </CardHeader>
        </Card>
    </div>

  )
}