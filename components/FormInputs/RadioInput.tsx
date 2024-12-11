import React from 'react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type RadioInputProps = {
    className?: string;
    name: string;
    title: string;
    register: boolean;
    value: string;
    options: Array<{value: string, label: string, description: string}>;
    errors: Record<string, string[]>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioInput = (
    { 
        name, 
        title,  
        errors,
        options,
        value,
        onChange, 
        className="col-span-full" 
    }: RadioInputProps) => {

  return (

    <div className={cn("grid gap-2", className)}>
    <Label className='text-slate-700 dark:text-slate-200'>{title}</Label>
        <div className='flex'>
            <ul className="items-center w-full text-sm font-medium 
            text-gray-900 bg-white border border-gray-200 
            rounded-lg sm:flex dark:bg-slate-700 dark:border-gray-600 
            dark:text-white"
            >
                {options.map((option, i) => {
                    return (
                        <li key={i} className="w-full border-b border-gray-200 
                        sm:border-b-0 sm:border-r dark:border-gray-600 ">
                            <div className="flex items-center ps-3">
                                <input
                                    id={`${name}-${option.value}`}
                                    type="radio" 
                                    name={name}
                                    value={option.value}
                                    checked={value === option.value}
                                    onChange={onChange}                                    
                                    className="w-4 h-4 text-blue-600 bg-gray-100 
                                    border-gray-300 focus:ring-blue-500 
                                    dark:focus:ring-blue-600 dark:ring-offset-gray-700 
                                    dark:focus:ring-offset-gray-700 focus:ring-2 
                                    dark:bg-gray-300 dark:border-gray-500"/>
                                <Label 
                                    htmlFor={`${name}-${option.value}`}
                                    className="w-full py-3 ms-2 text-sm font-medium 
                                    text-gray-600 dark:text-gray-200"
                                >{option.label}
                                </Label>
                            </div>
                            {options.find((item,i) => item.description.length > 0)  && (
                                <p 
                                className='m-2 p-2 text-sm text-slate-600 
                                dark:text-slate-300 '
                            >{option.description}
                            </p>
                            )}
                        </li> 
                    )
                })}
            </ul>
        </div>
        {errors[name] && (<span className="text-red-600 text-sm">{errors[name]}</span>)}
    </div>


  )
}

export default RadioInput