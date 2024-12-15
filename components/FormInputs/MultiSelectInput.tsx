import { cn } from '@/lib/utils';
import { MultiSelectInputProps, ShadSelectInputProps } from '@/utils/types';
import React, { ChangeEvent } from 'react'
import { MultiSelect } from "react-multi-select-component";

const MultiSelectInput = ({
    label,
    className ="sm:col-span-2",
    optionTitle,
    options,
    selectOption,
    setSelectOption,
}: MultiSelectInputProps) => {


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
        <MultiSelect
            options={options}
            value={selectOption}
            onChange={setSelectOption}
            labelledBy={optionTitle}
        />
            
    </div>
</div>

  )
}

export default MultiSelectInput