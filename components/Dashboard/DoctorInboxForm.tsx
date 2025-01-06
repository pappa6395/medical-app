"use client"

import { cn } from '@/lib/utils'
import React, { FC } from 'react'
import TextInput from '../FormInputs/TextInput';
import SubmitButton from '../FormInputs/SubmitButton';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import Link from 'next/link';
import { X } from 'lucide-react';
import { InboxProps, PatientProps } from '@/utils/types';
import FormSelectInput from '../FormInputs/FormSelectInput';
//import { Options } from "react-tailwindcss-select/dist/components/type";
import TiptapEditor from '../FormInputs/TiptapEditor';
import { Session } from 'next-auth';
import { createInboxMessage } from '@/actions/inbox';
import { Appointment } from '@prisma/client';


interface InboxFormProps {
    title: string;
    initialData?: Partial<InboxProps>;
    appointments: Appointment[]
    session: Session | null;
}

const DoctorInboxForm = ({
    title, 
    initialData,
    appointments,
    session,
}: InboxFormProps) => {

    const role = session?.user.role;

    const uniquePatientsMap = new Map();
    
        if (appointments) {
          appointments?.forEach((app) => {
            if (!app.patientId) return;
            if (!uniquePatientsMap.has(app.patientId)) {
              uniquePatientsMap?.set(app.patientId, {
                patientId : app.patientId ?? "",
                name: `${app.firstName ?? ""} ${app.lastName ?? ""}`,
                email: app.email ?? "",
                phone: app.phone ?? "",
                location: app.location ?? "",
                gender: app.gender ?? "",
                occupation: app.occupation ?? "",
                dob: app.dob ?? new Date(),
              });
            }
          });
        }
        const patients = Array.from(uniquePatientsMap.values() || []) as PatientProps[]
        const users = patients?.map((patient) => {
          return {
              value: patient.patientId ?? "",
              label: patient.name ?? "",
          }
        })

    const router = useRouter()
   
    const [errors, setErrors] = React.useState<Partial<InboxProps>>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
    const [register, setRegister] = React.useState<boolean>(false);

    const [content, setContent] = React.useState("Hello World!")
    const [selectedUser, setSelectedUser] = React.useState<any>(null);

    const [inboxData, setInboxData] = React.useState<InboxProps>({
        recieverId: selectedUser?.value??"",
        senderId: session?.user.id??"", 
        senderName: session?.user.name??"",
        senderEmail: session?.user.email??"",
        message: content,
        subject: "",

    })
    
  const transformedErrors: Record<string, string[]> = 
  Object.entries(errors).reduce((acc, [key, value]) => {
    acc[key] = Array.isArray(value) ? value.map(String) : [String(value)];
    return acc;
  }, {} as Record<string, string[]>)


  
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setIsSubmitted(true);

        console.log(inboxData);

        try {
            const res = await createInboxMessage(inboxData);
            if (res?.status === 201) {
                toast.success("Message sent successfully!");
                router.push(`/dashboard/${role==="DOCTOR"? "doctor" : "user"}/inbox`)
            }

        } catch (error) {
            console.error("Error creating new message:", error);
            toast.error("Failed to create new message");

        } finally {
            resetForm();
        }
    };

    const validate = () => {
        const newErrors = {};

       

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; 
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setInboxData((prev) => ({...prev, [name]: value}))

    }
    const handleEditorChange = (name: string, value: string) => {
        setContent(value);
        setInboxData((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setInboxData({
            recieverId: "",
            senderId: "", 
            senderName: "",
            senderEmail: "",
            message: "",
            subject: "",
        });
        setErrors({});
        setRegister(false);
        setIsLoading(false);
        setIsSubmitted(false);
    }

    React.useEffect(() => {
        if (selectedUser) {
            setInboxData((prev) => ({
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
                {title}
            </h1>
            <Button asChild variant={"outline"}>
                <Link href="/dashboard/doctor/inbox">
                    <X className='w-4 h-4' />
                </Link>
            </Button>
        </div>
        <div className={cn("grid gap-6 py-4 mx-auto px-6")}>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <FormSelectInput
                        label="Recipients"
                        options={users}
                        option={selectedUser}
                        setOption={setSelectedUser}
                        toolTipText="Add New Main Category"
                        href="/dashboard/inventory/main-categories/new"
                    />
                    <TextInput
                        label="Subject"
                        register={register}
                        name="subject"
                        placeholder="Enter subject"
                        type="text"
                        value={inboxData.subject}
                        errors={transformedErrors}
                        disabled={isLoading}
                        onChange={handleChange} 
                        className='col-span-full w-[300px] md:w-[360px]'
                    />
                    <TiptapEditor
                        value={inboxData.message}
                        onChange={(value) => handleEditorChange( "message" , value)}
                    />
                </div>
                <div className='mt-6 flex gap-4'>
                    <Button asChild variant={"outline"} className='mt-2'>
                        <Link href={`/dashboard/${role==="DOCTOR"? "doctor" : "user"}/inbox`}>
                            Cancel
                        </Link>
                    </Button>
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

export default DoctorInboxForm