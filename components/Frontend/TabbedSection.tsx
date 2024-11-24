"use client"
import React from "react";


const TabbedSection: React.FC = () => {

  return (
    <section className="pb-12 pt-20 dark:bg-dark">
        <div className="container mx-auto">
            <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4">
                    <div className="mx-auto mb-12 max-w-5xl text-center lg:mb-20">
                    <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                        Top-rated online doctors & specialists available now.
                    </h2>
                    <p className="text-base text-body-color dark:text-dark-6">
                        Choose from thousands of providers at every day affordable prices.
                        Book online today.
                    </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default TabbedSection;
