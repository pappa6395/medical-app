import { Check, HelpCircle } from 'lucide-react';
import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { Button } from '../ui/button';
import Link from 'next/link';

export default function Pricing () {

    const plans = [
        {
            name: "Free Forever",
            desc: "Ideal for individual practitioners starting out.",
            price: 0,
            fee: 5,
            isMostPop: false,
            features: [
                "Manage up to 50 appointments per month",
                "Basic patient record management",
                "Email notifications for appointments",
            ],
            getStarted: "/register?role=DOCTOR&plan=free"
        },
        {
            name: "Professional",
            desc: "Perfect for small to medium-sized clinics",
            price: 59.9,
            fee: 2,
            isMostPop: true,
            features: [
                "Unlimited appointments",
                "Advanced patient record management",
                "SMS reminders for appointements",
                "Customizable clinic profile",
            ],
            getStarted: "/register?role=DOCTOR&plan=professional"
        },
        {
            name: "Enterprise",
            desc: "Tailored for large healthcare institutions and hospitals.",
            price: 99.9,
            fee: 0,
            isMostPop: false,
            features: [
                "All features from the standard plan",
                "Multi-provider support",
                "Priority customer support",
                "Integration with electronic health records (EHR) systems",
            ],
            getStarted: "/register?role=DOCTOR&plan=enterprise"
        },
    ];

    return (
        <section className='py-14'>
            <div className="max-w-screen-xl mx-auto px-4 dark:text-slate-50 md:px-8">
                <div className='relative max-w-xl mx-auto sm:text-center text-gray-800 dark:text-slate-50'>
                    <h3 className='text-3xl font-semibold sm:text-4xl'>
                        Pricing for all sizes
                    </h3>
                    <div className='mt-3 max-w-xl'>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur consequat nunc.
                        </p>
                    </div>
                </div>
                <div className='mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3'>
                    {
                        plans.map((item, idx) => (
                            <div key={idx} className={`relative flex-1 flex items-stretch flex-col rounded-xl border-2 mt-6 sm:mt-0 ${item.isMostPop ? "mt-10" : ""}`}>
                                {
                                    item.isMostPop ? (
                                        <span className="w-32 absolute -top-5 left-0 right-0 mx-auto px-3 py-2 rounded-full border shadow-md bg-white text-center text-gray-700 text-sm font-semibold">Most popular</span>
                                    ) : ""
                                }
                                <div className="p-8 space-y-4 border-b">
                                    <span className='text-indigo-600 font-medium uppercase tracking-widest'>
                                        {item.name}
                                    </span>
                                    <div className='text-gray-800 dark:text-slate-50 text-3xl font-semibold'>
                                        ${item.price} <span className="text-xl text-gray-600 dark:text-slate-100 font-normal">/mo</span>
                                    </div>
                                    <div className='text-gray-800 dark:text-slate-300 font-semibold flex items-center space-x-1'>
                                        +{item.fee}<span className="text-gray-600 dark:text-slate-300 font-normal">% transaction fee</span>
                                        <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button className='text-gray-400 dark:text-slate-300'><HelpCircle className='h-4 w-4'/></button>
                                            </TooltipTrigger>
                                            <TooltipContent className='bg-slate-900 text-white text-sm' >
                                            <p>Paypal / Stripe will charge their regular transaction fee</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    
                                    <p>
                                        {item.desc}
                                    </p>
                                    <Button asChild className='px-3 py-3 rounded-lg 
                                    w-full font-semibold text-sm duration-150 
                                    text-white bg-indigo-600 hover:bg-indigo-500 
                                    active:bg-indigo-700'>
                                        <Link href={item.getStarted}>
                                            Get Started
                                        </Link>
                                    </Button>
                                </div>
                                <ul className='p-8 space-y-3'>
                                    <li className="pb-2 text-gray-800 dark:text-slate-50 font-medium">
                                        <p>Features</p>
                                    </li>
                                    {
                                        item.features.map((featureItem, idx) => (
                                            <li key={idx} className='flex 
                                                items-center gap-5'>
                                                <Check className='h-5 w-5 
                                                text-indigo-600 dark:text-indigo-400 flex-shrink-0'
                                            />
                                                <span className='text-md font-medium text-slate-800 dark:text-slate-50'>{featureItem}</span>
                                            </li>
                                    ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};
