"use client"

import { cn } from '@/lib/utils'
import React from 'react'
import TextInput from '../FormInputs/TextInput';
import SubmitButton from '../FormInputs/SubmitButton';
import DatePickerInput from '../FormInputs/DatePickerInput';
import RadioInput from '../FormInputs/RadioInput';
import { BioDataFormProps, GenderOptionProps, StepFormProps } from '@/utils/types';
import { generateTrackingNumber } from '@/lib/generateTracking';
import { createDoctorProfile, updateDoctorProfileById } from '@/actions/onboarding';
import { usePathname, useRouter } from 'next/navigation';
import { useOnBoardingContext } from '@/context/context';
import toast from 'react-hot-toast';



const BioDataForm = ({
    page="",
    title="", 
    description="",
    userId="",
    nextPage="",
    formId="",
    doctorProfile=null,

}: StepFormProps) => {

    // Get context data
    const {
        trackingNumber, 
        doctorProfileId,
        setTrackingNumber,
        setDoctorProfileId,
        resumeBioData,
        setResumeBioData,
        resumingDoctorData, 
    } = useOnBoardingContext()

    const pathname = usePathname()
    //console.log(trackingNumber, doctorProfileId);
    
    const [bioData, setBioData] = React.useState<BioDataFormProps>({
        firstName: doctorProfile?.firstName || resumingDoctorData.firstName || "",
        lastName: doctorProfile?.lastName || resumingDoctorData.lastName || "",
        middleName: doctorProfile?.middleName || resumingDoctorData.middleName || "",
        dob: doctorProfile?.dob || resumingDoctorData.dob || undefined,
        gender: doctorProfile?.gender || resumingDoctorData.gender || "",
        page: doctorProfile?.page || resumingDoctorData.page || "",
        userId: doctorProfile?.userId || resumingDoctorData.userId || "",
        trackingNumber: doctorProfile?.trackingNumber || resumingDoctorData.trackingNumber || "",
    });
    const [errors, setErrors] = React.useState<Partial<BioDataFormProps>>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
    const [register, setRegister] = React.useState<boolean>(false);



    const genderOptions: GenderOptionProps[] = [
        { value: 'male', label: 'Male', description: '' },
        { value: 'female', label: 'Female', description: '' },
        
    ];

    const router = useRouter();    

  const transformedErrors: Record<string, string[]> = 
  Object.entries(errors).reduce((acc, [key, value]) => {
    acc[key] = Array.isArray(value) ? value.map(String) : [String(value)];
    return acc;
  }, {} as Record<string, string[]>)

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        bioData.page = page;
        bioData.userId = userId;
        bioData.trackingNumber = generateTrackingNumber()

        if (validate(bioData)) {

            setIsLoading(true)
            console.log("Bio Data:", bioData);
            
            try {
                // Save Data to DB
                if (formId) {
                    const newProfile = await updateDoctorProfileById(doctorProfile?.id, bioData);

                    if (newProfile && newProfile.status === 201) {
                        toast.success("Bio Data updated successfully")

                        setTrackingNumber(newProfile.data?.trackingNumber ?? "")
                        setDoctorProfileId(newProfile.data?.id ?? "")
                        // Route to the Next Form
                        router.push(`${pathname}?page=${nextPage}`)
                        //console.log("New Profile Data Passed:",newProfile.data);
                        
                    } else {
                        throw new Error("Internal server error occurred")
                    }

                } else {
                    const newProfile = await createDoctorProfile(bioData)
                    setResumeBioData(bioData)
                    if (newProfile && newProfile.status === 201) {
                            toast.success("Bio Data updated successfully")

                            setTrackingNumber(newProfile.data?.trackingNumber ?? "")
                            setDoctorProfileId(newProfile.data?.id ?? "")
                            // Route to the Next Form
                            router.push(`/onboarding/${userId}?page=${nextPage}`)
                            //console.log("New Profile Data Passed:",newProfile.data);
                    } else {
                        throw Error("Internal server error occurred")
                    }
                }             
            } catch (error) {
                console.log("Error creating new Profile:", error);
            } finally {
                setIsLoading(false)
                setIsSubmitted(true)
            }

        } else {
            console.log("New Bio Data Failed:", bioData);
        }

    }

    const validate = (bioData: BioDataFormProps) => {
        const newErrors: Partial<BioDataFormProps> = {};

        if (!bioData.firstName) newErrors.firstName = "Firstname is required.";
        
        if (!bioData.lastName) newErrors.lastName = "Lastname is required.";

        if (!bioData.gender) newErrors.gender = "Gender is required.";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; 
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const { name, value } = e.target
        setBioData((prev) => ({ ...prev, [name]:value}));
        
    }

  return (

    <div className="w-full">
        <div className="text-center border-b border-gray-200 pb-4">
            <h1 className="scroll-m-20 border-b pb-2 text-3xl 
            font-semibold tracking-wide first:mt-0 mb-2">
                {title}
            </h1>
            <p className="text-sm text-muted-foreground">
                {description}
            </p>
        </div>
        <div className={cn("grid gap-6 py-4 mx-auto px-12")}>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <TextInput
                        label="First Name"
                        register={register}
                        name="firstName"
                        placeholder="e.g. John"
                        type="text"
                        className='col-span-full sm:col-span-1'
                        value={bioData.firstName}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <TextInput
                        label="Last Name"
                        register={register}
                        name="lastName"
                        placeholder="e.g. Doherty"
                        type="text"
                        className='col-span-full sm:col-span-1'
                        value={bioData.lastName}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <TextInput
                        label="Middle Name"
                        register={register}
                        name="middleName"
                        placeholder="e.g. Dickson"
                        type="text"
                        className='col-span-full sm:col-span-1'
                        value={bioData.middleName}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <DatePickerInput
                        name="Date of Birth" 
                        date={bioData.dob}
                        setDate={(setDoB) => setBioData((prev)=>({...prev, dob: setDoB})) }
                        className='col-span-full sm:col-span-1'
                        />
                    <RadioInput
                        title="Gender" 
                        name="gender"
                        options={genderOptions}
                        register={register}
                        value={bioData.gender}
                        errors={transformedErrors}
                        onChange={handleChange}
                    />     
                </div>
                <div className='m-8 flex justify-center items-center'>
                    <SubmitButton 
                        title="Save and Continue"
                        isLoading={isLoading} 
                        loadingTitle={"creating an account..."} />
                </div>
            </form>
        </div>
    </div>
  )
}

export default BioDataForm