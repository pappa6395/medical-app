"use client"

import { updateAppointment } from '@/actions/appointments'
import DatePickerInput from '@/components/FormInputs/DatePickerInput'
import MultiFileUpload from '@/components/FormInputs/MultiFileUpload'
import RadioInput from '@/components/FormInputs/RadioInput'
import SubmitButton from '@/components/FormInputs/SubmitButton'
import TextAreaInput from '@/components/FormInputs/TextAreaInput'
import TextInput from '@/components/FormInputs/TextInput'
import { AppointmentProps, FileProps, GenderOptionProps } from '@/utils/types'
import { Appointment } from '@prisma/client'
import React from 'react'
import toast from 'react-hot-toast'


const UserProfilePanel = ({ 
    initialProfile, 
    profileId
}: {
    initialProfile: Appointment | undefined | null;
    profileId: string | undefined;
}) => {


    const [isLoading, setIsLoading] = React.useState(false)
    const [profileData, setProfileData] = React.useState<AppointmentProps>({
        firstName: initialProfile?.firstName??"",
        lastName: initialProfile?.lastName??"",
        email: initialProfile?.email??"",
        phone: initialProfile?.phone??"",
        dob: initialProfile?.dob?? undefined,
        gender: initialProfile?.gender??"",
        location: initialProfile?.location??"",
        occupation: initialProfile?.occupation??"",
        appointmentReason: initialProfile?.appointmentReason??"",
        medicalDocument: initialProfile?.medicalDocument??[],
        appointmentDate: initialProfile?.appointmentDate?? undefined,
        appointmentTime: initialProfile?.appointmentTime?? "",
        appointmentFormattedDate: initialProfile?.appointmentFormattedDate?? "",
        doctorId: initialProfile?.doctorId?? "",
        patientId: initialProfile?.patientId?? "",
        doctorName: initialProfile?.doctorName?? "",
        fee: initialProfile?.fee??0,
        status: initialProfile?.status??"",
        meetingLink: initialProfile?.meetingLink??"",
        meetingProvider: initialProfile?.meetingProvider??"",
    })
    const [selectedTime, setSelectedTime] = React.useState("")
    const [errors, setErrors] = React.useState({})

    const initialMedicalDoc = initialProfile?.medicalDocument.map((item) => {
        return {
            formatToBytes: () => item,
            title: item,
            size: 0,
            url: item,
        }
    })

    const [medicalDocs, setMedicalDocs] = React.useState<FileProps[]>(initialMedicalDoc??[]);
    const [status, setStatus] = React.useState("");
    const [meetingLink, setMeetingLink] = React.useState("")
    const [meetingProvider, setMeetingProvider] = React.useState("")


    profileData.appointmentTime = selectedTime
    profileData.medicalDocument = medicalDocs.map((doc) => doc.url)
    profileData.patientId = profileId?? ""
    profileData.status = status?? ""
    profileData.meetingLink = meetingLink?? ""
    profileData.meetingProvider = meetingProvider?? ""

    const genderOptions: GenderOptionProps[] = [
        { value: 'male', label: 'Male', description: '' },
        { value: 'female', label: 'Female', description: '' },
            
    ];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target
        setProfileData({...profileData, [name]: value })
    }

    const validate = () => {
        const newErrors = {};

       

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; 
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(profileData);
        setIsLoading(true)

        try {
            const res = await updateAppointment(initialProfile?.id??"", profileData)
            const updatedProfile = res?.data
            console.log("Updated porfile successfully:", updatedProfile);
            if (res?.status === 201) {
                toast.success("Appointment Updated Successfully!");
            }

        } catch (error) {
            console.log("Failed update user profile:", error);
            
        } finally {
            setIsLoading(false);
        }
    }

    const resetForm = () => {
        setProfileData({
            firstName: initialProfile?.firstName??"",
            lastName: initialProfile?.lastName??"",
            email: initialProfile?.email??"",
            phone: initialProfile?.phone??"",
            dob: initialProfile?.dob?? undefined,
            gender: initialProfile?.gender??"",
            location: initialProfile?.location??"",
            occupation: initialProfile?.occupation??"",
            appointmentReason: initialProfile?.appointmentReason??"",
            medicalDocument: initialProfile?.medicalDocument??[],
            appointmentDate: initialProfile?.appointmentDate?? undefined,
            appointmentTime: initialProfile?.appointmentTime?? "",
            appointmentFormattedDate: initialProfile?.appointmentFormattedDate?? "",
            doctorId: initialProfile?.doctorId?? "",
            patientId: initialProfile?.patientId?? "",
            doctorName: initialProfile?.doctorName?? "",
            fee: initialProfile?.fee??0,
            status: initialProfile?.status??"",
            meetingLink: initialProfile?.meetingLink??"",
            meetingProvider: initialProfile?.meetingProvider??"",
        })
    }

    const transformedErrors: Record<string, string[]> = 
    Object.entries(errors).reduce((acc, [key, value]) => {
        acc[key] = Array.isArray(value) ? value.map(String) : [String(value)];
        return acc;
    }, {} as Record<string, string[]>)

  return (

    <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
        <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>
        <form onSubmit={handleSubmit}>
            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <div className="mt-2">
                    <TextInput
                        label="First Name"
                        name="firstName"
                        placeholder="Enter your first name"
                        type="text"
                        value={profileData.firstName}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange}
                        className='col-span-full sm:col-span-1'
                    />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <div className="mt-2">
                        <TextInput
                            label="Last Name"
                            name="lastName"
                            placeholder="Enter your last name"
                            type="text"
                            value={profileData.lastName}
                            errors={transformedErrors}
                            disabled={isLoading}
                            onChange={handleChange} 
                            className='col-span-full sm:col-span-1'
                        />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <div className="">
                        <TextInput
                            label="Email Address"
                            name="email"
                            placeholder="Enter your email address"
                            type="email"
                            value={profileData.email}
                            errors={transformedErrors}
                            disabled={isLoading}
                            onChange={handleChange} 
                            className='col-span-full sm:col-span-1'
                        />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <div className="">
                        <TextInput
                            label="Phone No."
                            name="phone"
                            placeholder="Enter your phone no."
                            type="tel"
                            value={profileData.phone}
                            errors={transformedErrors}
                            disabled={isLoading}
                            onChange={handleChange} 
                            className='col-span-full sm:col-span-1'
                        />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <div className="">
                         <DatePickerInput
                            name="Date of Birth" 
                            date={profileData.dob}
                            setDate={(setDoB) => setProfileData((prev)=>({...prev, dob: setDoB})) }
                            className='col-span-full sm:col-span-1'
                        />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <div className="">
                        <RadioInput
                            title="Gender" 
                            name="gender"
                            options={genderOptions}
                            value={profileData.gender}
                            errors={transformedErrors}
                            onChange={handleChange}
                            className='col-span-full sm:col-span-1'
                        /> 
                    </div>
                </div>
                <div className="sm:col-span-3 sm:col-start-1">
                    <div className=''>
                        <TextInput
                            label="Address / Location"
                            name="location"
                            placeholder="Enter your location"
                            type="text"
                            value={profileData.location}
                            errors={transformedErrors}
                            disabled={isLoading}
                            onChange={handleChange}
                            className='col-span-full sm:col-span-1'
                        />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <div className="">
                        <TextInput
                            label="Occupation"
                            name="occupation"
                            placeholder="Enter your occupation"
                            type="text"
                            value={profileData.occupation}
                            errors={transformedErrors}
                            disabled={isLoading}
                            onChange={handleChange} 
                            className='col-span-full sm:col-span-1'
                        />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <div className="">
                        <MultiFileUpload
                            label='Medical document upload'
                            name="medicalDocuments"
                            files={medicalDocs}
                            setFiles={setMedicalDocs}
                            endpoint='patientMedicalDocs'
                            errors={transformedErrors}
                        />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <div className="mt-2">
                        <TextAreaInput
                            label="Reason for seeing the doctor"
                            name="appointmentReason"
                            placeholder="Enter your appointment reason"
                            value={profileData.appointmentReason}
                            errors={transformedErrors}
                            disabled={isLoading}
                            onChange={handleChange} 
                        />
                    </div>
                </div>
            </div>
            <div className='m-8 flex justify-center items-center'>
                <SubmitButton 
                    title="Update Profile"
                    isLoading={isLoading} 
                    loadingTitle={"updating a profile..."} 
                />
            </div>
        </form>
        
    </div>

  )
}

export default UserProfilePanel