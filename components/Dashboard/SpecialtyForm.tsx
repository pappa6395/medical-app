"use client"

import { cn } from '@/lib/utils'
import React from 'react'
import TextInput from '../FormInputs/TextInput';
import SubmitButton from '../FormInputs/SubmitButton';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import Link from 'next/link';
import { X } from 'lucide-react';
import generateSlug from '@/utils/generateSlug';
import { SpecialtyFormProps } from '@/utils/types';
import { createManySpecialties, createSpecialty, updateSpecialty } from '@/actions/specialties';
import { Speciality } from '@prisma/client';

const SpecialtyForm = ({title, initialData }: {title: string; initialData?: Partial<Speciality>}) => {

    const router = useRouter()

    const editingId = initialData?.id
    console.log("EditingId:", editingId);
    
    const [specialtyData, setSpecialtyData] = React.useState<SpecialtyFormProps>({
        title: initialData?.title ?? "",
        slug: initialData?.slug ?? "",
    });
   
    const [errors, setErrors] = React.useState<Partial<SpecialtyFormProps>>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
    const [register, setRegister] = React.useState<boolean>(false);


    
  const transformedErrors: Record<string, string[]> = 
  Object.entries(errors).reduce((acc, [key, value]) => {
    acc[key] = Array.isArray(value) ? value.map(String) : [String(value)];
    return acc;
  }, {} as Record<string, string[]>)


  
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setIsSubmitted(true);
        const slug = generateSlug(specialtyData.title)
        specialtyData.slug = slug
        console.log(specialtyData);

        try {
            if (editingId) {
                const updatedSpecialty = await updateSpecialty(editingId, specialtyData)
                console.log("New Specialty:", updatedSpecialty);

                if (updatedSpecialty?.status === 201) {
                    toast.success("Specialty updated successfully!");
                    router.push(`/dashboard/specialties`)
                }
            } else {
                const newSpecialty = await createSpecialty(specialtyData)
                console.log("New Specialty:", newSpecialty);

                if (newSpecialty?.status === 201) {
                    toast.success("Specialty created successfully!");
                    router.push(`/dashboard/specialties`)
                }
            }
            

        } catch (error) {
            console.error("Error creating new specialty:", error);
            toast.error("Failed to create new specialty");

        } finally {
            resetForm();
        }
    };

    const handleCreateMany = async () => {

        setIsLoading(true);

        try {
            await createManySpecialties()

        } catch (error) {
            console.error("Error creating many specialties:", error);
            toast.error("Failed to create many specialties");

        } finally {
            resetForm()
        }
    }

    const validate = () => {
        const newErrors = {};

       

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; 
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSpecialtyData((prev) => ({...prev, [name]: value}))

    }

    const resetForm = () => {
        setSpecialtyData({
            title: "",
            slug: "",
        });
        setErrors({});
        setRegister(false);
        setIsLoading(false);
        setIsSubmitted(false);
    }



  return (

    <div className="w-full max-w-xl mx-auto shadow-sm rounded-md m-3 border border-gray-200">
        <div className="flex item-center justify-between px-6 border-b border-gray-200 py-4">
            <h1 className="scroll-m-20 text-3xl 
            font-semibold tracking-wide first:mt-0 mb-2">
                {title}
            </h1>
            <Button asChild variant={"outline"}>
                <Link href="/dashboard/services">
                    <X className='w-4 h-4' />
                </Link>
            </Button>
        </div>
        <div className={cn("grid gap-6 py-4 mx-auto px-6")}>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <TextInput
                        label="Specialty Title"
                        register={register}
                        name="title"
                        placeholder="Enter specialty title"
                        type="text"
                        value={specialtyData.title}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />     
                </div>
                <div className='mt-8 flex justify-between items-center gap-4'>
                    <Button asChild variant={"outline"}>
                        <Link href="/dashboard/specialties">
                            Cancel
                        </Link>
                    </Button>
                    {/* <Button onClick={handleCreateMany} asChild variant={"outline"}>
                        <Link href="/dashboard/specialties">
                            Create Many Services
                        </Link>
                    </Button> */}
                    <SubmitButton 
                        title={editingId ? "Update Specialty" : "Create Specialty"}
                        isLoading={isLoading} 
                        loadingTitle={editingId ? "Updating..." : "Creating Specialty..."} />
                </div>
            </form>
        </div>
    </div>
  )
}

export default SpecialtyForm