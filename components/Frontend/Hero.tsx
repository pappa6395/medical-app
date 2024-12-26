import React from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import Image from "next/image"
import { Pill } from "lucide-react";
import TransitionalText from "./TransitionalText";
import heroImage from "@/public/LoginImage.jpeg";

const Hero = () => {

    const TEXTS = [
        'Acupuncture', "Massage Therapist", 'Chiropractic', 
        "Dental Care","Cosmetic Skincare", "Medical Dietitian", "Speech Therapist", 
        "Prof. Therapist", "Acupuncturist"
    ];

  return (
    <div className="bg-blue-950 dark:bg-slate-900 flex flex-col justify-between">
        <div className="relative pb-[110px] pt-[50px] dark:bg-dark 
        lg:pt-[50px] max-w-6xl mx-auto">
        <div className="container">
          <div className="-mx-4 px-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-5/12">
              <div className="hero-content space-y-4">
                <h1 className="mb-5 text-4xl font-bold !leading-[1.208] 
                text-white dark:text-white sm:text-[42px] 
                lg:text-[40px] xl:text-5xl flex flex-wrap items-center gap-3">
                    <span>Book your</span>{" "} 
                    <TransitionalText 
                        TEXTS={TEXTS} 
                    />
                    <br />
                    <span>sessions now</span>
                </h1>
                <p className="max-w-[480px] text-base text-gray-100 dark:text-gray-50">
                Health shouldn&apos;t be a puzzle, we are cutting through the B.S to
                bring you simple, affordable, and transparent healthcare.
                </p>
                {/* Search Bar Here */}
                <div className="w-full flex-1 md:w-auto md:flex-none">
                  <SearchBar />
                </div>
                {/* CTA BTNS */}
                <ul className="flex flex-wrap items-center">
                  <li>
                    <Link href="/service/urgent-care" className="inline-flex items-center justify-center rounded-md 
                      bg-blue-800 dark:bg-blue-700 px-6 py-3 text-center text-base font-medium 
                      text-white hover:bg-blue-700 lg:px-7">
                        Need Doctor Urgently
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="inline-flex items-center justify-center 
                      px-5 py-3 text-center text-base font-medium 
                      text-gray-50 hover:text-blue-500 dark:text-white">
                      <span className="mr-2">
                        <Pill className="flex-shrink-0 h-4 w-4 text-blue-400"/>
                      </span>
                      Need a Refill
                    </Link>
                  </li>
                </ul>
                <div className="py-6 flex gap-4">
                    <div className="flex flex-col items-center justify-center">
                        <span className="font-bold text-gray-50">600</span>
                        <span className="text-sm text-gray-400">Active Specialists</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <span className="font-bold text-gray-50">1,800</span>
                        <span className="text-sm text-gray-400">Active Patients</span>
                    </div>
                </div>
              </div>
            </div>
            <div className="hidden px-4 lg:block lg:w-1/12"></div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="lg:ml-auto lg:text-right">
                <div className="relative z-10 inline-block pt-11 lg:pt-0">
                  <Image
                    src={heroImage}
                    alt="hero"
                    className="max-w-full lg:ml-auto rounded-tl-[100px] rounded-xl"
                  />
                  <span className="absolute -bottom-8 -left-8 z-[-1]">
                    <svg
                      width="93"
                      height="93"
                      viewBox="0 0 93 93"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="2.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="24.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="46.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="68.5" cy="90.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="2.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="24.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="46.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="68.5" r="2.5" fill="#3056D3" />
                      <circle cx="90.5" cy="90.5" r="2.5" fill="#3056D3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    
  );
};

export default Hero;

const SingleImage = ({ href, imgSrc }:{href:string, imgSrc:string}) => {
  return (
    <div>
      <Link href={href} className="flex w-full items-center justify-center"> 
            <img src={imgSrc} alt="brand image" className="h-10 w-full"/>
      </Link>
    </div>
  );
};
