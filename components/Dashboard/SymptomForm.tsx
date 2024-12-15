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
import { SymptomFormProps } from '@/utils/types';
import { createManySymptoms, createSymptom, updateSymptom } from '@/actions/symptoms';
import { Symptom } from '@prisma/client';

const SymptomForm = ({title, initialData}: {title: string; initialData?: Partial<Symptom>}) => {

    const router = useRouter()

    const editingId = initialData?.id
    const [symptomData, setSymptomData] = React.useState<SymptomFormProps>({
        title: initialData?.title ?? "",
        slug: initialData?.slug ?? "",
    });
   
    const [errors, setErrors] = React.useState<Partial<SymptomFormProps>>({});
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
        const slug = generateSlug(symptomData.title)
        symptomData.slug = slug
        console.log(symptomData);

        try {
            if (editingId) {
                const updatedSymptom = await updateSymptom(editingId, symptomData)
                console.log("Update Symptom:", updatedSymptom);

                if (updatedSymptom?.status === 201) {
                    toast.success("Symptom updated successfully!");
                    router.push(`/dashboard/symptoms`)
                }
            } else {
                const newSymptom = await createSymptom(symptomData)
                console.log("New Symptom:", newSymptom);

                if (newSymptom?.status === 201) {
                    toast.success("Symptom created successfully!");
                    router.push(`/dashboard/symptoms`)
                }
            }
            
        } catch (error) {
            console.error("Error creating New Symptom:", error);
            toast.error("Failed to create New Symptom");

        } finally {
            resetForm();
        }
    };

    const handleCreateMany = async () => {

        setIsLoading(true);

        try {
            await createManySymptoms()

        } catch (error) {
            console.error("Error creating many symptoms:", error);
            toast.error("Failed to create many symptoms");

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
        setSymptomData((prev) => ({...prev, [name]: value}))

    }

    const resetForm = () => {
        setSymptomData({
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
                <Link href="/dashboard/symptoms">
                    <X className='w-4 h-4' />
                </Link>
            </Button>
        </div>
        <div className={cn("grid gap-6 py-4 mx-auto px-6")}>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <TextInput
                        label="Symptom Title"
                        register={register}
                        name="title"
                        placeholder="Enter Symptom title"
                        type="text"
                        value={symptomData.title}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />     
                </div>
                <div className='mt-8 flex justify-between items-center gap-4'>
                    <Button asChild variant={"outline"}>
                        <Link href="/dashboard/symptoms">
                            Cancel
                        </Link>
                    </Button>
                    {/* <Button onClick={handleCreateMany} asChild variant={"outline"}>
                        <Link href="/dashboard/symptoms">
                            Create Many Services
                        </Link>
                    </Button> */}
                    <SubmitButton 
                        title={editingId ? "Update Symptom" : "Create Symptom"}
                        isLoading={isLoading} 
                        loadingTitle={editingId ? "Updating..." : "Creating Symptom..."} />
                </div>
            </form>
        </div>
    </div>
  )
}

export default SymptomForm