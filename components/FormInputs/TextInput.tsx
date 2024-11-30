import React from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import Link from 'next/link';


type TextInputProps = {
    label: string;
    name: string;
    errors: Record<string,string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    value: string;
    placeholder: string;
    disabled?: boolean;
    
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
        type="text"
    }: TextInputProps) => {


  return (

        <div className="grid gap-2">
            {type === "password" 
            ? (
                <div className="flex items-center">
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
                    htmlFor={name}>
                    {label}
                </Label>
            )}
            
            <div className="">
                <Input
                id={name}
                name={name}
                placeholder={placeholder}
                type={type}
                value={value}
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={disabled}
                onChange={onChange}
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