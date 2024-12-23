

import { Card } from "@/components/ui/card";
import UpdateServiceForm from "./UpdateServiceForm";
import { Speciality, Symptom } from "@prisma/client";
import { ServiceDoctorProfileCountProps } from "@/utils/types";


export default function DoctorServiceSettings({
  profile,
  services,
  specialties,
  symptoms,
}: {
  profile: any;
  services?: ServiceDoctorProfileCountProps[];
  specialties?: Speciality[];
  symptoms?: Symptom[];
}) {


  return (

    <div className="grid gap-6 w-full">
        <Card className="w-full border-none">
                <UpdateServiceForm 
                    services={services} 
                    specialties={specialties} 
                    symptoms={symptoms}
                    profile={profile}
                />
        </Card>
    </div>

  )
}