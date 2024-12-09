"use client"

import { cn } from '@/lib/utils'
import React from 'react'
import SubmitButton from '../FormInputs/SubmitButton';
import { AdditionalInfoFormProps, StepFormProps } from '@/utils/types';
import TextAreaInput from '../FormInputs/TextAreaInput';
import MultiFileUpload, { FileProps } from '../FormInputs/MultiFileUpload';
import { useRouter } from 'next/navigation';
import { updateDoctorProfileById } from '@/actions/onboarding';
import { DoctorProfile } from '@prisma/client';
import toast from 'react-hot-toast';


const AdditionalInfoForm = ({
    page, 
    title, 
    description,
    nextPage,
    formId,
    userId
}: StepFormProps) => {

    const router = useRouter();

    const [additionalData, setAdditionalData] = React.useState<AdditionalInfoFormProps>({
        educationHistory: "",
        research: "",
        accomplishments: "",
        additionalDocuments: [],
        page: "Additional Information",
    });
    const [errors, setErrors] = React.useState<Partial<AdditionalInfoFormProps>>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
    const [register, setRegister] = React.useState<boolean>(false);
    const [additionalDocs, setAdditionalDocs] = React.useState<FileProps[]>([]);


  const transformedErrors: Record<string, string[]> = 
  Object.entries(errors).reduce((acc, [key, value]) => {
    acc[key] = Array.isArray(value) ? value.map(String) : [String(value)];
    return acc;
  }, {} as Record<string, string[]>)

    const {
        additionalDocuments,
        ...rest
    } = additionalData;

    const newAdditionalData = {
        additionalDocuments,
       ...rest
    }

    newAdditionalData.page = page;  
    newAdditionalData.additionalDocuments = additionalDocs.map((doc) => doc.url);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        if (validate(newAdditionalData)) {

            setIsLoading(true)
            console.log("New Additional Data:", newAdditionalData);

            try {
                const res = await updateDoctorProfileById(formId, newAdditionalData);
                console.log("Updated New Additional Data:", res?.data);

                if (res?.status === 201) {
                    //Extract the profile form data from the updated profile
                    router.push(`/onboarding/${userId}?page=${nextPage}`)
                    console.log("Updated New Additional Data Passed:", res.data);
                }
                
            } catch (error) {
                console.log("Updating New Additional data failed:", error);
                
            } finally {
                setIsLoading(false)
                setIsSubmitted(true)
            }

        } else {
            console.log("New Additional Data:", newAdditionalData);
        }


    }

    const validate = (newAdditionalData: Partial<DoctorProfile>) => {
        const newErrors: Partial<AdditionalInfoFormProps> = {};
        
        if (!newAdditionalData.educationHistory) newErrors.educationHistory = "Education History is required.";
        
        if (!newAdditionalData.accomplishments) newErrors.accomplishments = "Accomplishments is required.";

        if (!newAdditionalData.research) newErrors.research = "Research is required.";

        if (!newAdditionalData.additionalDocuments || newAdditionalData.additionalDocuments.length === 0) newErrors.additionalDocuments = ["Additional document is required"]

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; 
    }

    const arrayFields = ["additionalDocuments"]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const { name, value } = e.target
        setAdditionalData((prev) => ({ 
            ...prev, 
            [name]: arrayFields.includes(name) 
            ? value.split(",").map((item) => item.trim()) : value }));
        
    }

    const resetAdditionalData = () => {
        setAdditionalData(
            {
                educationHistory: "",
                research: "",
                accomplishments: "",
                additionalDocuments: [],
                page: "Additional Information",
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
                    <TextAreaInput
                        label="Education History"
                        register={register}
                        name="educationHistory"
                        placeholder="enter your education history"
                        className='col-span-full sm:col-span-1'
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <TextAreaInput
                        label="Published Works or Research"
                        register={register}
                        name="research"
                        placeholder="enter your published works or research"
                        className='col-span-full sm:col-span-1'
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <TextAreaInput
                        label="Accomplishments or Awards"
                        register={register}
                        name="accomplishments"
                        placeholder="enter any special accomplishment or award"
                        className='col-span-full sm:col-span-1'
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <MultiFileUpload
                        label='Any additional Documents (CV, Medical Certificates, etc.) Upload'
                        name="additionalDocuments"
                        files={additionalDocs}
                        setFiles={setAdditionalDocs}
                        endpoint='additionalDocs'
                        errors={transformedErrors}
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

export default AdditionalInfoForm