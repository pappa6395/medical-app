"use client"

import { cn } from '@/lib/utils'
import React from 'react'
import TextInput from '../FormInputs/TextInput';
import SubmitButton from '../FormInputs/SubmitButton';
import { ContactInfoFormProps, StepFormProps } from '@/utils/types';
import { useRouter } from 'next/navigation';
import { updateDoctorProfileById } from '@/actions/onboarding';
import { DoctorProfile } from '@prisma/client';

const ContactInfoForm = ({
    page, 
    title, 
    description,
    nextPage,
    formId,
    userId
}: StepFormProps) => {

    const router = useRouter()

    const [contactData, setContactData] = React.useState<ContactInfoFormProps>({
        
        email: "",
        phone: "",
        country: "",
        city: "",
        state: "",
        page: "Contact Information",
    });

    const [errors, setErrors] = React.useState<Partial<ContactInfoFormProps>>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
    const [register, setRegister] = React.useState<boolean>(false);
    const [profileImage, setProfileImage] = React.useState<string>("")


    const transformedErrors: Record<string, string[]> = 
    Object.entries(errors).reduce((acc, [key, value]) => {
        acc[key] = Array.isArray(value) ? value.map(String) : [String(value)];
        return acc;
    }, {} as Record<string, string[]>)

    contactData.page = page;

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();


        if (validate(contactData)) {

            setIsLoading(true)
            console.log("Contact Data:", contactData);

            try {
                const res = await updateDoctorProfileById(formId, contactData);
                console.log("Updated Contact Data:", res?.data);

                if (res?.status === 201) {
                    //Extract the profile form data from the updated profile
                    router.push(`/onboarding/${userId}?page=${nextPage}`)
                    console.log("Updated Contact Data Passed:", res.data);
                }
                
            } catch (error) {
                console.log("Updating contact data failed:", error);
                
            } finally {
                setIsLoading(false)
                setIsSubmitted(true)
            }

        } else {
            console.log("Contact Data:", contactData);
        }


    }

    const validate = (contactData: Partial<DoctorProfile>) => {
        const newErrors: Partial<ContactInfoFormProps> = {};

        if (!contactData.email) newErrors.email = "Email is required.";

        if (!contactData.phone) newErrors.phone = "Phone number is required.";

        if (!contactData.country) newErrors.country = "Country is required.";

        if (!contactData.city) newErrors.city = "City is required.";

        if (!contactData.state) newErrors.state = "State is required.";  

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; 
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const { name, value } = e.target
        setContactData((prev) => ({ ...prev, [name]:value}));
        
    }

    const resetContactData = () => {
        setContactData(
            {
                email: "",
                phone: "",
                country: "",
                city: "",
                state: "",
                page: "Contact Information", 
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
                        label="Email Address"
                        register={register}
                        name="email"
                        placeholder="e.g. john@example.com"
                        type="email"
                        value={contactData.email}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <TextInput
                        label="Phone No."
                        register={register}
                        name="phone"
                        placeholder="e.g. 0912345678"
                        type="tel"
                        className='col-span-full sm:col-span-1'
                        value={contactData.phone}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                     <TextInput
                        label="Country"
                        register={register}
                        name="country"
                        placeholder="Enter your country"
                        type="text"
                        className='col-span-full sm:col-span-1'
                        value={contactData.country}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                     <TextInput
                        label="City"
                        register={register}
                        name="city"
                        placeholder="Enter your city"
                        type="text"
                        className='col-span-full sm:col-span-1'
                        value={contactData.city}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                     <TextInput
                        label="State"
                        register={register}
                        name="state"
                        placeholder="Enter your state"
                        type="text"
                        className='col-span-full sm:col-span-1'
                        value={contactData.state}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
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

export default ContactInfoForm