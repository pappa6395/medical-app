import TabbedSection from "@/components/Frontend/TabbedSection";
import Brands from "../../components/Frontend/Brands";
import Hero from "../../components/Frontend/Hero";
import React from "react";
import DoctorList from "@/components/DoctorList";
import { getDoctors } from "@/actions/users";
import { Testimonials } from "@/components/Testimonials";
import { getReviews } from "@/actions/reviews";
import { Doctor, ReviewCardProps } from "@/utils/types";

export default async function Home() {

  let doctors = [] as Doctor[]
  let reviews = [] as ReviewCardProps[]
  try {
    const [doctorsResponses, reviewsResponses] = await Promise.all([
      getDoctors(),
      getReviews()
    ]);
    doctors = doctorsResponses || [];
    reviews = reviewsResponses?.data || [];

  } catch (err) {
    console.error("Failed to fetch doctors or reviews:", err);
  }

  const teleHealthDoctors: any = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "Telehealth");
  const inpersonDoctors: any = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "In-person doctor visit");

  //console.log("Telehealth:",teleHealthDoctors);
  

  return (
    <section className="m-0 p-0">
      <Hero />
      <Brands />
      <TabbedSection />
      <DoctorList 
        title={"Telehealth"}
        className="bg-green-50 dark:bg-green-950"
        doctors={teleHealthDoctors}
      />
      <DoctorList 
        className="bg-white dark:bg-slate-900" 
        title={"In-person doctor visit"} 
        isInPerson={true}
        doctors={inpersonDoctors}
      />
      <Testimonials reviews={reviews} title={"Testimonials"} />
    </section>
  )
}
