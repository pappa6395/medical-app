"use client"

import { AdditionalInfoFormProps, BioDataFormProps, ContactInfoFormProps, EducationInfoFormProps, PracticeInfoFormProps, ProfileInfoFormProps } from "@/utils/types";
import { Availability, DoctorProfile } from "@prisma/client";
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
    resumingDoctorData: Partial<DoctorProfile>;
    setResumingDoctorData: (data: Partial<DoctorProfile>) => void;
    
    //Tack the form data
    resumeBioData: BioDataFormProps;
    setResumeBioData: (data: BioDataFormProps) => void;
    resumeProfileData: ProfileInfoFormProps;
    setResumeProfileData: (data: ProfileInfoFormProps) => void;
    resumeContactData: ContactInfoFormProps;
    setResumeContactData: (data: ContactInfoFormProps) => void;
    resumeEducationData: EducationInfoFormProps;
    setResumeEducationData: (data: EducationInfoFormProps) => void;
    resumePracticeData: PracticeInfoFormProps;
    setResumePracticeData: (data: PracticeInfoFormProps) => void;
    resumeAdditionalData: AdditionalInfoFormProps;
    setResumeAdditionalData: (data: AdditionalInfoFormProps) => void;

}


const initialBioData = {
    firstName: "",
    lastName: "",
    middleName: "",
    dob: undefined,
    gender: "",
    page: "",
    userId: "",
    trackingNumber: "",
}
const initialProfileData = {
    medicalLicense: "",
    yearsOfExperience: 0,
    medicalLicenseExpiry: undefined,
    bio: "",
    profilePicture: "",
    page: "",
}
const initialContactData = {
    email: "",
    phone: "",
    country: "",
    city: "",
    state: "",
    page: "",
}
const initialEducationData = {
    medicalSchool: "",
    graduationYear: "",
    primarySpecialization: "",
    otherSpecialties: [],
    boardCertificates: [],
    page: "",
}
const initialPracticeData = {
    hospitalName: "",
    hospitalAddress: "",
    hospitalContactNumber: "",
    hospitalEmailAddress: "",
    hospitalWebsite: "",
    hospitalHoursOfOperation: "",
    servicesOffered: [],
    insuranceAccepted: "",
    languagesSpoken: [],
    hourlyWage: 100,
    page: "",
}
const initialAdditionalData = {
    educationHistory: "",
    research: "",
    accomplishments: "",
    additionalDocuments: [],
    page: "",
}

const initialContextdata: IOnBoardingContextData = {
    trackingNumber: "",
    setTrackingNumber: () => {},
    doctorProfileId: "",
    setDoctorProfileId: () => {},
    resumeBioData: initialBioData,
    setResumeBioData: () => {},
    resumeProfileData: initialProfileData,
    setResumeProfileData: () => {},
    resumeContactData: initialContactData,
    setResumeContactData: () => {},   
    resumeEducationData: initialEducationData,
    setResumeEducationData: () => {},
    resumePracticeData: initialPracticeData,
    setResumePracticeData: () => {},
    resumeAdditionalData: initialAdditionalData,
    setResumeAdditionalData: () => {},
    resumingDoctorData: {},
    setResumingDoctorData: () => {},
}

const onBoardingContext = createContext<IOnBoardingContextData>(initialContextdata)

export function OnboardingContextProvider({children}: {children: ReactNode}) {

    const [trackingNumber, setTrackingNumber] = useState("");
    const [doctorProfileId, setDoctorProfileId] = useState("");
    const [resumeBioData, setResumeBioData] = useState(initialBioData);
    const [resumeProfileData, setResumeProfileData] = useState(initialProfileData);
    const [resumeContactData, setResumeContactData] = useState(initialContactData);
    const [resumeEducationData, setResumeEducationData] = useState(initialEducationData);
    const [resumePracticeData, setResumePracticeData] = useState(initialPracticeData);
    const [resumeAdditionalData, setResumeAdditionalData] = useState(initialAdditionalData);
    const [resumingDoctorData, setResumingDoctorData] = useState({})

    const contextValues = {
        trackingNumber: trackingNumber as string,
        setTrackingNumber: setTrackingNumber as (value: string) => void,
        doctorProfileId: doctorProfileId as string,
        setDoctorProfileId: setDoctorProfileId as (dId: string) => void,
        resumeBioData: resumeBioData as BioDataFormProps,
        setResumeBioData: setResumeBioData as (data: BioDataFormProps) => void,
        resumeProfileData: resumeProfileData as ProfileInfoFormProps,
        setResumeProfileData: setResumeProfileData as (data: ProfileInfoFormProps) => void,
        resumeContactData: resumeContactData as ContactInfoFormProps,
        setResumeContactData: setResumeContactData as (data: ContactInfoFormProps) => void,
        resumeEducationData: resumeEducationData as EducationInfoFormProps,
        setResumeEducationData: setResumeEducationData as (data: EducationInfoFormProps) => void,
        resumePracticeData: resumePracticeData as PracticeInfoFormProps,
        setResumePracticeData: setResumePracticeData as (data: PracticeInfoFormProps) => void,
        resumeAdditionalData: resumeAdditionalData as AdditionalInfoFormProps,
        setResumeAdditionalData: setResumeAdditionalData as (data: AdditionalInfoFormProps) => void,
        resumingDoctorData: resumingDoctorData,
        setResumingDoctorData: setResumingDoctorData,
    
    }

    return <onBoardingContext.Provider value={contextValues}>
        {children}
    </onBoardingContext.Provider>;
}

export function useOnBoardingContext() {
    return useContext(onBoardingContext)
}
export default onBoardingContext
