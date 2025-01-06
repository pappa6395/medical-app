"use client"

import React, { useEffect, useState } from 'react'
import { AppointmentProps, DoctorDetail, FileProps, GenderOptionProps, TransactionConfigProps } from '@/utils/types'
import { getFormattedDate } from '@/utils/formattedDate'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { getDayFromDate } from '@/utils/getDayFromDate'
import { getLongDate } from '@/utils/getLongDate'
import { CalendarDays, Check, CheckCircle, DollarSign } from 'lucide-react'
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
import { Appointment, PaymentStatus } from '@prisma/client'
import DoctorProfileDetail from './Dashboard/Doctor/DoctorProfileDetail'
import { createRoom } from '@/actions/hms'
import { createSale } from '@/actions/sales'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { PaystackButton } from 'react-paystack'
import paystackLogo from '@/public/paystack.svg'
import Image from 'next/image'


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

    const [paymentDetails, setPaymentDetails] = useState({
        transactionId: "",
        reference: "",
        paymentMethod: "",
        paidAmount: 0,
        paymentStatus: "pending" as PaymentStatus,
    })
    const [isClient, setIsClient] = useState(false);
    const [selectedDoB, setSelectedDoB] = useState(undefined);
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
        doctorId: doctor.id || "",
        doctorName: doctor.name || "",
        patientId: appointment?.patientId || "",
        fee: appointment?.fee || doctor.doctorProfile?.hourlyWage || 0,
        status: appointment?.status || "",
        meetingLink: appointment?.meetingLink || "",
        meetingProvider: appointment?.meetingProvider || "",
        transactionId: appointment?.transactionId || "",
        paymentStatus: appointment?.paymentStatus || "pending",
        paymentMethod: appointment?.paymentMethod || "",
        paidAmount: appointment?.paidAmount || 0,
        reference: appointment?.reference || "",

    })
    const [selectedTime, setSelectedTime] = useState("");
    const [medicalDocs, setMedicalDocs] = useState<FileProps[]>([]);
    const [isActive, setIsActive] = useState("availability");
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [register, setRegister] = useState(false);
    const [status, setStatus] = useState("");
    const [meetingLink, setMeetingLink] = useState("");
    const [meetingProvider, setMeetingProvider] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);

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

       //Update payment details (optional)
       patientData.transactionId = paymentDetails.transactionId;
       patientData.paymentStatus = paymentDetails.paymentStatus;
       patientData.paymentMethod = paymentDetails.paymentMethod;
       patientData.paidAmount = paymentDetails.paidAmount;
       patientData.reference = paymentDetails.reference;

;       try {
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
            //console.log("Create Appointment successfully:", appointmentData);
            
            const saleData = {
                appointmentId: appointment?.id ?? "",
                doctorId: doctor.id?? "",
                doctorName: `${doctor.doctorProfile?.firstName} ${doctor.doctorProfile?.lastName}`,
                patientId: patientData.patientId ?? "",
                patientName: `${patientData?.firstName} ${patientData?.lastName}`,
                totalAmount: patientData.fee ?? 0,
            }
            //Create a sale
            const sale = await createSale(saleData)
            console.log("Sale created successfully:", sale);
            
            toast.success("Appointment submitted successfully!")
            router.push(`/dashboard/user/appointments/view/${appointmentData?.id}`)
        } catch (error) {
            console.log("Failed to create appointment:", error);
            toast.error("Failed to submit appointment. Please try again later.")
        } finally {
            setIsLoading(false)
            setIsSubmitted(false)
            setPaymentSuccess(false)
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
            appointmentDate: date ?? undefined,
            appointmentTime: "",
            appointmentFormattedDate: "",
            doctorId: doctor.id ?? "",
            doctorName: doctor.name ?? "",
            patientId: patientData?.patientId ?? "",
            fee: doctor.doctorProfile?.hourlyWage ?? 0,
            status: "",
            meetingLink: "",
            meetingProvider: "",
            transactionId: "",
            paymentStatus: "pending",
            paymentMethod: "",
            paidAmount: 0,
            reference: "",
            
        });
        setErrors({});
        setRegister(false);
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

    //Payment Service
    const transactionConfig: TransactionConfigProps  = {
        reference: (new Date()).getTime().toString(),
        email: appointment?.email ?? "John@example.com",
        amount: doctor.doctorProfile?.hourlyWage ?? 0,
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "",
    
    }

    //const initializePayment = usePaystackPayment(transactionConfig);
    useEffect(() => {
        setIsClient(true)
    },[])

    const handleOnSuccess = (ref: any) => {
        setPaymentDetails({
            transactionId: ref.transaction,
            paymentStatus: ref.status,
            paymentMethod: 'card',
            paidAmount: doctor.doctorProfile?.hourlyWage??0,
            reference: ref.reference,
        })
        setPaymentSuccess(true);
        setStep(currStep => currStep+1)
        console.log("Payment References:", ref);
        
    };
    //console.log("Payment Details:", paymentDetails);

    const handleOnClose = () => {
        setStep(currStep => currStep-1)
        console.log('closed')
    }

    const componentProps = {
        ...transactionConfig,
        onSuccess: (reference: any) => handleOnSuccess(reference),
        onClose: handleOnClose,
    };

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
                    {step >= 4 ? ("") : ("Patient Information Form")}
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
                    <div className='p-8'>
                        {step === 3 ? (
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
                            <div className='p-8'>
                                {step === 4 ? (
                                    <Card className='w-full flex py-3 flex-col items-center max-w-md mx-auto'>
                                    <CardHeader>
                                        <CardTitle className='text-3xl font-bold text-center'>
                                            Make a Payment
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className='space-y-6 border-none shadow-none'>
                                        <div className='text-center'>
                                            <p className='text-sm text-muted-foreground'>
                                                Total Amount
                                            </p>
                                            <p className='text-4xl font-bold'>
                                                THB {doctor.doctorProfile?.hourlyWage.toLocaleString()}
                                                {" "}
                                            </p>
                                        </div>
                                    </CardContent>
                                    <CardFooter className='w-full justify-center'>
                                        {isClient && (
                                            <div className='w-full'>
                                                <PaystackButton
                                                    className='bg-gradient-to-r from-indigo-300 to-cyan-300 
                                                    dark:bg-blue-600 text-primary-foreground dark:text-slate-100 
                                                    shadow hover:bg-gradient-to-r hover:from-indigo-500 
                                                    hover:to-cyan-500 w-full h-12 rounded-md px-8 text-lg' 
                                                    {...componentProps} 
                                                >
                                                <div className='flex justify-center items-center gap-4'>
                                                    <span>Pay with Paystack</span>
                                                    <Image 
                                                        src={paystackLogo}
                                                        alt="paystack"
                                                        width={512}
                                                        height={504}
                                                        className='w-4 h-4'
                                                    />  
                                                </div>      
                                                </PaystackButton>
                                            </div>
                                        )}
                                    </CardFooter>
                                    </Card>
                                ) : (
                                    <div className={cn("grid gap-6 mx-auto px-6")}>
                                        <form onSubmit={handleSubmit}>
                                            {/* <div className="">
                                                <div className="grid grid-cols-2 gap-6">
                                                    {isClient && (
                                                        <div>
                                                            <Button
                                                                type={"button"}
                                                                variant={"outline"} 
                                                                size={"full"}
                                                                onClick={() => {
                                                                initializePayment({onSuccess, onClose})
                                                            }}>Pay with PayStack (NGN)
                                                            <Image 
                                                                src={paystackLogo}
                                                                alt="paystack"
                                                                width={512}
                                                                height={504}
                                                                className='w-4 h-4' 
                                                            />
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div> */}
                                            <div className='mt-8 flex justify-center items-center gap-4'>
                                                {paymentSuccess ? (
                                                    <Card className='w-full flex py-3 flex-col 
                                                    items-center max-w-md mx-auto bg-green-50'>
                                                        <CardHeader>
                                                            <CardTitle className='text-3xl flex items-center 
                                                            gap-2 font-bold text-center text-green-600'>
                                                                <CheckCircle  className='w-20 h-20 text-green-600'/>
                                                                Payment Successful
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent className='space-y-6 border-none shadow-none'>
                                                            <div className='text-center'>
                                                                <p className='text-sm text-muted-foreground'>
                                                                    Transaction No: {paymentDetails.transactionId}

                                                                </p>
                                                            </div>
                                                        </CardContent>
                                                        <CardFooter className='justify-center'>
                                                            {isClient && (
                                                                <div className='w-full'>
                                                                    <SubmitButton 
                                                                        title={'Complete Appointment'} 
                                                                        isLoading={isLoading} 
                                                                        loadingTitle={''}                                    
                                                                    />
                                                                </div>
                                                            )}
                                                        </CardFooter>
                                                    </Card> 
                                                ) : (
                                                    <Card className='w-full flex py-3 flex-col 
                                                items-center max-w-md mx-auto'>
                                                    <CardHeader>
                                                        <CardTitle className='text-3xl font-bold text-center'>
                                                            Payment Successful
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className='space-y-6 border-none shadow-none'>
                                                        <div className='text-center'>
                                                            <p className='text-sm text-muted-foreground'>
                                                                Total Amount
                                                            </p>
                                                            <p className='text-4xl font-bold'>
                                                                THB {doctor.doctorProfile?.hourlyWage.toLocaleString()}
                                                                {" "}
                                                            </p>
                                                        </div>
                                                    </CardContent>
                                                    <CardFooter className='justify-center'>
                                                        {isClient && (
                                                            <div className='w-full'>
                                                                <SubmitButton 
                                                                    title={'Complete Appointment'} 
                                                                    isLoading={isLoading} 
                                                                    loadingTitle={''}                                    
                                                                />
                                                            </div>
                                                        )}
                                                    </CardFooter>
                                                </Card>
                                                )}
                                                    
                                            </div>
                                        </form>
                                </div>
                                )}
                            </div>
                        )}
                    </div>
                    
                )}
                 
            </div>
        )}

    </div>
   

  )
}

export default DoctorDetails