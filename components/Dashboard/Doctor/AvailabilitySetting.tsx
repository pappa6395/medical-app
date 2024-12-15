"use client"

import { Tabs } from "flowbite-react";
import React from 'react'
import Monday from "./AvailabilityDays/Monday";
import { Availability, DoctorProfile } from "@prisma/client";
import Tuesday from "./AvailabilityDays/Tuesday";
import Wednesday from "./AvailabilityDays/Wednesday";
import Thursday from "./AvailabilityDays/Thursday";
import Friday from "./AvailabilityDays/Friday";
import Saturday from "./AvailabilityDays/Saturday";
import Sunday from "./AvailabilityDays/Sunday";
import { Separator } from "@/components/ui/separator";

const AvailabilitySetting = ({profile}:{profile:DoctorProfile | undefined | null;}) => {

    const dayTabs = [
        {
            title: "Monday",
            component: <Monday profile={profile} day={"monday" as string}/>
        },
        {
            title: "Tuesday",
            component: <Tuesday profile={profile} day={"tuesday" as string}/>
        },
        {
            title: "Wednesday",
            component: <Wednesday profile={profile} day={"wednesday" as string}/>
        },
        {
            title: "Thursday",
            component: <Thursday profile={profile} day={"thursday" as string}/>
        },
        {
            title: "Friday",
            component: <Friday profile={profile} day={"friday" as string}/>
        },
        {
            title: "Saturday",
            component: <Saturday profile={profile} day={"saturday" as string}/>
        },
        {
            title: "Sunday",
            component: <Sunday profile={profile} day={"sunday" as string}/>
        },
    ]

  return (

    <div>
        <Separator className="my-6" />
        <p className="py-3">Please add the availability for a whole week here.</p>
        <Tabs aria-label="Default tabs" variant="default" className="">
            {dayTabs.map((tab, i) => {
                return (
                    <Tabs.Item key={i} title={tab.title}>
                        {tab.component}
                    </Tabs.Item>
                )
            })}
        </Tabs>
    </div>

  )
}

export default AvailabilitySetting