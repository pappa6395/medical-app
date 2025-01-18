"use client"

import { cn } from '@/lib/utils'
import React from 'react'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Paperclip, X, XCircle } from 'lucide-react';
import { ComposeMailProps, FileProps } from '@/utils/types';
import { Button } from './ui/button';
import TextInput from './FormInputs/TextInput';
import TiptapEditor from './FormInputs/TiptapEditor';
import SubmitButton from './FormInputs/SubmitButton';
import { sendEmail } from '@/actions/mails';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { formatBytes } from '@/utils/formatToBytes';
import MultiUploaders from './FormInputs/MultiUploaders';
import { FaFilePdf, FaImage } from 'react-icons/fa';



const ComposeMailForm = () => {


    const router = useRouter()
   
    const [errors, setErrors] = React.useState<Partial<ComposeMailProps>>({
        to: "",
        subject: "",
        message: "",
        attachments: [],
    });
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
    const [register, setRegister] = React.useState<boolean>(false);

    const [content, setContent] = React.useState("Hello World!")
    const [selectedUser, setSelectedUser] = React.useState<any>(null);
    const [files, setFiles] = React.useState<FileProps[]>([])

    const [mailData, setMailData] = React.useState<ComposeMailProps>({
        to: "",
        subject: "",
        message: "",
        attachments: [],
    })
    
  const transformedErrors: Record<string, string[]> = 
  Object.entries(errors).reduce((acc, [key, value]) => {
    acc[key] = Array.isArray(value) ? value.map(String) : [String(value)];
    return acc;
  }, {} as Record<string, string[]>)


    mailData.attachments = files

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        console.log(mailData)

        if (validate(mailData)) {

        }

        try {
            const res = await sendEmail(mailData)
            if (res.status === 200) {
                toast.success("Email sent successfully")
            }
    
        } catch (error) {
            console.error("Error creating new message:", error);
            toast.error("Failed to create new message");

        } finally {
            resetForm();
        }

        
    };

    const validate = (mailData: ComposeMailProps) => {
        const newErrors: Partial<ComposeMailProps> = {
            to: '',
            subject: '',
            message: '',
        };

        if (mailData.message === "") {
            newErrors.message = "Message is required"
        }

        if (!mailData.to) newErrors.to = "Recipient Email address is require"
        if (!mailData.subject) newErrors.subject = "Subject is required"

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; 
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setMailData((prev) => ({...prev, [name]: value}))

    }
    const handleEditorChange = (name: string, value: string) => {
        setContent(value);
        setMailData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageRemove = (fileIndex: any) => {
        const updatedFiles = files.filter((file, index) => index !== fileIndex)
        setFiles(updatedFiles);    
    }

    const handleFileUpload = (newFiles: any) => {
        // Append new files to the existing array
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const resetForm = () => {
        setMailData({
            to: "",
            subject: "",
            message: "",
            attachments: [],
        });
        setErrors({
            to: "",
            subject: "",
            message: "",
            attachments: [],
        });
        setRegister(false);
        setIsLoading(false);
        setIsSubmitted(false);
    }

    React.useEffect(() => {
        if (selectedUser) {
            setMailData((prev) => ({
                ...prev,
                recieverId: selectedUser.value,
            }));
        }
    }, [selectedUser]);


  return (

    <div className="w-full mx-auto shadow-sm rounded-md border border-gray-200">
        <div className="flex item-center justify-between px-6 border-b border-gray-200 py-4">
            <h1 className="scroll-m-20 text-3xl 
            font-semibold tracking-wide first:mt-0 mb-2">
                Compose Mail
            </h1>
            <Button asChild variant={"outline"}>
                <Link href="/dashboard/doctor/inbox">
                    <X className='w-4 h-4' />
                </Link>
            </Button>
        </div>
        <div className={cn("grid gap-8 py-4 mx-auto px-6")}>
            <form onSubmit={handleSubmit}>
                <div className="grid justify-center gap-4">
                    <TextInput
                        label="To"
                        register={register}
                        name="to"
                        placeholder="Enter recipient email address"
                        type="email"
                        value={mailData.to}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} 
                        className='col-span-full w-[300px] md:w-[360px]'
                    />
                    <TextInput
                        label="Subject"
                        register={register}
                        name="subject"
                        placeholder="Enter subject"
                        type="text"
                        value={mailData.subject}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} 
                        className='col-span-full w-[300px] md:w-[360px]'
                    />
                    <TiptapEditor
                        value={mailData.message}
                        onChange={(value) => handleEditorChange( "message" , value)}
                    />
                    {errors && errors.message && (<span className='text-sm text-red-600'>{errors.message}</span>)}
                </div>
                <div className='flex mt-3 pt-3 gap-4 justify-center'>
                    {files.map((file, i) => {
                        const extension = file.title?.slice(file.title.lastIndexOf(".") + 1);
                        return (
                            <div key={i} className='relative w-36'>
                                <button
                                    onClick={() => handleImageRemove(i)}
                                    className='absolute -top-3 -right-2 
                                    bg-slate-100 text-slate-900 rounded-full'
                                    >
                                    <XCircle className=''/>
                                </button>
                                <div className="flex items-center w-36 gap-4 py-1 rounded-md px-4 pl-4 bg-white 
                                dark:bg-slate-800 border border-slate-200">
                                    {extension === "pdf" ? 
                                    <FaFilePdf className='flex flex-shrink-0 text-red-500' /> 
                                    : <FaImage className='flex flex-shrink-0' />}
                                    <div className='flex flex-col truncate'>
                                        <Link href={file.url} target="_blank" className="line-clamp-1 ps-2 text-[12px]">{file.title}</Link>
                                        {file.size && file.size > 0 ? (
                                            <span className='text-gray-500 ps-2 text-[12px]'>{formatBytes(file.size)}KB</span>
                                        ) : ""}

                                    </div>
                                </div>
                            </div>
                        )
                    })} 
                </div>
                <div className='mt-6 flex justify-center space-x-32 gap-4'>
                    <Dialog>
                        <DialogTrigger>
                                <div className='flex items-center gap-2'>
                                    <Paperclip className='border w-8 h-8 px-1 hover:bg-slate-400 rounded-md' />
                                    Attachments
                                </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Upload your attachments</DialogTitle>
                            <DialogDescription></DialogDescription>
                            <MultiUploaders 
                                label='Add attachments'
                                name="mailAttachments"
                                files={files}
                                setFiles={setFiles}
                                endpoint='mailAttachments'
                                errors={transformedErrors}
                            />
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <SubmitButton 
                        title={"Create Message"}
                        isLoading={isLoading} 
                        loadingTitle={"Creating a Message..."}  
                    />
                </div>
            </form>
        </div>
    </div>
  )
}

export default ComposeMailForm