import React from 'react'
import { cn } from '@/lib/utils';


type SelectInputProps = {
    label: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    className: string;
    options: SelectOptionProps[];
    multiple?: boolean;
    placeholder?: string;
    errors: Record<string, string[]>;   
};

export type SelectOptionProps = {
    value: string;
    label: string;  
}

const SelectInput = ({
    label,
    name,
    errors,
    onChange,
    placeholder,
    value,
    className = "sm:cols-span-2",
    options = [],
    multiple = false,
}: SelectInputProps) => {

  return (

    <div className={cn("-mt-1",className)}>
        <label 
            htmlFor={name} 
            className='block text-sm font-medium 
            leading-6 text-gray-600 dark:text-slate-50'
        >
            {label}
        </label>
        <div className=''>
            <select
                id={name} 
                name={name} 
                multiple={multiple}
                value={value}
                onSelect={() => value}
                onChange={onChange}
                className='block w-full border-0 mt-1 py-2 rounded-md
                shadow-sm ring-1 ring-inset focus:ring-2
                focus:ring-inset ring-gray-300 focus:ring-indigo-600 
                sm:max-w-xs sm:text-sm sm:leading-6 text-slate-700 
                dark:text-slate-200 dark:bg-slate-700'
            >   
                {options.map((option, i: number) => {
                    return (       
                        <option 
                            key={i} 
                            value={option.value}
                        >{option.label}
                        </option>
                    )})}
            </select>
        </div>
    </div>

  )
}

export default SelectInput