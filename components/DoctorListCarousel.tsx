"use client";
import { BaggageClaim } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
//import Carousel from "react-multi-carousel"
//import "react-multi-carousel/lib/style.css"
import DoctorCard from "./DoctorCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

interface DoctorProps {
  name: string;
}

export default function DoctorListCarousel({ 
    doctors, 
    isInPerson 
}: {
    doctors: DoctorProps[]; 
    isInPerson?: boolean;
}) {
        
  // const responsive = {
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 3,
  //     slidesToSlide: 1, // optional, default to 1.
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 3,
  //     slidesToSlide: 1, // optional, default to 1.
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 2,
  //     slidesToSlide: 1, // optional, default to 1.
  //   },
  // };

  return (
    // <Carousel
    //   swipeable={false}
    //   draggable={false}
    //   showDots={true}
    //   responsive={responsive}
    //   ssr={true} // means to render carousel on server-side.
    //   infinite={true}
    //   autoPlay={true}
    //   autoPlaySpeed={5000}
    //   keyBoardControl={true}
    //   customTransition="all .5"
    //   transitionDuration={1000}
    //   containerClass="carousel-container w-full"
    //   removeArrowOnDeviceType={["tablet", "mobile"]}
    //   // deviceType={}
    //   dotListClass="custom-dot-list-style"
    //   itemClass="px-4"
    // >
    //   {
    //         doctors.map((_:any, i:number) => {
    //             return (
    //                 <DoctorCard isInPerson={isInPerson} key={i} />
    //             )
    //         })
    //     }
    // </Carousel>
    <Carousel  
        opts={{
          align: "start",
        }}
        className="max-w-sm md:max-w-screen-md lg:max-w-screen-lg"
    >
      <CarouselContent className="flex p-3 justify-between">
        {
          doctors.map((doctor, i) => {
              return (
                <CarouselItem key={i} className="flex md:basis-1/2 lg:basis-1/3">
                  <DoctorCard doctor={doctor} isInPerson={isInPerson}/>
                </CarouselItem>
              )
            }
          )
        }
         
      </CarouselContent>
      <CarouselPrevious className="p-12 border-none sm:p-4 bg-transparent" size={"icon"}/>
      <CarouselNext className="p-12 border-none sm:p-4 bg-transparent" size={"icon"}/>
    </Carousel>
    
  );
}

