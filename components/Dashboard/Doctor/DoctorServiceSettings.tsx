

import { Card } from "@/components/ui/card";
import UpdateServiceForm from "./UpdateServiceForm";
import { Service, Speciality, Symptom } from "@prisma/client";


export default function DoctorServiceSettings({
  profile,
  services,
  specialties,
  symptoms,
}: {
  profile: any;
  services?: Service[];
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