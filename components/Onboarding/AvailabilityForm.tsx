"use client"

import { cn } from '@/lib/utils'
import React from 'react'
import TextInput from '../FormInputs/TextInput';
import SubmitButton from '../FormInputs/SubmitButton';
import RadioInput from '../FormInputs/RadioInput';
import { AvailabilityInfoFormProps, StepFormProps } from '@/utils/types';
import ArrayInput from '../FormInputs/ArrayInput';
import ShadSelectInput from '../FormInputs/ShadSelectInput';
import TextAreaInput from '../FormInputs/TextAreaInput';
import MultiFileUpload, { FileProps } from '../FormInputs/MultiFileUpload';
import { useRouter } from 'next/navigation';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectTriggerTime, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';


const AvailabilityInfoForm = ({
    page, 
    title, 
    description
}: StepFormProps) => {

    const router = useRouter()

    const [availabilityData, setAvailabilityData] = React.useState<AvailabilityInfoFormProps>({
        meetingDuration: "",
        meetingAvailability: "",
        page: "Availability Information",
    });

    const [errors, setErrors] = React.useState<Partial<AvailabilityInfoFormProps>>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
    const [register, setRegister] = React.useState<boolean>(false);


    const availabilityOptions = [
        { 
            value: 'weekly', 
            label: 'Weekly',
            description: "Your're available one or more times during the week , every week",
        },
        { 
            value: 'specific', 
            label: 'Specific Dates',
            description: "Your're available one or more times at specific times or dates",    
        },
    ]

  const transformedErrors: Record<string, string[]> = 
  Object.entries(errors).reduce((acc, [key, value]) => {
    acc[key] = Array.isArray(value) ? value.map(String) : [String(value)];
    return acc;
  }, {} as Record<string, string[]>)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        availabilityData.page = page;

        if (validate()) {

        } else {
            console.log("Availability Data:", availabilityData);
        }

    }

    const validate = () => {
        const newErrors: Partial<AvailabilityInfoFormProps> = {};
        
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; 
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const { name, value } = e.target
        setAvailabilityData((prev) => ({ ...prev, [name]:value}));
        
    }

    const resetAvailabilityData = () => {
        setAvailabilityData(
            {
                meetingDuration: "",
                meetingAvailability: "",
                page: "Availability Information",
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
                        label="What is the Duration of your Meetings?"
                        register={register}
                        name="meetingDuration"
                        placeholder="e.g. 15 minutes"
                        type="text"
                        className='col-span-full sm:col-span-1'
                        value={availabilityData.meetingDuration}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                     <RadioInput
                        title="When are you available for this booking?" 
                        name="availabilityType"
                        options={availabilityOptions}
                        register={register}
                        errors={transformedErrors}
                        onChange={handleChange}
                    />   
                    <div className="col-span-full">
                        <Label className='text-slate-700 dark:text-slate-200'>Define your weekly availability below:</Label>
                        <div className='border py-6 px-4 gap-2 border-gray-200 
                        flex items-center justify-between'>
                            {/* Checkbox}*/}
                            <div className='flex items-center space-x-2 mr-2'>
                                <Checkbox id="day" />
                                <label
                                    htmlFor="day"
                                    className="text-sm font-medium leading-none 
                                    peer-disabled:cursor-not-allowed 
                                    peer-disabled:opacity-70"
                                >
                                    Monday
                                </label>
                            </div>
                            {/* From Time */}
                            <div className="">
                                <div className="grid grid-cols-3 gap-1">
                                    <Select>
                                    <SelectTriggerTime 
                                        id="hour" 
                                        className='bg-white dark:bg-slate-700'
                                        
                                        >
                                        <SelectValue placeholder="00" />
                                    </SelectTriggerTime>
                                    <SelectContent>
                                        {Array.from({ length: 12 }, (_, i) => (
                                        <SelectItem 
                                            key={i} 
                                            value={`${(i+1).toString().padStart(2,"0")}`}
                                            className=''
                                        >
                                            {(i+1).toString().padStart(2,"0")}
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                    <Select>
                                    <SelectTriggerTime id="minute" className='bg-white dark:bg-slate-700'>
                                        <SelectValue placeholder="00" />
                                    </SelectTriggerTime>
                                    <SelectContent>
                                        {Array.from({ length: 4 }, (_, i) => (
                                        <SelectItem 
                                            key={i} 
                                            value={`${(i * 15).toString().padStart(2,"0")}`}>
                                            {(i * 15).toString().padStart(2,"0")}
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                    <Select>
                                    <SelectTriggerTime id="AM" className='bg-white dark:bg-slate-700'>
                                        <SelectValue placeholder="AM" />
                                    </SelectTriggerTime>
                                    <SelectContent>
                                        <SelectItem value='am'>AM</SelectItem>
                                        <SelectItem value='pm'>PM</SelectItem>
                                    </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            {/* To Time */}
                            <div className="">
                                <div className="grid grid-cols-3 gap-1">
                                    <Select>
                                    <SelectTriggerTime 
                                        id="hour" 
                                        className='bg-white dark:bg-slate-700'
                                        
                                        >
                                        <SelectValue placeholder="00" />
                                    </SelectTriggerTime>
                                    <SelectContent>
                                        {Array.from({ length: 12 }, (_, i) => (
                                        <SelectItem 
                                            key={i} 
                                            value={`${(i+1).toString().padStart(2,"0")}`}
                                            className=''
                                        >
                                            {(i+1).toString().padStart(2,"0")}
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                    <Select>
                                    <SelectTriggerTime id="minute" className='bg-white dark:bg-slate-700'>
                                        <SelectValue placeholder="00" />
                                    </SelectTriggerTime>
                                    <SelectContent>
                                        {Array.from({ length: 4 }, (_, i) => (
                                        <SelectItem 
                                            key={i} 
                                            value={`${(i * 15).toString().padStart(2,"0")}`}>
                                            {(i * 15).toString().padStart(2,"0")}
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                    <Select>
                                    <SelectTriggerTime id="AM" className='bg-white dark:bg-slate-700'>
                                        <SelectValue placeholder="AM" />
                                    </SelectTriggerTime>
                                    <SelectContent>
                                        <SelectItem value='am'>AM</SelectItem>
                                        <SelectItem value='pm'>PM</SelectItem>
                                    </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            {/* Add window */}
                            <div className='ml-2'>
                                <Button variant={"ghost"}>
                                    <Plus className='w-6 h-6 flex-shrink-0'/> Add Window
                                </Button>
                            </div>
                        </div>
                    </div>
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

export default AvailabilityInfoForm