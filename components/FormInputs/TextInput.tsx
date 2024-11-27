import React from 'react'


type TextInputProps = {
    label: string;
    name: string;
    errors: Record<string,string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    value: string
    
}

const TextInput = ({label, name, errors, value, onChange, type="text"}: TextInputProps) => {


  return (

    <div>
        <div>
            <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
                {label}
            </label>
            <div className="">
                <input
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
                />
                {errors[name] && (<span className="text-red-600 text-sm">{errors[name]}</span>)}
            </div>
        </div>
    </div>

  )
}

export default TextInput