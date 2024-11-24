import TabbedSection from "@/components/Frontend/TabbedSection";
import Brands from "../../components/Frontend/Brands";
import Hero from "../../components/Frontend/Hero";
import React from "react";
import TabbedItems from "@/components/Frontend/TabbedItems";

export default function Home() {
  return (
    <section className="">
      <Hero />
      <Brands />
      <TabbedSection />
      <TabbedItems />
    </section>
  )
}
