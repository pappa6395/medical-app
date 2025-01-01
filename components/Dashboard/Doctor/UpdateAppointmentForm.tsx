"use client"
import { updateAppointmentById } from '@/actions/appointments'
import RadioInput from '@/components/FormInputs/RadioInput'
import SelectInput from '@/components/FormInputs/SelectInput'
import SubmitButton from '@/components/FormInputs/SubmitButton'
import TextInput from '@/components/FormInputs/TextInput'
import { CardDescription, CardTitle } from '@/components/ui/card'
import { StatusOptionsProps, UpdateAppointmentFormProps } from '@/utils/types'
import { Appointment } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { FormEvent } from 'react'
import toast from 'react-hot-toast'



const UpdateAppointmentForm = ({appointment}: {appointment: Appointment | undefined | null}) => {

    const router = useRouter();
    const [meetingData, setMeetingData] = React.useState<UpdateAppointmentFormProps>({
        status: appointment?.status || "",
        meetingLink: appointment?.meetingLink || "",
        meetingProvider: appointment?.meetingProvider || "",
    })
    const [isLoading, setIsLoading] = React.useState(false)
    const [errors, setErrors] = React.useState<Partial<UpdateAppointmentFormProps>>({});
    const [register, setRegister] = React.useState(false)


    const statusOptions: StatusOptionsProps[] = [
        {
            label: "Pending",
            value: "pending",
            description: '',
        },
        {
            label: "Approved",
            value: "approved",
            description: '',
        },
        {
            label: "Rejected",
            value: "rejected",
            description: '',
        },
    ]

    const meetingProvider = [
        {
            label: "Select your meeting provider",
            value: "",
            description: '',
        },
        {
            label: "100ms",
            value: "100ms",
            description: '',
        },
        {
            label: "Google Meet",
            value: "googleMeet",
            description: '',
        },
        {
            label: "Zoom",
            value: "zoom",
            description: '',
        },
    ]

    const appointmentId = appointment?.id || ""

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()

        if (validate(meetingData)) {

            setIsLoading(true)
            console.log(meetingData);

            try {
                const updateMeeting = await updateAppointmentById(appointmentId, meetingData)
                const res = updateMeeting?.data
                console.log("Meeting updated successfully:", res);
                toast.success("Meeting updated successfully")
                router.push("/dashboard")

            } catch (error) {
                console.log(error);

            } finally {
                setIsLoading(false)
            }
        }
       
    }
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target
        setMeetingData((prev) => ({ ...prev, [name]:value}));
    }

    const validate = (meetingData: UpdateAppointmentFormProps) => {
        const newErrors: Partial<UpdateAppointmentFormProps> = {};

        if (!meetingData.meetingLink) newErrors.meetingLink = 'Meeting Link is required';

        if (!meetingData.meetingProvider) newErrors.meetingProvider = 'Meeting Provider is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; 
    }

    const transformedErrors: Record<string, string[]> = 
  Object.entries(errors).reduce((acc, [key, value]) => {
    acc[key] = Array.isArray(value) ? value.map(String) : [String(value)];
    return acc;
  }, {} as Record<string, string[]>)

  return (

    <form 
        onSubmit={handleUpdate} 
        className='border border-green-600 shadow rounded-md p-4 mx-4 my-4'>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Meeting Detail</CardTitle>
                <CardDescription className='scroll-m-20 text-lg 
                font-semibold tracking-tight py-2'>
                    Submit your meeting link and approval
                </CardDescription>
            </div>
            <SubmitButton 
                title={'Update Appointment'}
                variant={"outline"} 
                isLoading={isLoading} 
                loadingTitle={'Saving...'}               
            />
        </div>
        <div className='mt-2'>
            <div className="py-2">
                <TextInput
                    label="Add Meeting Link"
                    name="meetingLink"
                    placeholder="e.g. http://meet.google.com/nvg-vvvd-uyj"
                    type="text"
                    value={meetingData.meetingLink}
                    errors={transformedErrors}
                    disabled={isLoading}
                    onChange={handleChange} />
            </div>
            <div className="py-2">
                <div className="grid grid-cols-1 gap-4">
                    <SelectInput 
                        label="Meeting Provider"
                        name="meetingProvider"
                        placeholder='Select your meeting provider'
                        options={meetingProvider}
                        value={meetingData.meetingProvider}
                        errors={transformedErrors}
                        onChange={handleChange}
                        className=''
                    />
                    <RadioInput 
                        title="Approve the Appointment"
                        register={register}
                        name="status"
                        value={meetingData.status}
                        options={statusOptions}
                        errors={transformedErrors}
                        onChange={handleChange}
                        className=''
                    />
                </div>
            </div>   
        </div> 
    </form> 
  )
}

export default UpdateAppointmentForm