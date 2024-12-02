"use client"
import React from "react";
import TabbedItems from "./TabbedItems";


const TabbedSection: React.FC = () => {

  return (
    <section className="flex pb-12 pt-20 dark:bg-slate-900">
        <div className="flex flex-col items-center justify-center w-full">
            <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4">
                    <div className="mx-auto mb-12 max-w-5xl text-center lg:mb-20">
                        <h2 className="text-wrap mb-3 text-3xl font-bold leading-[1.2] 
                        text-slate-800 dark:text-white sm:text-4xl md:text-[40px]
                        scroll-m-20 pb-2 tracking-tight first:mt-0">
                            Top-rated online doctors & specialists available now.
                        </h2>
                        <p className="text-base text-wrap text-body-color dark:text-dark-6">
                            Choose from thousands of providers at every day affordable prices.
                            Book online today.
                        </p>
                    </div>
                </div>
            </div>
            <TabbedItems />
        </div>
    </section>
  );
};

export default TabbedSection;
