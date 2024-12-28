"use client"

import { cn } from '@/lib/utils'
import React from 'react'
import TextInput from '../FormInputs/TextInput';
import SubmitButton from '../FormInputs/SubmitButton';
import { EducationInfoFormProps, FileProps, StepFormProps } from '@/utils/types';
import SelectInput, { SelectOptionProps } from '../FormInputs/SelectInput';
import ArrayInput from '../FormInputs/ArrayInput';
import MultiFileUpload from '../FormInputs/MultiFileUpload';
import { updateDoctorProfileById } from '@/actions/onboarding';
import { usePathname, useRouter } from 'next/navigation';
import { DoctorProfile } from '@prisma/client';
import toast from 'react-hot-toast';
import { useOnBoardingContext } from '@/context/context';


const EducationInfoForm = ({
    page, 
    title, 
    description,
    nextPage,
    formId,
    userId,
    specialties,
    doctorProfile,
}: StepFormProps) => {

    const router = useRouter();

    const { 
        trackingNumber, 
        doctorProfileId,
        resumeEducationData, 
        setResumeEducationData,
        resumingDoctorData, 
    } = useOnBoardingContext();

    const pathname = usePathname();

    console.log("Form ID:", formId);

    const [educationData, setEducationData] = React.useState<EducationInfoFormProps>({
        medicalSchool: doctorProfile.medicalSchool || resumingDoctorData.medicalSchool || "",
        graduationYear: doctorProfile.graduationYear || resumingDoctorData.graduationYear || "",
        primarySpecialization: doctorProfile.primarySpecialization || resumingDoctorData.primarySpecialization || "",
        otherSpecialties: doctorProfile.otherSpecialties || resumingDoctorData.otherSpecialties || [],
        boardCertificates: doctorProfile.boardCertificates || resumingDoctorData.boardCertificates || [],
        page: doctorProfile.page || resumingDoctorData.page || "",
    });

    const [errors, setErrors] = React.useState<Partial<EducationInfoFormProps>>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
    const [register, setRegister] = React.useState<boolean>(false);
    const [multiple, setMultiple] = React.useState<boolean>(false);

    const initialAddMoreSpecialties = educationData.otherSpecialties.length > 0 
    ? educationData.otherSpecialties 
    : resumingDoctorData.otherSpecialties ?? [];
    const [addMoreSpecialties, setAddMoreSpecialties] = React.useState<string[]>(initialAddMoreSpecialties);

    // const initialBoardCertificates: any = educationData.boardCertificates.length > 0 
    // ? educationData.boardCertificates 
    // : resumingDoctorData.boardCertificates || [];

    const initialBoardCertificates = doctorProfile.boardCertificates.map((item) => {
        return {
            formatToBytes: () => item,
            title: item,
            size: 0,
            url: item,
        }
    })

    const [docs, setDocs] = React.useState<FileProps[]>(initialBoardCertificates);

    const allSpecialties = specialties?.map((item) => {
        return {
            label: item.title,
            value: item.title,
        }
    }) || [];
    //const {register, handleSubmit, reset, formState: {errors},} = useForm<EducationInfoFormProps>()

    // const selectOptions: SelectOptionProps[] = [
    //     { value: 'medicine', label: 'Medicine' },
    //     { value: 'massage', label: 'Massage' },
    // ]

  const transformedErrors: Record<string, string[]> = 
  Object.entries(errors).reduce((acc, [key, value]) => {
    acc[key] = Array.isArray(value) ? value.map(String) : [String(value)];
    return acc;
  }, {} as Record<string, string[]>)


    educationData.page = page
    educationData.otherSpecialties = addMoreSpecialties
    educationData.boardCertificates = docs.map((doc: FileProps) => (doc.url))

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        if (validate(educationData)) {

            setIsLoading(true)
            console.log("New Education Data:", educationData, formId);
            
            
            try {
                const res = await updateDoctorProfileById(doctorProfile.id, educationData);
                setResumeEducationData(educationData)

                if (res?.status === 201) {
                    toast.success("Education Info Updated Successfully!");
                    //Extract the profile form data from the updated profile
                    router.push(`${pathname}?page=${nextPage}`)
                    console.log("Updated New Education Data Passed:", res.data);
                }
                
            } catch (error) {
                console.log("Updating New Education data failed:", error);
                
            } finally {
                setIsLoading(false)
                setIsSubmitted(true)
            }

        } else {
            console.log("New Education Data:", educationData);
        }

    }

    const validate = (educationData: Partial<DoctorProfile>) => {
        const newErrors: Partial<EducationInfoFormProps> = {};

        if (!educationData.medicalSchool) newErrors.medicalSchool = "Medical School is required.";
        
        if (!educationData.graduationYear) newErrors.graduationYear = "Graduation year is required.";

        if (!educationData.primarySpecialization) newErrors.primarySpecialization = "Primary specialization is required.";

        if (!educationData.boardCertificates || educationData.boardCertificates.length === 0) newErrors.boardCertificates = ["board certificate is required."]; 

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; 
    }

    const arrayFields = ["otherSpecialties", "boardCertificates"]
    const numericFields = ["graduationYear"]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
        const { name, value } = e.target
        setEducationData((prev) => ({ 
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
                    <TextInput
                        label="Medical School"
                        register={register}
                        name="medicalSchool"
                        placeholder="Enter your Grad School Name"
                        type="text"
                        value={educationData.medicalSchool}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <TextInput
                        label="Graduation Year"
                        register={register}
                        name="graduationYear"
                        placeholder="Enter your Grad Year"
                        type="number"
                        className='col-span-full sm:col-span-1'
                        value={educationData.graduationYear}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <SelectInput 
                        label="Select Your Primary Specializations" 
                        name="primarySpecialization"
                        placeholder='Select Your Primary Specializations' 
                        multiple={multiple} 
                        className="col-span-full sm:col-span-1" 
                        options={allSpecialties}
                        value={educationData.primarySpecialization}
                        onChange={handleChange}
                        errors={transformedErrors} />
                    <ArrayInput 
                      setItems={setAddMoreSpecialties} 
                      items={addMoreSpecialties} 
                      itemTitle="Other Specialties" /> 
                    <MultiFileUpload
                        label='Upload your academic documents (Max of 4 Docs)'
                        name="boardCertificates"
                        files={docs}
                        setFiles={setDocs}
                        errors={transformedErrors}
                        endpoint='doctorProfessionDocs'
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

export default EducationInfoForm