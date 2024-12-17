import TabbedSection from "@/components/Frontend/TabbedSection";
import Brands from "../../components/Frontend/Brands";
import Hero from "../../components/Frontend/Hero";
import React from "react";
import DoctorList from "@/components/DoctorList";

export default function Home() {

  return (
    <section className="">
      <Hero />
      <Brands />
      <TabbedSection />
      <DoctorList 
        className="bg-slate-100 dark:bg-slate-950"/>
      <DoctorList 
        className="bg-white dark:bg-slate-800" 
        title="In-person doctor visit" 
        isInPerson={true}
      />
    </section>
  )
}
