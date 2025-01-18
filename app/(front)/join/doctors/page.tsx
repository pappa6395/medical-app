import Image from "next/image";
import React from "react";
import doctorImage from "@/public/doctorImage.2.jpeg";
import groupImage from "@/public/GroupImage1.jpeg";
import CustomButton from "@/components/CustomButton";
import { Check } from "lucide-react";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import CustomAccordion from "@/components/CustomAccordion";
import { FAQItem } from "@/utils/types";
import Pricing from "@/components/Frontend/Pricing";

const page = () => {
  const features = [
    "Medical-App brings patients to you",
    "Seamless e-prescribing experience",
    "Integrated clinical note-taking",
  ];
  const whyUs = [
    {
      title: "List your practice",
      description:
        "It's free to join with no membership fees or time commitments.",
    },
    {
      title: "Create competitive offerings",
      description:
        "We help you tailor your offerings to attract new patients and build your practice.",
    },
    {
      title: "Start seeing patients",
      description:
        "Patients can book appointments with you minutes after your profile goes live.",
    },
  ];
  const cards = [
    {
      title: "Begin your Journey",
      description:
        "Start a new application to join our network of healthcare providers",
      linkTitle: "Start a new application",
      link: "/register?role=DOCTOR&plan=free",
    },
    {
      title: "Resume Application",
      description:
        "Pick up where you left off and complete your onboarding process. Schedule for physical approve",
      linkTitle: "Continue your application",
      link: "/onboarding/resume"
    },
    {
      title: "Schedule a Call",
      description:
        "Arrange your time for a call. In case of, further information is required to finalize your application",
      linkTitle: "Schedule a Call",
      link: "/",
    },
    {
      title: "Track your Progress",
      description:
        "Monitor the status of your application and approvals in real-time..",
      linkTitle: "Check your Progress",
      link: "/",
    },
  ];
  const faqs: FAQItem[] = [
    {
      qn: "What is this medical app used for?",
      ans: (
        <div className="flex flex-col space-y-2">
                <p className="">This app helps you manage your health records,book appointments, and track your medical history.
                Please click here to</p>{" "}
               <div className="translate-x-32 md:translate-x-20 sm:-translate-y-5">
                <CustomButton 
                        title={"Sign Up"} 
                        href="/register"
                        className="bg-blue-500 text-slate-50 hover:bg-blue-700 rounded-full h-6"
                    />
               </div>
        </div>
        ),
    },
    {
      qn: "How do I book an appointment?",
      ans: (
        <>
          To book an appointment, navigate to the <strong>Appointments</strong>{" "}
          section, select a doctor, choose a date and time, and confirm your
          booking.
        </>
      ),
    },
    {
      qn: "Is my medical data secure?",
      ans: "Yes, we use end-to-end encryption to ensure that your medical data remains confidential and secure.",
    },
    {
      qn: "Can I share my medical history with my doctor?",
      ans: (
        <>
          Yes, you can share your medical history by clicking on the{" "}
          <strong>Share History</strong> button in the{" "}
          <strong>Health Records</strong> section. Ensure you have selected the
          doctor you want to share with.
        </>
      ),
    },
    {
      qn: "Does this app support emergency services?",
      ans: "Yes, you can access emergency contacts and services directly from the app's Emergency section.",
    },
    {
      qn: "How do I update my personal details?",
      ans: (
        <>
          To update your personal details, go to <strong>Settings</strong>,
          click on <strong>Profile</strong>, make the necessary changes, and
          save.
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="py-6 px-8 bg-slate-50 dark:bg-emerald-950">
        <div className="max-w-6xl gap-8 mx-auto grid grid-cols-1 md:grid-cols-2">
          <div>
            <h2 className="text-[1.5rem] sm:text-[3rem] md:text-5xl leading-[3.5rem]">
              Build a thriving{" "}
              <span className="text-indigo-500 font-semibold">direct-pay</span>{" "}
              practice with Medical App.
            </h2>
            <p className="py-4 text-base">
              We are thrilled to invite you to join medical-app, a revolutionary
              platform designed exclusively for medical professionals like you.
              Our mission is to simplify your practice, enhance patient care,
              and connect you with a thriving community of peers and resources.
            </p>
            <CustomButton
              title={"List your Service"}
              href="#"
              className="text-lg text-slate-50 bg-emerald-600 hover:bg-emerald-700 h-10"
            />
            <div className="py-6">
              {features.map((feature, i) => {
                return (
                  <p key={i} className="flex items-center">
                    <Check
                      className="w-4 h-4 mr-2 
                                    flex-shrink-0 text-blue-500"
                    />
                    <span className="text-lg">{feature}</span>
                  </p>
                );
              })}
            </div>
          </div>
          <Image
            src={doctorImage}
            alt="doctorimage2"
            width={1170}
            height={848}
            className="w-full"
          />
        </div>
      </section>
      <section className="py-6 px-8 mt-0 bg-pink-100/50 dark:bg-emerald-800">
        <div className="max-w-6xl gap-8 mx-auto grid grid-cols-1 md:grid-cols-2">
          <Image
            src={groupImage}
            alt="groupimage1"
            width={1170}
            height={848}
            className="w-full block order-2 md:order-1"
          />
          <div className="order-1 md:order-2">
            <h2 className="text-[1.5rem] sm:text-[3rem] md:text-5xl leading-[3.5rem]">
              Join Medical-App to increase your{" "}
              <span className="text-indigo-500 font-semibold">revenue</span>{" "}
              today.
            </h2>
            <div className="py-2">
              {whyUs.map((item, i) => {
                return (
                  <div key={i} className="py-2">
                    <p className="flex items-center py-2">
                      <IoMdArrowDroprightCircle
                        className="w-4 h-4 mr-2 
                                        flex-shrink-0 text-blue-500"
                      />
                      <span className="text-xl font-semibold">
                        {item.title}
                      </span>
                    </p>
                    <p className="flex-shrink-0 mx-5">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="py-6 px-8 mb-0 bg-slate-50 dark:bg-emerald-950">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card, i) => {
            return (
              <div key={i} className="bg-slate-100 dark:bg-teal-900 p-4 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-emerald-500">
                  {card.title}
                </h3>
                <p className="text-gray-400 dark:text-slate-50 text-lg py-3">{card.description}</p>
                <CustomButton
                  title={card.linkTitle}
                  href={card.link}
                  className="bg-emerald-600 text-slate-50 hover:bg-emerald-700"
                />
              </div>
            );
          })}
        </div>
      </section>
      <section className="py-6 px-8 mb-0 dark:bg-emerald-800">
        <div id={"pricing"} className="max-w-6xl gap-4 mx-auto">
         <Pricing />
        </div>
      </section>
      <section className="py-6 px-8 mb-0 bg-slate-50 dark:bg-emerald-900">
        <div className="max-w-2xl gap-4 mx-auto">
          <CustomAccordion FAQS={faqs} />
        </div>
      </section>
    </div>
  );
};

export default page;
