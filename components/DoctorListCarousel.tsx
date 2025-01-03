"use client";

import React from "react";
import DoctorCard from "./DoctorCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Doctor } from "@/utils/types";


export default function DoctorListCarousel({ 
    doctors, 
    isInPerson 
}: {
    doctors: Doctor[]; 
    isInPerson?: boolean;
}) {
        

  return (
    
    <Carousel  
        opts={{
          align: "start",
        }}
        className="max-w-sm md:max-w-screen-md lg:max-w-screen-lg"
    >
      <CarouselContent className="flex p-3 justify-between">
        {
          doctors && doctors.map((doctor: Doctor, i) => {
              return (
                <CarouselItem key={i} className="flex justify-center md:basis-1/2 lg:basis-1/3">
                  <DoctorCard doctor={doctor} isInPerson={isInPerson}/>
                </CarouselItem>
              )
            }
          )
        }
         
      </CarouselContent>
      <CarouselPrevious className="hidden sm:block translate-x-24 sm:translate-x-0 p-16 border-none sm:p-4 bg-transparent" size={"icon"}/>
      <CarouselNext className="hidden sm:block -translate-x-24 sm:-translate-x-0 p-16 border-none sm:p-4 bg-transparent" size={"icon"}/>
      <CarouselPrevious className="block sm:hidden translate-y-32  translate-x-24 p-16 border-none sm:p-4 bg-transparent" size={"icon"}/>
      <CarouselNext className="block sm:hidden translate-y-32 -translate-x-24 p-16 border-none sm:p-4 bg-transparent" size={"icon"}/>
    </Carousel>
    
  );
}

