"use client"

import { cn } from '@/lib/utils'
import React from 'react'
import TextInput from '../FormInputs/TextInput';
import SubmitButton from '../FormInputs/SubmitButton';
import { PracticeInfoFormProps, StepFormProps } from '@/utils/types';
import ArrayInput from '../FormInputs/ArrayInput';
import ShadSelectInput from '../FormInputs/ShadSelectInput';
import { useRouter } from 'next/navigation';
import { updateDoctorProfileById } from '@/actions/onboarding';
import { DoctorProfile } from '@prisma/client';


const PracticeInfoForm = ({
    page, 
    title, 
    description,
    nextPage,
    formId,
    userId
}: StepFormProps) => {

    const router = useRouter();

    const [practiceData, setPracticeData] = React.useState<PracticeInfoFormProps>({
        hospitalName: "",
        hospitalAddress: "",
        hospitalContactNumber: "",
        hospitalEmailAddress: "",
        hospitalWebsite: "",
        hospitalHoursOfOperation: "",
        servicesOffered: [],
        insuranceAccepted: "",
        languagesSpoken: [],
        page: "Practice Information",
    });
    const [errors, setErrors] = React.useState<Partial<PracticeInfoFormProps>>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
    const [register, setRegister] = React.useState<boolean>(false);
    const [services, setServices] = React.useState<string[]>([]);
    const [langSpoken, setLangSpoken] = React.useState<string[]>([])
    const [insuranceAcc, setInsuranceAcc] = React.useState<string>("");


    const insuranceOptions = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
        
    ]

  const transformedErrors: Record<string, string[]> = 
  Object.entries(errors).reduce((acc, [key, value]) => {
    acc[key] = Array.isArray(value) ? value.map(String) : [String(value)];
    return acc;
  }, {} as Record<string, string[]>)

    const {
        languagesSpoken,
        servicesOffered,
        insuranceAccepted, 
        ...rest
    } = practiceData;

    const newPracticeData = {
        languagesSpoken,
        servicesOffered,
        insuranceAccepted,
       ...rest
    }

    newPracticeData.page = page;
    newPracticeData.languagesSpoken = langSpoken;
    newPracticeData.servicesOffered = services;
    newPracticeData.insuranceAccepted = insuranceAcc;

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();


        if (validate(newPracticeData)) {

            setIsLoading(true)
            console.log("New Education Data:", newPracticeData);

            try {
                const res = await updateDoctorProfileById(formId, newPracticeData);
                console.log("Updated New Education Data:", res?.data);

                if (res?.status === 201) {
                    //Extract the profile form data from the updated profile
                    router.push(`/onboarding/${userId}?page=${nextPage}`)
                    console.log("Updated New Education Data Passed:", res.data);
                }
                
            } catch (error) {
                console.log("Updating New Education data failed:", error);
                
            } finally {
                setIsLoading(false)
                setIsSubmitted(true)
            }

        } else {
            console.log("New Education Data:", newPracticeData);
        }

    }

    const validate = (newPracticeData: Partial<DoctorProfile>) => {
        const newErrors: Partial<PracticeInfoFormProps> = {};

        if (!newPracticeData.hospitalName) newErrors.hospitalName = "Hospital name is required.";
        
        if (!newPracticeData.hospitalAddress) newErrors.hospitalAddress = "Hospital address is required.";

        if (!newPracticeData.hospitalContactNumber) newErrors.hospitalContactNumber = "Hospital contact number is required.";

        if (!newPracticeData.hospitalEmailAddress) newErrors.hospitalEmailAddress = "Hospital email is required.";

        if (!newPracticeData.hospitalHoursOfOperation) newErrors.hospitalHoursOfOperation = "Hours of operation is required.";

        if (!newPracticeData.servicesOffered) newErrors.servicesOffered = ["Serviced offered is required."];

        if (!newPracticeData.insuranceAccepted) newErrors.insuranceAccepted ? ("") : ("Insurance condition is required.");

        if (!newPracticeData.languagesSpoken) newErrors.languagesSpoken = ["Laguages spoken is required."];
        
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; 
    }

    const arrayFields = ["servicesOffered", "languagesSpoken"]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const { name, value } = e.target
        setPracticeData((prev) => ({ 
            ...prev, 
            [name]: arrayFields.includes(name) 
            ? value.split(",").map((item) => item.trim()) : value }));
        
    }

    const resetPracticeData = () => {
        setPracticeData(
            {
                hospitalName: "",
                hospitalAddress: "",
                hospitalContactNumber: "",
                hospitalEmailAddress: "",
                hospitalWebsite: "",
                hospitalHoursOfOperation: "",
                servicesOffered: [],
                insuranceAccepted: "",
                languagesSpoken: [],
                page: "Practice Information" 
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
                        label="Hospital Name"
                        register={register}
                        name="hospitalName"
                        placeholder="e.g. SaintLuis"
                        type="text"
                        className='col-span-full sm:col-span-1'
                        value={practiceData.hospitalName}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <TextInput
                        label="Hospital Address"
                        register={register}
                        name="hospitalAddress"
                        placeholder="e.g. Doherty"
                        type="text"
                        className='col-span-full sm:col-span-1'
                        value={practiceData.hospitalAddress}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <TextInput
                        label="Hospital Contact Number"
                        register={register}
                        name="hospitalContactNumber"
                        placeholder="e.g. Dickson"
                        type="text"
                        className='col-span-full sm:col-span-1'
                        value={practiceData.hospitalContactNumber}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <TextInput
                        label="Hospital Email Address"
                        register={register}
                        name="hospitalEmailAddress"
                        placeholder="e.g. Dickson"
                        type="text"
                        className='col-span-full sm:col-span-1'
                        value={practiceData.hospitalEmailAddress}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <TextInput
                        label="Hospital Website (optional)"
                        register={register}
                        name="hospitalWebsite"
                        placeholder="e.g. Dickson"
                        type="text"
                        className='col-span-full sm:col-span-1'
                        value={practiceData.hospitalWebsite}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <TextInput
                        label="Hospital Hours of Operation"
                        register={register}
                        name="hospitalHoursOfOperation"
                        placeholder="e.g. 5"
                        type="number"
                        className='col-span-full sm:col-span-1'
                        value={practiceData.hospitalHoursOfOperation}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <ArrayInput 
                      setItems={setServices} 
                      items={services} 
                      itemTitle="Hospital Services"/>
                    <ArrayInput 
                      setItems={setLangSpoken} 
                      items={langSpoken} 
                      itemTitle="Languages spoken at Hospital"/> 
                    <ShadSelectInput 
                      label="Do you accept Insurance?"
                      optionTitle='Insurance Acceptable'
                      options={insuranceOptions}
                      selectOption={insuranceAcc}
                      setSelectOption={setInsuranceAcc}
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

export default PracticeInfoForm