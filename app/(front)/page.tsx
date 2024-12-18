import TabbedSection from "@/components/Frontend/TabbedSection";
import Brands from "../../components/Frontend/Brands";
import Hero from "../../components/Frontend/Hero";
import React from "react";
import DoctorList from "@/components/DoctorList";
import { getDoctors } from "@/actions/users";
import { DoctorProfile } from "@prisma/client";

export default async function Home() {

  const doctors = (await getDoctors()) || [];


  const teleHealthDoctors: any = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "Telehealth");
  const inpersonDoctors: any = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "In-person doctor visit");

  console.log("Telehealth:",teleHealthDoctors);
  

  return (
    <section className="">
      <Hero />
      <Brands />
      <TabbedSection />
      <DoctorList 
        className="bg-slate-100 dark:bg-slate-950"
        doctors={teleHealthDoctors}
      />
      <DoctorList 
        className="bg-white dark:bg-slate-800" 
        title="In-person doctor visit" 
        isInPerson={true}
        doctors={inpersonDoctors}
      />
    </section>
  )
}
