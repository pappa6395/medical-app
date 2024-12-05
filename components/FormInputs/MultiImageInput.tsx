import { UploadDropzone } from '@/utils/uploadthing';
import { XCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react'



type MultiImageInputProps = {
    label: string;
    imageUrls: string[];
    setImageUrls: (urls: string[]) => void;
    className?: string;
    endpoint?: string;  
}

const MultiImageInput = ({
    label,
    imageUrls,
    setImageUrls,
    className,
    endpoint,
}: MultiImageInputProps) => {

    const handleImageRemove = (imageIndex: any) => {
        const updatedImages = imageUrls.filter((image, index) => index !== imageIndex)
        setImageUrls(updatedImages);    
    }

  return (

    <div className={className}>
        <div className='flex justify-between items-center mb-4'>
            <label 
                htmlFor='course-image'
                className='block text-sm font-medium leading-6 
                text-gray-900 dark:text-slate-50 mb-2'
                >
                {label}
            </label>
        </div>
        {imageUrls.length > 0 ? (
            <div 
                className='grid grid-cols-1 sm:grid-cols-2 
                md:grid-cols-3 lg:grid-cols-4 gap-4'
                >
                {imageUrls.map((imageUrl, i) => {
                    return (
                        <div key={i} className='relative mb-6'>
                            <button
                                onClick={() => handleImageRemove(i)}
                                className='absolute -top-4 -right-2 
                                bg-slate-100 text-slate-900 rounded-full'
                                >
                                <XCircle className='' />
                            </button>
                            <Image 
                                src={imageUrl}
                                alt="item image"
                                width={1000}
                                height={667}
                                className='w-full h-32 object-cover'
                            />
                        </div>
                    )
                })}
            </div>
        ) : (
            <UploadDropzone 
                endpoint={endpoint as any}
                onClientUploadComplete={(res) => {
                    console.log(res);
                    const urls = res.map((item) => item.url);
                    setImageUrls(urls);
                    console.log(urls);
                    console.log("Upload completed");
                }}
            /> 
        )}
    </div>
    
  )
}

export default MultiImageInput