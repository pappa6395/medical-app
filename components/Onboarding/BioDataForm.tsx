import { cn } from '@/lib/utils'
import { RegisterInputProps } from '@/utils/types';
import React from 'react'
import TextInput from '../FormInputs/TextInput';
import SubmitButton from '../FormInputs/SubmitButton';

const BioDataForm = () => {

    const [formData, setFormData] = React.useState<RegisterInputProps>({
        fullName: "",
        email: "",
        phone: "",
        password: "",
    });
    const [errors, setErrors] = React.useState<Partial<RegisterInputProps>>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const transformedErrors: Record<string, string[]> = 
  Object.entries(errors).reduce((acc, [key, value]) => {
    acc[key] = Array.isArray(value) ? value : [value];
    return acc;
  }, {} as Record<string, string[]>)

    const handleSubmit = () => {

    }
    const handleChange = () => {
        
    }

  return (

    <div className="w-full">
        <div className="text-center border-b border-gray-200 pb-4">
            <h1 className="scroll-m-20 border-b pb-2 text-3xl 
            font-semibold tracking-tight first:mt-0 mb-2">
                Bio Data
            </h1>
            <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
            </p>
        </div>
        <div className={cn("grid gap-6 py-4 mx-auto px-12")}>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <TextInput
                        label="Full Name"
                        name="fullName"
                        placeholder="e.g. John Doh"
                        type="text"
                        value={formData.fullName}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <TextInput
                        label="Email Address"
                        name="email"
                        placeholder="e.g. john@example.com"
                        type="email"
                        className='col-span-full sm:col-span-1'
                        value={formData.email}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <TextInput
                        label="Phone No."
                        name="phone"
                        placeholder="e.g. 098-765-4321"
                        type="tel"
                        className='col-span-full sm:col-span-1'
                        value={formData.phone}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <TextInput
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        type="password"
                        className='col-span-full sm:col-span-1'
                        value={formData.password}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} />
                    <TextInput
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        type="password"
                        className='col-span-full sm:col-span-1'
                        value={formData.password}
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

export default BioDataForm