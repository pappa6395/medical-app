import { formatToBytes } from '@/utils/formatToBytes';
import { FileProps } from '@/utils/types';
import { UploadDropzone } from '@/utils/uploadthing';
import { File, FileX, XCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import toast from 'react-hot-toast';



export type MultiUploadProps = {
    label: string;
    files: FileProps[];
    setFiles: (urls: any) => void;
    className?: string;
    name: string;
    endpoint?: string;
    errors: Record<string, string[]>;   
}

const MultiUploaders = ({
    label,
    files,
    setFiles,
    name,
    errors,
    className="col-span-full",
    endpoint,
}: MultiUploadProps) => {

    const handleImageRemove = (fileIndex: any) => {
        const updatedFiles = files.filter((file, index) => index !== fileIndex)
        setFiles(updatedFiles);    
    }

  return (

    <div className={className}>
        <div className='flex justify-between items-center'>
            <label 
                htmlFor='course-image'
                className='block text-sm font-medium leading-6 
                text-gray-900 dark:text-slate-50 mb-2'
                >
                {label}
            </label>
        </div>
        {errors[name] && (<span className="text-red-600 text-sm">{errors[name]}</span>)}
            <UploadDropzone 
                endpoint={endpoint as any}
                onClientUploadComplete={(res) => {
                    console.log(res);
                    const urls = res.map((item) => {
                        return {
                            url: item.url,
                            title: item.name,
                            size: item.size,
                        }
                    })
                    setFiles((prev: any) => [...prev, ...urls]);
                    console.log(urls);
                    console.log("Upload completed");
                }}
                onUploadError={(error) => {
                    toast.error("Image upload failed, Try again");
                    console.log(`Error! ${error.message}`, error);

                }}
            /> 
    </div>

  )
}

export default MultiUploaders