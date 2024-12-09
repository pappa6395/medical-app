import { cn } from '@/lib/utils';
import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';


type ShadSelectInputProps = {
    label: string;
    className?: string;
    optionTitle: string;
    options: ShadSelectOptionProps[];
    selectOption: any;
    setSelectOption: (value: string) => void;
}

export type ShadSelectOptionProps = {
    value: string;
    label: string;
}

const ShadSelectInput = ({
    label,
    className ="sm:col-span-2",
    optionTitle,
    options,
    selectOption,
    setSelectOption,
}: ShadSelectInputProps) => {


  return (

    <div className={cn("mt-4",className)}>
    <label 
        htmlFor={optionTitle} 
        className='block text-sm font-medium 
        leading-6 text-gray-600 dark:text-slate-50'
    >
        {label}
    </label>
    <div className='mt-2'>
        <Select>
            <SelectTrigger className="w-[180px] bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-100">
                <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {options.map((option, i) => {
                        return (
                        <SelectItem
                            key={i}
                            value={option.value}
                            onClick={() => setSelectOption(option.value)}
                            className={cn(
                                'cursor-pointer text-gray-600 dark:text-slate-50 hover:text-gray-800 dark:hover:text-slate-400 px-4 py-2')}
                        >
                            {option.label}
                        </SelectItem>
                    )
                })}
                </SelectGroup>
            </SelectContent>
        </Select>
            
    </div>
</div>

  )
}

export default ShadSelectInput