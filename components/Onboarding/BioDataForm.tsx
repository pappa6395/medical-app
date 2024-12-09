"use client"

import { cn } from '@/lib/utils'
import React from 'react'
import TextInput from '../FormInputs/TextInput';
import SubmitButton from '../FormInputs/SubmitButton';
import DatePickerInput from '../FormInputs/DatePickerInput';
import RadioInput from '../FormInputs/RadioInput';
import { BioDataFormProps, GenderOptionProps, NewBioDataFormProps, StepFormProps } from '@/utils/types';
import { generateTrackingNumber } from '@/lib/generateTracking';
import { createDoctorProfile } from '@/actions/onboarding';
import { useRouter } from 'next/navigation';
import { DoctorProfile } from '@prisma/client';
import { useOnBoardingContext } from '@/context/context';



const BioDataForm = ({
    page, 
    title, 
    description,
    userId,
    nextPage,
    formId="",
}: StepFormProps) => {

    // Get context data
    const {
        trackingNumber, 
        doctorProfileId,
        setTrackingNumber,
        setDoctorProfileId, 
    } = useOnBoardingContext()

    console.log(trackingNumber, doctorProfileId);
    

    const [bioData, setBioData] = React.useState<BioDataFormProps>({
        firstName: "",
        lastName: "",
        middleName: "",
        dob: undefined,
        gender: "",
        page: "Bio Data",
        userId: userId,
        trackingNumber: "",
    });
    const [errors, setErrors] = React.useState<Partial<NewBioDataFormProps>>({});
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
        
        const { 
            dob,  
            ...rest
        } = bioData;

        const DoB = dob?.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const newBioData: Partial<DoctorProfile> = { 
            dob: DoB,
            ...rest
        };

        newBioData.page = page;
        newBioData.userId = userId;
        newBioData.trackingNumber = generateTrackingNumber()

        if (validate(newBioData)) {

            setIsLoading(true)
            
            try {
                const newProfile = await createDoctorProfile(newBioData);

                if (newProfile.status === 201) {
                    setTrackingNumber(newProfile.data?.trackingNumber ?? "")
                    setDoctorProfileId(newProfile.data?.id ?? "")

                    router.push(`/onboarding/${userId}?page=${nextPage}`)
                    console.log("New Profile Data Passed:",newProfile.data);
                    
                }
                
            } catch (error) {
                console.log("Error creating new Profile:", error);
            } finally {
                setIsLoading(false)
                setIsSubmitted(true)
            }

            

        } else {
            console.log("New Bio Data Failed:", newBioData);
        }

    }

    const validate = (newBioData: Partial<DoctorProfile>) => {
        const newErrors: Partial<NewBioDataFormProps> = {};

        if (!newBioData.firstName) newErrors.firstName = "Firstname is required.";
        
        if (!newBioData.lastName) newErrors.lastName = "Lastname is required.";

        if (!newBioData.gender) newErrors.gender = "Gender is required.";

        if (!newBioData.dob) newErrors.dob = "Date of Birth is required.";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; 
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const { name, value } = e.target
        setBioData((prev) => ({ ...prev, [name]:value}));
        
    }

    const resetBioData = () => {
        setBioData(
            {
                firstName: "",
                lastName: "",
                middleName: "",
                dob: undefined,
                gender: "",
                page: "BioData",
                userId: userId,
                trackingNumber: "",
            }
        )
        setErrors({});
        setIsSubmitted(false);
        setIsLoading(false);
      
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