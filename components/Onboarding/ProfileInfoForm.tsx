"use client"

import { cn } from '@/lib/utils'
import React from 'react'
import TextInput from '../FormInputs/TextInput';
import SubmitButton from '../FormInputs/SubmitButton';
import DatePickerInput from '../FormInputs/DatePickerInput';
import TextAreaInput from '../FormInputs/TextAreaInput';
import { NewProfileInfoFormProps, ProfileInfoFormProps, StepFormProps } from '@/utils/types';
import ImageInput from '../FormInputs/ImageInput';
import { DoctorProfile } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { updateDoctorProfileById } from '@/actions/onboarding';
import { useOnBoardingContext } from '@/context/context';



const ProfileInfoForm = ({
    page, 
    title, 
    description,
    nextPage,
    formId="",
    userId="",
}: StepFormProps) => {

    
    const router = useRouter()

    const [profileData, setProfileData] = React.useState<ProfileInfoFormProps>({
        medicalLicense: "",
        medicalLicenseExpiry: undefined,
        yearsOfExperience: 0,
        bio: "",
        profilePicture: "",
        page: "Profile Information",
    });
    const [errors, setErrors] = React.useState<Partial<NewProfileInfoFormProps>>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
    const [register, setRegister] = React.useState<boolean>(false);
    const [profileImage, setProfileImage] = React.useState<string>("")

    const {trackingNumber, doctorProfileId} = useOnBoardingContext()
   
    

  const transformedErrors: Record<string, string[]> = 
  Object.entries(errors).reduce((acc, [key, value]) => {
    acc[key] = Array.isArray(value) ? value.map(String) : [String(value)];
    return acc;
  }, {} as Record<string, string[]>)

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        
        const { 
            medicalLicenseExpiry,
            profilePicture,  
            yearsOfExperience,
            medicalLicense,
            bio,
            page,
        } = profileData;

        const MedicalLicenseExpireDate = medicalLicenseExpiry?.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const newProfileData = { 

            medicalLicenseExpiry: MedicalLicenseExpireDate as string,
            profilePicture: profileImage as string,
            yearsOfExperience: yearsOfExperience as number,
            medicalLicense: medicalLicense as string,
            bio: bio as string,
            page: page as string,
        };

        profileData.page = page;
        profileData.profilePicture = profileImage;

        // console.log("Tracking Number:",tracking);
        // console.log("User ID:",userId);

        if (validate(newProfileData)) {

            setIsLoading(true)
            console.log("Profile Data:", newProfileData);

            try {
                const res = await updateDoctorProfileById(formId, newProfileData);
                console.log("Updated Profile Data:", res?.data);

                if (res?.status === 201) {
                    //Extract the profile form data from the updated profile
                    router.push(`/onboarding/${userId}?page=${nextPage}`)
                    console.log("Updated Profile Data Passed:", res.data);
                }
                
            } catch (error) {
                console.log("Updating doctor profile failed:", error);
                
            } finally {
                setIsLoading(false)
                setIsSubmitted(true)
            }

        } else {
            console.log("New Bio Data:", newProfileData);
        }

    }

    const validate = (newProfileData: Partial<DoctorProfile>) => {
        const newErrors: Partial<NewProfileInfoFormProps> = {};

        if (!newProfileData.medicalLicense) newErrors.medicalLicense = "Medical license is required.";
        
        if (!newProfileData.medicalLicenseExpiry) newErrors.medicalLicenseExpiry = "License expired date is required.";

        if (!newProfileData.bio) newErrors.bio = "Biography is required.";

        if (!newProfileData.yearsOfExperience) {
            newErrors.yearsOfExperience == 0 ? ("Year of experience is required") : ("")
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; 
    }

    const numericFields = ["yearsOfExperience"];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const { name, value } = e.target
        setProfileData((prev) => ({ 
            ...prev,
             [name]: numericFields.includes(name) 
             ? parseFloat(value) || 0 
             : value,}));
        
    }

    const resetProfileData = () => {
        setProfileData(
            {
                medicalLicense: "",
                medicalLicenseExpiry: undefined,
                yearsOfExperience: 0, 
                bio: "",
                page: "Profile Information",
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
                        label="Medical License"
                        register={register}
                        name="medicalLicense"
                        placeholder="Enter your medical license"
                        type="text"
                        value={profileData.medicalLicense}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <TextInput
                        label="Years of Experience"
                        register={register}
                        name="yearsOfExperience"
                        placeholder="Enter years of experience"
                        type="number"
                        className='col-span-full sm:col-span-1'
                        value={profileData.yearsOfExperience}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <DatePickerInput
                        name="Medical License Expired Date" 
                        date={profileData.medicalLicenseExpiry}
                        setDate={(setLicenseExpiry) => setProfileData((prev)=>({...prev, medicalLicenseExpiry: setLicenseExpiry})) }
                        className='col-span-full sm:col-span-1'/>
                    <TextAreaInput
                        label="Describe your Biography"
                        register={register}
                        name="bio"
                        placeholder="Enter your biography"
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <ImageInput 
                        label="Profession Profile Image"
                        imageUrl={profileImage}
                        setImageUrl={setProfileImage}
                        endpoint="doctorProfileImage"/>      
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

export default ProfileInfoForm