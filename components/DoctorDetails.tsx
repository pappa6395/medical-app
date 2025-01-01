"use client"

import React, { useState } from 'react'
import { AppointmentProps, DoctorDetail, FileProps, GenderOptionProps } from '@/utils/types'
import { getFormattedDate } from '@/utils/formattedDate'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { getDayFromDate } from '@/utils/getDayFromDate'
import { getLongDate } from '@/utils/getLongDate'
import { DollarSign } from 'lucide-react'
import { cn } from '@/lib/utils'
import TextInput from './FormInputs/TextInput'
import { useRouter } from 'next/navigation'
import RadioInput from './FormInputs/RadioInput'
import DatePickerInput from './FormInputs/DatePickerInput'
import TextAreaInput from './FormInputs/TextAreaInput'
import MultiFileUpload from './FormInputs/MultiFileUpload'
import toast from 'react-hot-toast'
import { createAppointment } from '@/actions/appointments'
import SubmitButton from './FormInputs/SubmitButton'
import { Appointment } from '@prisma/client'
import DoctorProfileDetail from './Dashboard/Doctor/DoctorProfileDetail'
import { createRoom } from '@/actions/hms'


const DoctorDetails = ({
    doctor, 
    patientId,
    appointment,
}: {
    doctor: DoctorDetail 
    patientId: string | undefined;
    appointment: Appointment | undefined | null;
}) => {


    const [date, setDate] = useState<Date | undefined>(new Date());

    const formattedDate = getFormattedDate();
    const day = getDayFromDate(date?.toDateString());
    const longDate = date && getLongDate(date.toDateString());
    const times = doctor.doctorProfile?.availability?.[day] ?? null;

    const [selectedDoB, setSelectedDoB] = useState(undefined);
    const [imageUrl, setImageUrl] = useState([])
    const [patientData, setPatientData] = useState<AppointmentProps>({
        firstName: appointment?.firstName || "",
        lastName: appointment?.lastName || "",
        email: appointment?.email || "",
        phone: appointment?.phone || "",
        gender: appointment?.gender || "",
        dob: appointment?.dob || selectedDoB || undefined,
        location: appointment?.location || "",
        appointmentReason:  "",
        medicalDocument: [],
        occupation: appointment?.occupation ||"",
        appointmentDate: undefined,
        appointmentTime: "",
        appointmentFormattedDate: "",
        doctorId: doctor.id,
        doctorName: doctor.name || "",
        patientId: appointment?.patientId || "",
        fee: appointment?.fee || doctor.doctorProfile?.hourlyWage || 0,
        status: appointment?.status || "",
        meetingLink: appointment?.meetingLink || "",
        meetingProvider: appointment?.meetingProvider || "",

    })
    const [selectedTime, setSelectedTime] = useState("")
    const [medicalDocs, setMedicalDocs] = useState<FileProps[]>([]);
    const [isActive, setIsActive] = useState("availability")
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({})
    const [register, setRegister] = useState(false);
    const [status, setStatus] = useState("");
    const [meetingLink, setMeetingLink] = useState("")
    const [meetingProvider, setMeetingProvider] = useState("")

    const router = useRouter()
    //const today: keyof DoctorProfileAvailability = getDayName();
    patientData.appointmentDate = date
    patientData.appointmentFormattedDate = longDate??""
    patientData.appointmentTime = selectedTime
    patientData.medicalDocument = medicalDocs.map((doc) => doc.url)
    patientData.patientId = patientId?? ""
    patientData.status = status?? ""
    patientData.meetingLink = meetingLink?? ""
    patientData.meetingProvider = meetingProvider?? ""

    const genderOptions: GenderOptionProps[] = [
        { value: 'male', label: 'Male', description: '' },
        { value: 'female', label: 'Female', description: '' },
            
    ];

    const handleSubmit = async(e: React.FormEvent) => {
       e.preventDefault()
       console.log(patientData);
       setIsLoading(true)
       try {
            //Generate room and the room id
            const doctorFirstName = doctor.doctorProfile?.firstName
            const patientFirstName = appointment?.firstName
            const roomName = `Dr.${doctorFirstName} - ${patientFirstName} meeting appointment`
            const roomData = await createRoom(roomName)
            //Use the room id to generate the meetingLink
            if (roomData.error) {
                toast.error(roomData.error)
                return 
            }
            const meetingLink = `/meeting/${roomData.roomId}`; 
            patientData.meetingLink = meetingLink;

            //Create an appointment
            const res = await createAppointment(patientData)
            const appointmentData = res?.data
            //console.log("Appointment submitted:",appointmentData);
            toast.success("Appointment submitted successfully!")
            router.push("/dashboard/user/appointments")
        } catch (error) {
            console.log("Failed to create appointment:", error);
            toast.error("Failed to submit appointment. Please try again later.")
        } finally {
            setIsLoading(false)
            setIsSubmitted(true)
        }
        
    };

    const validate = () => {
        const newErrors = {};

       

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; 
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target
            setPatientData((prev) => ({...prev, [name]: value}))
    
    }
    const resetForm = () => {
        setPatientData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            gender: "",
            dob: undefined,
            location: "",
            appointmentReason: "",
            medicalDocument: [],
            occupation: "",
            appointmentDate: date?? undefined,
            appointmentTime: "",
            appointmentFormattedDate: "",
            doctorId: doctor.id,
            doctorName: doctor.name,
            patientId: patientData?.patientId ?? "",
            fee: doctor.doctorProfile?.hourlyWage?? 0,
            status: "",
            meetingLink: "",
            meetingProvider: "",
            
        });
        setErrors({});
        setRegister(false);
        setImageUrl([]);
        setIsLoading(false);
        setIsSubmitted(false);
    }
    
    const transformedErrors: Record<string, string[]> = 
    Object.entries(errors).reduce((acc, [key, value]) => {
        acc[key] = Array.isArray(value) ? value.map(String) : [String(value)];
        return acc;
    }, {} as Record<string, string[]>)

    const initiateAppointment = () => {
        if (patientId) {
            if (!selectedTime) {
                toast.error("Please select time");
                return;
            }
            if (!longDate) {
                toast.error("Please select a date");
                return;
            }
            setStep((currStep) => currStep + 1)
        } else {
            router.push('/login')
        }
    }

  return (

    <div>
        {step === 1 ? (
            <div className=''>
                <div className="flex justify-between items-center shadow-sm">
                    <button 
                        className={isActive === 'details' ? 
                            (
                                'py-4 px-4 w-full bg-blue-600 dark:bg-blue-800 text-white uppercase tracking-wide border-b-2 border-white'
                            ) : (
                                'py-4 px-4 w-full bg-slate-50 dark:bg-slate-100 text-slate-800 uppercase tracking-wide border-b-2 border-blue-500'
                            )}
                        onClick={() => setIsActive("details")} >
                        Doctor Details
                    </button>
                    <button 
                        className={isActive === 'availability' 
                            ? ('py-4 px-8 w-full bg-blue-600 dark:bg-blue-800 text-white uppercase tracking-wider border-b-2 border-white') 
                            : ('py-4 px-8 w-full bg-slate-50 dark:bg-slate-100 text-slate-800 uppercase tracking-wider border-b-2 border-blue-500')}
                        onClick={() => setIsActive("availability")}>
                        Availability
                    </button>
                </div>
                <div className='py-8 px-6 mx-auto'>   
                    {isActive === "availability" ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-0 space-x-4'>
                            <div className='sm:col-span-2 mx-auto justify-center'>
                                <Calendar 
                                    mode='single'
                                    selected={date}
                                    onSelect={setDate}
                                    className='rounded-md border'
                                />
                            </div>
                            <div className='col-span-2'>
                                <span className='text-blue-600 dark:text-blue-500/80 text-sm'>You have selected</span>
                                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                    {longDate}
                                </h3>
                                {times && times.length > 0 && (
                                    <div className="py-3 grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {times.map((item,i) => {
                                            return (
                                                <Button
                                                    key={i} 
                                                    variant={selectedTime === item ? "booking" : "outline"} 
                                                    value={selectedTime}
                                                    onClick={() => setSelectedTime(item)}
                                                >
                                                {item}
                                                </Button>
                                            )
                                        })}
                                    
                                    </div>
                                )}
                                <button 
                                    type="button"
                                    onClick={initiateAppointment} 
                                    className="text-white bg-sky-500 mt-4 
                                    hover:bg-sky-600/80 focus:ring-4 focus:outline-none 
                                    focus:ring-sky-500/50 font-medium rounded-lg text-sm 
                                    px-5 py-2.5 text-center inline-flex items-center 
                                    dark:hover:bg-sky-700/80 dark:focus:ring-sky-700/40 
                                    me-2 mb-2 darK:text-slate-100"
                                >
                                Book a doctor
                                (<DollarSign className='w-4 h-4' />{doctor.doctorProfile?.hourlyWage})
                                </button>
                            </div>
                        </div>
                        
                    ) : (
                        <div>
                            <DoctorProfileDetail doctor={doctor} />
                        </div>
                    )}
                </div>
            </div>
        ) : (
            <div className='p-8'>
                {/* - FullName
                    - Gender 
                    - Birthdate
                    - Phone number
                    - Email
                    - Address / Location
                    - Reason why you want to see the doctor
                    - Upload medical documents
                    - Occupation

                */}
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Patient Information Form
                </h3>
                {step === 2 ? (
                    <div className={cn("grid gap-6 py-4 mx-auto px-6")}>
                        <form onSubmit={handleSubmit}>
                            <div className="">
                                <div className="grid grid-cols-2 gap-6">
                                    <TextInput
                                        label="First Name"
                                        register={register}
                                        name="firstName"
                                        placeholder="Enter your first name"
                                        type="text"
                                        value={patientData.firstName}
                                        errors={transformedErrors}
                                        disabled={isLoading}
                                        onChange={handleChange}
                                        className='col-span-full sm:col-span-1'
                                    />
                                    <TextInput
                                        label="Last Name"
                                        register={register}
                                        name="lastName"
                                        placeholder="Enter your last name"
                                        type="text"
                                        value={patientData.lastName}
                                        errors={transformedErrors}
                                        disabled={isLoading}
                                        onChange={handleChange} 
                                        className='col-span-full sm:col-span-1'
                                    />
                                    <TextInput
                                        label="Email Address"
                                        register={register}
                                        name="email"
                                        placeholder="Enter your email address"
                                        type="email"
                                        value={patientData.email}
                                        errors={transformedErrors}
                                        disabled={isLoading}
                                        onChange={handleChange} 
                                        className='col-span-full sm:col-span-1'
                                    />
                                    <TextInput
                                        label="Phone No."
                                        register={register}
                                        name="phone"
                                        placeholder="Enter your phone no."
                                        type="tel"
                                        value={patientData.phone}
                                        errors={transformedErrors}
                                        disabled={isLoading}
                                        onChange={handleChange} 
                                        className='col-span-full sm:col-span-1'
                                    />
                                     <RadioInput
                                        title="Gender" 
                                        name="gender"
                                        options={genderOptions}
                                        register={register}
                                        value={patientData.gender}
                                        errors={transformedErrors}
                                        onChange={handleChange}
                                        className='col-span-full sm:col-span-1'
                                    /> 
                                    <DatePickerInput
                                        name="Date of Birth" 
                                        date={patientData.dob}
                                        setDate={(setDoB) => setPatientData((prev)=>({...prev, dob: setDoB})) }
                                        className='col-span-full sm:col-span-1'
                                    />
                                </div>
                            </div>
                            <div className='mt-8 flex justify-between items-center gap-4'>
                                    <Button 
                                        type="button" 
                                        onClick={() => setStep(currStep => currStep-1)}
                                    >
                                    Previous
                                    </Button>
                                    <Button 
                                        type="button" 
                                        onClick={() => setStep(currStep => currStep+1)}
                                    >
                                    Next
                                    </Button>
                            </div>
                        </form>
                    </div>  
                ) : (
                    <div className={cn("grid gap-6 py-4 mx-auto px-6")}>
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <div className="grid grid-cols-2 gap-6">
                                <TextInput
                                    label="Address / Location"
                                    register={register}
                                    name="location"
                                    placeholder="Enter your location"
                                    type="text"
                                    value={patientData.location}
                                    errors={transformedErrors}
                                    disabled={isLoading}
                                    onChange={handleChange}
                                    className='col-span-full sm:col-span-1'
                                />
                                <TextInput
                                    label="Occupation"
                                    register={register}
                                    name="occupation"
                                    placeholder="Enter your occupation"
                                    type="text"
                                    value={patientData.occupation}
                                    errors={transformedErrors}
                                    disabled={isLoading}
                                    onChange={handleChange} 
                                    className='col-span-full sm:col-span-1'
                                />
                                <TextAreaInput
                                    label="Reason for seeing the doctor"
                                    register={register}
                                    name="appointmentReason"
                                    placeholder="Enter your appointment reason"
                                    value={patientData.appointmentReason}
                                    errors={transformedErrors}
                                    disabled={isLoading}
                                    onChange={handleChange} 
                                />
                                <MultiFileUpload
                                    label='Medical document upload'
                                    name="medicalDocuments"
                                    files={medicalDocs}
                                    setFiles={setMedicalDocs}
                                    endpoint='patientMedicalDocs'
                                    errors={transformedErrors}
                                />
                            </div>
                        </div>
                        <div className='mt-8 flex justify-between items-center gap-4'>
                                <Button 
                                    type="button" 
                                    onClick={() => setStep(currStep => currStep-1)}
                                >
                                Previous
                                </Button>
                                <SubmitButton 
                                    title={'Complete Appointment'} 
                                    isLoading={isLoading} 
                                    loadingTitle={''}                                    
                                />
                        </div>
                    </form>
                </div>  
                )}
                 
            </div>
        )}

    </div>
   

  )
}

export default DoctorDetails