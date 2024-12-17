import React from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { DoctorProfile } from '@prisma/client';


type TextInputProps = {
    label: string;
    name: string;
    errors: Record<string, string[]>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    value?: string | number;
    placeholder: string;
    disabled?: boolean;
    className?: string;
    register?: boolean;
}

const TextInput = (
    {
        label,
        name, 
        errors, 
        value,
        placeholder, 
        onChange, 
        disabled, 
        type="text",
        className="col-span-full",
        register
    }: TextInputProps) => {


  return (

        <div className={cn("grid gap-2", className)}>
            {type === "password" 
            ? (
                <div className="flex text-slate-700 dark:text-slate-200 items-center">
                    <Label htmlFor={name}>{label}</Label>
                    <Link 
                        href="/forgotPassword" 
                        className="ml-auto inline-block 
                        text-sm underline text-muted-foreground" 
                    >
                        Forgot your password?
                    </Link>
                </div>
            ) : (
                <Label 
                    htmlFor={name}
                    className='text-slate-700 dark:text-slate-200'>
                    {label}
                </Label>
            )}
            
            <div className="">
                <Input
                id={name}
                name={name}
                placeholder={placeholder}
                type={type}
                value={value !== 0 ? value : ""}
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={disabled}
                onChange={onChange}
                className='dark:bg-slate-700 dark:text-slate-200 
                dark:placeholder-slate-100'
                />
                {/* <input
                id={name}
                name={name}
                type={type}
                autoComplete="name"
                value={value}
                onChange={onChange}
                className="block w-full rounded-md border-0 py-1.5 
                text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                focus:ring-indigo-600 sm:text-sm/6"
                /> */}
                {errors[name] && (<span className="text-red-600 text-sm">{errors[name]}</span>)}
            </div>
        </div>

  )
}

export default TextInput