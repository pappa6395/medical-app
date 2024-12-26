"use client"

import { cn } from '@/lib/utils'
import React from 'react'
import SubmitButton from '../FormInputs/SubmitButton';
import { AdditionalInfoFormProps, FileProps, StepFormProps } from '@/utils/types';
import TextAreaInput from '../FormInputs/TextAreaInput';
import MultiFileUpload from '../FormInputs/MultiFileUpload';
import { usePathname, useRouter } from 'next/navigation';
import { completeProfile, updateDoctorProfileById } from '@/actions/onboarding';
import { DoctorProfile } from '@prisma/client';
import toast from 'react-hot-toast';
import { useOnBoardingContext } from '@/context/context';


const AdditionalInfoForm = ({
    page, 
    title, 
    description,
    nextPage,
    formId,
    userId,
    doctorProfile,
}: StepFormProps) => {

    const router = useRouter();

    const {
        trackingNumber,
        doctorProfileId,
        resumeAdditionalData, 
        setResumeAdditionalData,
        resumingDoctorData, 
    } = useOnBoardingContext();

    const pathname = usePathname()

    const [additionalData, setAdditionalData] = React.useState<AdditionalInfoFormProps>({
        educationHistory: doctorProfile.educationHistory || resumingDoctorData.educationHistory || "",
        research: doctorProfile.research || resumingDoctorData.research || "",
        accomplishments: doctorProfile.accomplishments || resumingDoctorData.accomplishments || "",
        additionalDocuments: 
        doctorProfile.additionalDocuments 
            || resumingDoctorData.additionalDocuments || [],
        page: doctorProfile.page || resumingDoctorData.page || "",
    });
    const [errors, setErrors] = React.useState<Partial<AdditionalInfoFormProps>>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
    const [register, setRegister] = React.useState<boolean>(false);

    const isOnboarding = pathname.split("/").includes("onboarding");

    // const initialAddDocs: any = additionalData.additionalDocuments.length > 0 
    // ? additionalData.additionalDocuments 
    // : resumingDoctorData.additionalDocuments ?? []

    const initialAddDocs = doctorProfile.additionalDocuments.map((item) => {
        return {
            formatToBytes: () => item,
            title: item,
            size: 0,
            url: item,
        }
    })
    const [additionalDocs, setAdditionalDocs] = React.useState<FileProps[]>(initialAddDocs);
    


  const transformedErrors: Record<string, string[]> = 
  Object.entries(errors).reduce((acc, [key, value]) => {
    acc[key] = Array.isArray(value) ? value.map(String) : [String(value)];
    return acc;
  }, {} as Record<string, string[]>)


    additionalData.page = page;  
    additionalData.additionalDocuments = additionalDocs.map((doc: FileProps) => (doc.url))

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        if (validate(additionalData)) {

            setIsLoading(true)
            console.log("New Additional Data:", additionalData);

            try {

                if (isOnboarding) {
                    const res = await completeProfile(formId?formId:doctorProfileId, additionalData);
                    setResumeAdditionalData(additionalData)
                    
                    if (res?.status === 201) {
                        //Extract the profile form data from the updated profile
                        // SEND A WELCOME EMAIL
    
                        toast.success("Profile Completed Successfully")
    
                        //Route Them TO THE LOGIN
                        
                        if (userId && isOnboarding) {
                            router.push("/dashboard",)
                        } else if (!userId && isOnboarding) {
                            router.push("/login")
                        }
                        
                        console.log("Updated New Additional Data Passed:", res.data);
                    } else {
                        setIsLoading(false);
                        throw new Error("Something went wrong")
                    }
                } else {
                    const res = await updateDoctorProfileById(doctorProfile.id, additionalData);
                    setResumeAdditionalData(additionalData)

                    if (res?.status === 201) {
    
                        toast.success("Profile Completed Successfully")
                        
                        console.log("Updated New Additional Data Passed:", res.data);
                    } else {
                        setIsLoading(false);
                        throw new Error("Something went wrong")
                    }
                } 
                
            } catch (error) {
                console.log("Updating New Additional data failed:", error);
                
            } finally {
                setIsLoading(false)
                setIsSubmitted(true)
            }

        } else {
            console.log("New Additional Data:", additionalData);
        }


    }

    const validate = (additionalData: Partial<DoctorProfile>) => {
        const newErrors: Partial<AdditionalInfoFormProps> = {};
        
        if (!additionalData.educationHistory) newErrors.educationHistory = "Education History is required.";
        
        if (!additionalData.accomplishments) newErrors.accomplishments = "Accomplishments is required.";

        if (!additionalData.research) newErrors.research = "Research is required.";

        if (!additionalData.additionalDocuments || additionalData.additionalDocuments.length === 0) newErrors.additionalDocuments = ["Additional document is required"]

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
                        value={additionalData.educationHistory}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <TextAreaInput
                        label="Published Works or Research"
                        register={register}
                        name="research"
                        placeholder="enter your published works or research"
                        value={additionalData.research}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <TextAreaInput
                        label="Accomplishments or Awards"
                        register={register}
                        name="accomplishments"
                        placeholder="enter any special accomplishment or award"
                        value={additionalData.accomplishments}
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
                        title={isOnboarding ? 'Complete' : 'Save'}
                        isLoading={isLoading} 
                        loadingTitle={isOnboarding ? "creating an account..." : "Saving..."} />
                </div>
            </form>
        </div>
    </div>
  )
}

export default AdditionalInfoForm