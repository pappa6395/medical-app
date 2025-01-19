"use client"

import { updateUserProfileById } from '@/actions/users'
import SelectInput from '@/components/FormInputs/SelectInput'
import SubmitButton from '@/components/FormInputs/SubmitButton'
import TextInput from '@/components/FormInputs/TextInput'
import { AdminProps } from '@/utils/types'
import { User } from '@prisma/client'
import React from 'react'
import toast from 'react-hot-toast'


interface SelectOptionsProps {
    label: string,
    value: string,
}

const AdminProfilePanel = ({ 
    initialProfile, 
}: {
    initialProfile: User | undefined | null
    editingId?: string
}) => {


    const [isLoading, setIsLoading] = React.useState(false)
    const [profileData, setProfileData] = React.useState<AdminProps>({
        name: initialProfile?.name || "",
        email: initialProfile?.email || "",
        role: initialProfile?.role || "ADMIN", 
        phone: initialProfile?.phone || "",

    })
    
    const [errors, setErrors] = React.useState<Partial<AdminProps>>({})


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target
        setProfileData({...profileData, [name]: value })
    }

    const selectOptions: SelectOptionsProps[] = [
        {
            label: "Admin",
            value: "ADMIN",
        },
        {
            label: "User",
            value: "USER",
        },
        {
            label: "Doctor",
            value: "DOCTOR",
        },
    ]

    const validate = () => {
        const newErrors: Partial<AdminProps> = {};

        if (!profileData.name) newErrors.name = "Name is required"

        if (!profileData.email) newErrors.email = "Email is required"

        if (!profileData.phone) newErrors.phone = "Phone is required"

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; 
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(profileData);
        setIsLoading(true)

        if (validate()) {
            try {
                const res = await updateUserProfileById(initialProfile?.id , profileData)
                const updatedProfile = res?.data
                console.log("Updated porfile successfully:", updatedProfile);
                if (res?.status === 201) {
                    toast.success("Appointment Updated Successfully!");
                }
                setTimeout(() => {
                    window.location.reload();
                }, 500);
    
            } catch (error) {
                console.log("Failed update user profile:", error);  
            } finally {
                setIsLoading(false);
                resetForm();
            }
        }

        
    }

    const resetForm = () => {
        setProfileData({
            name: initialProfile?.name || "",
            email: initialProfile?.email || "",
            role: initialProfile?.role || undefined, 
            phone: initialProfile?.phone || "",
        })
    }

    const transformedErrors: Record<string, string[]> = 
    Object.entries(errors).reduce((acc, [key, value]) => {
        acc[key] = Array.isArray(value) ? value.map(String) : [String(value)];
        return acc;
    }, {} as Record<string, string[]>)

  return (

    <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
        <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>
        <form onSubmit={handleSubmit}>
            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <div className="mt-2">
                    <TextInput
                        label="Full Name"
                        name="name"
                        placeholder="Enter your Full name"
                        type="text"
                        value={profileData.name}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange}
                        className='col-span-full sm:col-span-1'
                    />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <div className="">
                        <TextInput
                            label="Email Address"
                            name="email"
                            placeholder="Enter your email address"
                            type="email"
                            value={profileData.email}
                            errors={transformedErrors}
                            disabled={isLoading}
                            onChange={handleChange} 
                            className='col-span-full sm:col-span-1'
                        />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <div className="">
                        <TextInput
                            label="Phone No."
                            name="phone"
                            placeholder="Enter your phone no."
                            type="tel"
                            value={profileData.phone}
                            errors={transformedErrors}
                            disabled={isLoading}
                            onChange={handleChange} 
                            className='col-span-full sm:col-span-1'
                        />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <div className="">
                        <SelectInput 
                            label="User Role"
                            name="role"
                            placeholder='Select your role'
                            options={selectOptions}
                            value={profileData.role}
                            errors={transformedErrors}
                            onChange={handleChange}
                            className=''
                        />
                    </div>
                </div>
            </div>
            <div className='m-8 flex justify-center items-center '>
                <SubmitButton 
                    title="Update Profile"
                    isLoading={isLoading} 
                    loadingTitle={"updating a profile..."} 
                />
            </div>
        </form>
        
    </div>

  )
}

export default AdminProfilePanel