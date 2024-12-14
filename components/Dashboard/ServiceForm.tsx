"use client"

import { cn } from '@/lib/utils'
import React from 'react'
import TextInput from '../FormInputs/TextInput';
import SubmitButton from '../FormInputs/SubmitButton';
import ImageInput from '../FormInputs/ImageInput';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import Link from 'next/link';
import { X } from 'lucide-react';
import generateSlug from '@/utils/generateSlug';
import { ServiceFormProps } from '@/utils/types';
import { createManyServices, createService, updateService } from '@/actions/services';
import { Service } from '@prisma/client';

const ServiceForm = ({title, initialData}: {title: string, initialData?: Partial<Service>}) => {

    console.log("Initial data:", initialData);
    
    const router = useRouter()

    const editingId = initialData?.id

    const [serviceData, setServiceData] = React.useState<ServiceFormProps>({
        title: initialData?.title ?? "",
        imageUrl: initialData?.imageUrl ?? "",
        slug: initialData?.slug ?? "",
    });
   
    const [errors, setErrors] = React.useState<Partial<ServiceFormProps>>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
    const [register, setRegister] = React.useState<boolean>(false);

    const initialImageUrl = initialData?.imageUrl || "";
    const [serviceImageUrl, setServiceImageUrl] = React.useState(initialImageUrl);
    
    
  const transformedErrors: Record<string, string[]> = 
  Object.entries(errors).reduce((acc, [key, value]) => {
    acc[key] = Array.isArray(value) ? value.map(String) : [String(value)];
    return acc;
  }, {} as Record<string, string[]>)


  
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setIsSubmitted(true);
        const slug = generateSlug(serviceData.title)
        serviceData.slug = slug
        serviceData.imageUrl = serviceImageUrl
        console.log(serviceData);

        try {
            if (editingId) {
                const updatedService = await updateService(editingId, serviceData)
                console.log("Update Service:", updatedService);

                if (updatedService?.status === 201) {
                    toast.success("Service updated successfully!");
                    router.push(`/dashboard/services`)
                }

            } else {
                const newService = await createService(serviceData)
                console.log("New Service:", newService);

                if (newService?.status === 201) {
                    toast.success("Service created successfully!");
                    router.push(`/dashboard/services`)
                }
            }

        } catch (error) {
            console.error("Error creating new service:", error);
            toast.error("Failed to create new service");

        } finally {
            resetForm();
        }
    };

    // const handleCreateMany = async () => {

    //     setIsLoading(true);

    //     try {
    //         await createManyServices()

    //     } catch (error) {
    //         console.error("Error creating many services:", error);
    //         toast.error("Failed to create many services");

    //     } finally {
    //         resetForm()
    //     }
    // }

    const validate = () => {
        const newErrors = {};

       

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; 
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setServiceData((prev) => ({...prev, [name]: value}))

    }

    const resetForm = () => {
        setServiceData({
            title: "",
            imageUrl: "",
            slug: "",
        });
        setErrors({});
        setRegister(false);
        setServiceImageUrl("");
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
                        label="Service Title"
                        register={register}
                        name="title"
                        placeholder="Enter service title"
                        type="text"
                        value={serviceData.title}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <ImageInput 
                        label="Service Image"
                        imageUrl={serviceImageUrl}
                        setImageUrl={setServiceImageUrl}
                        endpoint="serviceImage"/>      
                </div>
                <div className='mt-8 flex justify-between items-center gap-4'>
                    <Button asChild variant={"outline"}>
                        <Link href="/dashboard/services">
                            Cancel
                        </Link>
                    </Button>
                    {/* <Button onClick={handleCreateMany} asChild variant={"outline"}>
                        <Link href="/dashboard/services">
                            Create Many Services
                        </Link>
                    </Button> */}
                    <SubmitButton 
                        title={editingId ? "Update Service" : "Create Service"}
                        isLoading={isLoading} 
                        loadingTitle={editingId ? "Updating..." : "Creating Service..."} />
                </div>
            </form>
        </div>
    </div>
  )
}

export default ServiceForm