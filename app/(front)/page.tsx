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
      <DoctorList />
      <DoctorList 
        className="bg-white py-8 lg:py-24" 
        title="In-person doctor visit" 
        isInPerson={true}
      />
    </section>
  )
}
