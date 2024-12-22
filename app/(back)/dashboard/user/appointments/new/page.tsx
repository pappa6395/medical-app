
import React from "react";
import DoctorList from "@/components/DoctorList";
import { getDoctors } from "@/actions/users";
import { DoctorProfile } from "@prisma/client";
import { Doctor } from "@/utils/types";
import DoctorCard from "@/components/DoctorCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function NewAppointmnent() {

  const doctors = (await getDoctors()) || [];


  const teleHealthDoctors: any = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "Telehealth");
  const inpersonDoctors: any = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "In-person doctor visit");

  console.log("Telehealth:",teleHealthDoctors);
  

  return (
    <section className="py-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-medium tracking-tight first:mt-0">Select the Doctor to continue</h2> 
        <ScrollArea className="h-1/3 space-x-4 py-4">
        <div className="py-4 grid grid-cols-1">
            {teleHealthDoctors && teleHealthDoctors.length > 0 && (
                <div>
                    <h2 className="text-center scroll-m-20 text-3xl font-medium 
                    text-slate-600 dark:text-slate-100 tracking-tight 
                    first:mt-0"
                    >Telehealth Doctors
                    </h2>
                    <div className="grid justify-center py-4 gap-4">
                        {
                            teleHealthDoctors.map((doctor: Doctor) => {
                                return (
                                    <DoctorCard key={doctor.id} isInPerson={false} doctor={doctor} />
                                )
                            })
                        }
                    </div>     
                </div>
            )}
        </div>
        <div className="py-4 grid grid-cols-1">
            {inpersonDoctors && inpersonDoctors.length > 0 && (
                <div>
                    <h2 className="text-center scroll-m-20 text-3xl font-medium 
                    text-slate-600 dark:text-slate-100 tracking-tight 
                    first:mt-0"
                    >In-person doctor visits
                    </h2>
                    <div className="grid justify-center py-4 gap-4">
                        {
                            inpersonDoctors.map((doctor: Doctor) => {
                                return (
                                    <DoctorCard key={doctor.id} isInPerson={true} doctor={doctor} />
                                )
                            })
                        }
                    </div>
                </div>  
            )}
        </div>
        </ScrollArea>   
    </section>
  )
}
