"use client"

import { cn } from '@/lib/utils'
import React from 'react'
import TextInput from '../FormInputs/TextInput';
import SubmitButton from '../FormInputs/SubmitButton';
import DatePickerInput from '../FormInputs/DatePickerInput';
import TextAreaInput from '../FormInputs/TextAreaInput';
import RadioInput from '../FormInputs/RadioInput';
import { BioDataFormProps, GenderOptionProps, StepFormProps, ValidationProps } from '@/utils/types';
import ImageInput from '../FormInputs/ImageInput';



const BioDataForm = ({
    page, 
    title, 
    description
}: StepFormProps) => {

    const [bioData, setBioData] = React.useState<BioDataFormProps>({
        firstName: "",
        lastName: "",
        middleName: "",
        dob: undefined,
        medicalLicense: "",
        medicalLicenseExpiry: undefined,
        gender: "",
        bio: "",
        page: "bioData",
        yearsOfExperience: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        state: "",
        medicalSchool: "",
        graduationYear: "",
    });
    const [errors, setErrors] = React.useState<Partial<BioDataFormProps>>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
    const [register, setRegister] = React.useState<boolean>(false);
    const [profileImage, setProfileImage] = React.useState<string>("")


    const genderOptions: GenderOptionProps[] = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        
    ]

  const transformedErrors: Record<string, string[]> = 
  Object.entries(errors).reduce((acc, [key, value]) => {
    acc[key] = Array.isArray(value) ? value.map(String) : [String(value)];
    return acc;
  }, {} as Record<string, string[]>)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const { 
            firstName, 
            lastName, 
            middleName, 
            dob, 
            medicalLicense, 
            medicalLicenseExpiry, 
            gender, 
            bio,
            page,
            yearsOfExperience,
            email,
            phone,
            country,
            city,
            state,
            medicalSchool,
            graduationYear,
        } = bioData;

        const DoB = dob?.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        const MedicalLicenseExpireDate = medicalLicenseExpiry?.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        
        const newBioData = { 
            DoB: DoB,
            MedicalLicenseExpireDate: MedicalLicenseExpireDate,
            firstName,
            lastName,
            middleName,
            medicalLicense,
            gender,
            bio,
            page,
            yearsOfExperience,
            email,
            phone,
            country,
            city,
            state,
            medicalSchool,
            graduationYear,    
        };

        bioData.page = page;

        if (validate(newBioData)) {

        } else {
            console.log("New Bio Data:", newBioData);
        }

    }

    const validate = (newBioData: ValidationProps) => {
        const newErrors: Partial<ValidationProps> = {};

        if (!newBioData.firstName) newErrors.firstName = "Firstname is required.";
        
        if (!newBioData.lastName) newErrors.lastName = "Lastname is required.";

        if (!newBioData.medicalLicense) newErrors.medicalLicense = "Medical license is required.";

        if (!newBioData.gender) newErrors.gender = "Gender is required.";

        if (!newBioData.bio) newErrors.bio = "Biography is required.";

        if (!newBioData.DoB) newErrors.DoB = "Date of Birth is required.";

        if (!newBioData.MedicalLicenseExpireDate) newErrors.MedicalLicenseExpireDate = "Medical license expiry date is required.";

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
                medicalLicense: "",
                dob: undefined,
                medicalLicenseExpiry: undefined,
                gender: "",
                bio: "",
                page: "BioData",
                yearsOfExperience: "",
                email: "",
                phone: "",
                country: "",
                city: "",
                state: "",
                medicalSchool: "",
                graduationYear: "",  
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
            font-semibold tracking-tight first:mt-0 mb-2">
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