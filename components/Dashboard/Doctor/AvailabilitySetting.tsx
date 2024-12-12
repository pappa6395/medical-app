"use client"

import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import React from 'react'
import Monday from "./AvailabilityDays/Monday";
import { Availability, DoctorProfile } from "@prisma/client";
import Tuesday from "./AvailabilityDays/Tuesday";

const AvailabilitySetting = ({profile}:{profile:DoctorProfile | undefined | null;}) => {

    const dayTabs = [
        {
            title: "Monday",
            component: <Monday profile={profile}/>
        },
        {
            title: "Tuesday",
            component: <Tuesday profile={profile}/>
        },
        {
            title: "Wednesday",
            component: <>Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                        control the content visibility and styling.</>
        },
        {
            title: "Thursday",
            component: <>Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                        control the content visibility and styling.</>
        },
        {
            title: "Friday",
            component: <>Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                        control the content visibility and styling.</>
        },
        {
            title: "Saturday",
            component: <>Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                        control the content visibility and styling.</>
        },
        {
            title: "Sunday",
            component: <>Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                        control the content visibility and styling.</>
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