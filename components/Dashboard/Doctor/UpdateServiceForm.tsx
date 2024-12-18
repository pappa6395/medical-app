"use client"

import { updateDoctorProfileById } from '@/actions/onboarding'
import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DoctorProfile, Service, Speciality, Symptom } from '@prisma/client'
import React from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Map, PictureInPicture2, Video } from 'lucide-react'

const UpdateServiceForm = ({
    services, 
    specialties, 
    symptoms,
    profile,
}: {
    services: Service[] | undefined | null;
    specialties: Speciality[] | undefined | null;
    symptoms: Symptom[] | undefined | null;
    profile: DoctorProfile | undefined | null;
}) => {

    console.log("profile:", profile?.id);
    const profileId = profile?.id
    const initialPrice = profile?.hourlyWage

    const [selectedServiceId, setSelectedServiceId] = React.useState<string>(profile?.serviceId ?? "");
    const [selectedSpecialtyId, setSelectedSpecialtyId] = React.useState<string>(profile?.specialityId ?? "");
    const [selectedSymptomId, setSelectedSymptomId] = React.useState<string[]>(profile?.symptomId || []);
    const [selectedOperation, setSelectedOperation] = React.useState<string>(profile?.operationMode || "");
    const [selectedPrice, setSelectedPrice] = React.useState<number>(initialPrice ?? 0);
    
    const [isServiceLoading, setIsServiceLoading] = React.useState(false);
    const [isSpecialtyLoading, setIsSpecialtyLoading] = React.useState(false);
    const [isSymptomLoading, setIsSymptomLoading] = React.useState(false);
    const [isOperationLoading, setIsOperationLoading] = React.useState(false);
    const [isPriceLoading, setIsPriceLoading] = React.useState(false);

    console.log("Price:",selectedPrice);
    

    const operationModes = [
        { label: "Telehealth", slug: "telehealth",icon: Video },
        { label: "In-person doctor visit", slug: "in-person-doctor-visit", icon: Map},
        { label: "Both Telehealth and In-person doctor visit", slug: "both-telehealth-and-in-person-doctor-visit", icon: PictureInPicture2},
    ]

    const handleUpdateService = async () => {

        const serviceProviding = {
            serviceId: selectedServiceId ?? "",
        }
        setIsServiceLoading(true);
        console.log("Service Providing:",serviceProviding);
        
        try {
            await updateDoctorProfileById(profileId, serviceProviding )
            toast.success("Updating Service successfully");

        } catch (error) {
            console.error("Error updating service providing:", error);
            
        } finally {
            setIsServiceLoading(false);

        };
        
    }
    const handleUpdateSpecialty = async () => {

        const specialtyProviding = {
            specialityId: selectedSpecialtyId ?? "",
        }
        setIsSpecialtyLoading(true);
        console.log("Specialty Providing:",specialtyProviding);
        
        try {
            await updateDoctorProfileById(profileId, specialtyProviding )
            toast.success("Updating specialty successfully");

        } catch (error) {
            console.error("Error updating specialty providing:", error);
            
        } finally {
            setIsSpecialtyLoading(false);

        };
        
    }
    const handleUpdateSymptom = async () => {

        const symptomProviding = {
            symptomId: selectedSymptomId ?? [],
        }
        setIsSymptomLoading(true);
        console.log("Symptom Providing:",symptomProviding);
        
        try {
            await updateDoctorProfileById(profileId, symptomProviding )
            toast.success("Updating symptom successfully");

        } catch (error) {
            console.error("Error updating symptom providing:", error);
            
        } finally {
            setIsSymptomLoading(false);

        };
        
    }
    const handleUpdateOperationMode = async () => {

        const operationModeProviding = {
            operationMode: selectedOperation ?? "",
        }
        setIsOperationLoading(true);
        console.log("Symptom Providing:",operationModeProviding);
        
        try {
            await updateDoctorProfileById(profileId, operationModeProviding )
            toast.success("Updating symptom successfully");

        } catch (error) {
            console.error("Error updating symptom providing:", error);
            
        } finally {
            setIsOperationLoading(false);

        };
        
    }
    const handleUpdatePrice = async () => {

        const priceProviding = {
            hourlyWage: selectedPrice ?? "",
        }
        setIsPriceLoading(true);
        console.log("Price Providing:",priceProviding);
        
        try {
            await updateDoctorProfileById(profileId, priceProviding )
            toast.success("Updating Price successfully");

        } catch (error) {
            console.error("Error updating Price providing:", error);
            
        } finally {
            setIsPriceLoading(false);

        };
        
    }


  return (
    <div className=''>
        <CardContent className='space-y-3 border-none shadow-none'>
            {/* Add hourly wage */}
                <div className='border shadow rounded-md p-4'>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Price per Hour</CardTitle>
                            <CardDescription className='scroll-m-20 text-lg 
                            font-semibold tracking-tight py-2'>
                                Choose your hourly price you want to charge
                            </CardDescription>
                        </div>
                        <Button
                            disabled={isOperationLoading} 
                            variant={"outline"} 
                            type="submit" 
                            onClick={handleUpdatePrice}
                            className='dark:border-slate-400'
                        >
                            {isPriceLoading ? 'Saving...' : "Update Price"}
                        </Button>
                    </div>
                    <div className="flex mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 
                            ring-inset ring-gray-300 focus-within:ring-2
                            focus-within:ring-inset focus-within:ring-indigo-600 
                            sm:max-w-md"
                            >
                                <span className="flex select-none items-center px-2 
                                text-gray-500 dark:text-slate-50 sm:text-sm"
                                >$
                                </span>
                                <input
                                    id="hourlyWage"
                                    name="hourlyWage"
                                    type="number"
                                    placeholder="100"
                                    onChange={(e) => setSelectedPrice(+e.target.value)}
                                    className="block flex-1 border-0 bg-transparent
                                    dark:text-slate-50
                                    grow py-1.5 pl-1 pr-3 text-base text-gray-900 
                                    placeholder:text-gray-400 focus:ring-transparent 
                                    sm:text-sm/6 sm:leading-6"
                                />
                            </div>
                        </div>    
                </div> 
            <div className='border shadow rounded-md p-4 mt-4'>
                {/* Opertion Modes */}
                <div className='flex justify-between items-center'>
                    <div>
                        <CardTitle>Operation Modes</CardTitle>
                        <CardDescription className='scroll-m-20 text-lg 
                        font-semibold tracking-tight py-2'>
                            Choose your operation mode you want to offer
                        </CardDescription>
                    </div>
                    <Button 
                        disabled={isOperationLoading} 
                        variant={"outline"} 
                        type="submit" 
                        onClick={handleUpdateOperationMode}
                        className='dark:border-slate-400'
                    >
                        {isServiceLoading ? 'Saving...' : "Update Operation mode"}
                    </Button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {
                        operationModes?.map((operation,i) => {
                            const Icon = operation.icon;
                            return (
                                <button 
                                    onClick={() => setSelectedOperation(operation.label)} 
                                    key={i} 
                                    className={cn(
                                        'border flex items-center justify-center flex-col dark:bg-blue-950 py-2 px-3 rounded-md cursor-pointer',
                                        selectedOperation === operation.label
                                        ? "border-2 border-sky-500 bg-slate-50" : "")}>
                                    <Icon
                                        className='w-14 h-14' 
                                    />
                                    <p className='text-xs'>{operation.label}</p>
                                </button>
                            )
                        })
                    }
                </div>
            </div>
            <div className='border shadow rounded-md p-4 mt-4'>
                <div className='flex justify-between items-center'>
                    <div>
                        <CardTitle>Services</CardTitle>
                        <CardDescription className='scroll-m-20 text-lg 
                        font-semibold tracking-tight py-2'>
                            Choose your service you want to offer
                        </CardDescription>
                    </div>
                        <Button 
                            disabled={isServiceLoading} 
                            variant={"outline"} 
                            type="submit" 
                            onClick={handleUpdateService}
                            className='dark:border-slate-400'
                        >
                            {isServiceLoading ? 'Saving...' : "Update Service"}
                        </Button>
                    </div>
                <div className="grid grid-cols-4 gap-2">
                    {
                        services?.map((service,i) => {
                            return (
                                <button 
                                    onClick={() => setSelectedServiceId(service.id)} 
                                    key={i} 
                                    className={cn(
                                        'border flex items-center justify-center flex-col dark:bg-blue-950 py-2 px-3 rounded-md cursor-pointer',
                                        selectedServiceId === service.id 
                                        ? "border-2 border-sky-500 bg-slate-50" : "")}>
                                    <Image 
                                        src={service.imageUrl} 
                                        alt={service.title}
                                        width={100}
                                        height={100}
                                        className='w-14 h-14' 
                                    />
                                    <p className='text-xs'>{service.title}</p>
                                </button>
                            )
                        })
                    }
                </div>
            </div>
            <div className='border shadow rounded-md p-4'>
                <div className='flex justify-between items-center'>
                    <div>
                        <CardTitle>Specialties</CardTitle>
                        <CardDescription className='scroll-m-20 text-lg 
                        font-semibold tracking-tight py-2'>
                            Choose your specialty you want to offer
                        </CardDescription>
                    </div>
                    <Button 
                        disabled={isSpecialtyLoading} 
                        variant={"outline"} 
                        type="submit" 
                        onClick={handleUpdateSpecialty}
                        className='dark:border-slate-400'
                    >
                        {isSpecialtyLoading ? 'Saving...' : "Update Specialty"}
                    </Button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {
                        specialties?.map((specialty,i) => {
                            return (
                                <button 
                                    onClick={() => setSelectedSpecialtyId(specialty.id)}
                                    key={i} 
                                    className={cn(
                                        'border flex items-center justify-center flex-col dark:bg-blue-950  py-2 px-3 rounded-md cursor-pointer',
                                        selectedSpecialtyId === specialty.id 
                                        ? "border-2 border-sky-500 bg-slate-50" : "")}>
                                    <p className='text-xs'>{specialty.title}</p>
                                </button>
                            )
                        })
                    }
                </div>
            </div>
            <div className='border shadow rounded-md p-4'>
                <div className='flex justify-between items-center'>
                    <div>
                        <CardTitle>Symptoms</CardTitle>
                        <CardDescription className='scroll-m-20 text-lg 
                        font-semibold tracking-tight py-2'>
                            Choose your symptom you want to offer
                        </CardDescription>
                    </div>
                    <Button 
                        disabled={isSymptomLoading} 
                        variant={"outline"} 
                        type="submit" 
                        onClick={handleUpdateSymptom}
                        className='dark:border-slate-400'
                    >
                        {isSymptomLoading ? 'Saving...' : "Update Symptom"}
                    </Button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {
                        symptoms?.map((symptom,i) => {
                            const isSelected = selectedSymptomId.includes(symptom.id);
                            return (
                                <button
                                    onClick={() => {
                                        if (isSelected) {
                                            setSelectedSymptomId(selectedSymptomId.filter(id => id!== symptom.id));
                                        } else {
                                            setSelectedSymptomId([...selectedSymptomId, symptom.id])
                                        }
                                    }}
                                    key={i} 
                                    className={cn(
                                        'border flex items-center justify-center flex-col dark:bg-blue-950 py-2 px-3 rounded-md cursor-pointer',
                                        selectedSymptomId.includes(symptom.id) 
                                        ? "border-2 border-sky-500 bg-slate-50" : "" )}>
                                    <p className='text-xs'>{symptom.title}</p>
                                </button>
                            )
                        })
                    }
                </div>
            </div>
        </CardContent>
    </div>

  )
}

export default UpdateServiceForm