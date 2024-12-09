"use client"

// context => useState to global level

import { createContext, ReactNode, useContext, useState } from "react";

// Steps for creating context API
// 1. Define the shape of the daata you want to track
// 2. Define and Initialize the data
// 3. Create and export the context
// 4. Add the types to the context and initialdata

// Create and export context provider

// Create and export useContext Hook

// Wrap the entire APP with the provider

interface IOnBoardingContextData {
    trackingNumber: string;
    setTrackingNumber: (value: string) => void;
    doctorProfileId: string;
    setDoctorProfileId: (value: string) => void;    
}

const initialdata: IOnBoardingContextData = {
    trackingNumber: "",
    setTrackingNumber: () => {},
    doctorProfileId: "",
    setDoctorProfileId: () => {},
}

const onBoardingContext = createContext<IOnBoardingContextData>(initialdata)

export function OnboardingContextProvider({children}: {children: ReactNode}) {

    const [trackingNumber, setTrackingNumber] = useState("GAJGUFE12L");
    const [doctorProfileId, setDoctorProfileId] = useState("6755d25aa1dd3919445db132");

    const contextValues = {
        trackingNumber: trackingNumber as string,
        setTrackingNumber: setTrackingNumber as (tNumber: string) => void,
        doctorProfileId: doctorProfileId as string,
        setDoctorProfileId: setDoctorProfileId as (dId: string) => void,
    }

    return <onBoardingContext.Provider value={contextValues}>
        {children}
    </onBoardingContext.Provider>;
}

export function useOnBoardingContext() {
    return useContext(onBoardingContext)
}
export default onBoardingContext
