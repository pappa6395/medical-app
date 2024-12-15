import { formatToBytes } from '@/utils/formatToBytes';
import { UploadDropzone } from '@/utils/uploadthing';
import { File, FileX, XCircle } from 'lucide-react';
import React from 'react'
import toast from 'react-hot-toast';



type MultiImageInputProps = {
    label: string;
    files: FileProps[];
    setFiles: (urls: any) => void;
    className?: string;
    name: string;
    endpoint?: string;
    errors: Record<string, string[]>;   
}
export type FileProps = {
    formatToBytes(size: any): React.ReactNode;
    title: string;
    size: string;
    url: string;
}

const MultiFileUpload = ({
    label,
    files,
    setFiles,
    name,
    errors,
    className="col-span-full",
    endpoint,
}: MultiImageInputProps) => {

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
            {files.length > 0 && (
                <button 
                    onClick={() => setFiles([])}
                    type="button"
                    className='flex space-x-2 bg-slate-600 
                    rounded-md shadow text-slate-50 py-2 px-4'
                    >
                    <FileX className='w-5 h-5' />
                    <span>Delete Files</span>
                 </button>
            )} 
        </div>
        {errors[name] && (<span className="text-red-600 text-sm">{errors[name]}</span>)}
        {files.length > 0 ? (
            <div 
                className='grid grid-cols-1 sm:grid-cols-2 
                gap-4 mt-2'
                >
                {files.map((file, i) => {
                    return (
                        <div key={i} className='relative mb-6'>
                            <button
                                onClick={() => handleImageRemove(i)}
                                className='absolute -top-4 -right-2 
                                bg-slate-100 text-slate-900 rounded-full'
                                >
                                <XCircle className='' />
                            </button>
                            <div className="flex gap-4 py-3 rounded-md px-6 bg-white 
                            dark:bg-slate-800 border border-slate-200">
                                    <File/>
                                <div className='flex flex-col'>
                                    <span className="line-clamp-1">{file.title}</span>
                                    <span className='text-gray-500'>{formatToBytes(file.size)} KB</span>
                                </div>
                                    
                        
                            </div>
                        </div>
                    )
                })}
            </div>
        ) : (
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
                    setFiles(urls);
                    console.log(urls);
                    console.log("Upload completed");
                }}
                onUploadError={(error) => {
                    toast.error("Image upload failed, Try again");
                    console.log(`Error! ${error.message}`, error);
                    
                }}
            /> 
        )}
    </div>
    
  )
}

export default MultiFileUpload