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

const AvailabilitySetting = ({profile}:{profile:DoctorProfile | undefined | null;}) => {

    const dayTabs = [
        {
            title: "Monday",
            component: <Monday profile={profile} day={"monday"}/>
        },
        {
            title: "Tuesday",
            component: <Tuesday profile={profile} day={"tuesday"}/>
        },
        {
            title: "Wednesday",
            component: <Wednesday profile={profile} day={"wednesday"}/>
        },
        {
            title: "Thursday",
            component: <Thursday profile={profile} day={"thursday"}/>
        },
        {
            title: "Friday",
            component: <Friday profile={profile} day={"friday"}/>
        },
        {
            title: "Saturday",
            component: <Saturday profile={profile} day={"saturday"}/>
        },
        {
            title: "Sunday",
            component: <Sunday profile={profile} day={"sunday"}/>
        },
    ]

  return (

    <div>
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