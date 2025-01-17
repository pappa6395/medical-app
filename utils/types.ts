import { Account, BlogCategory, Blogs, DoctorProfile, DoctorStatus, PaymentStatus, Sale, Service, Session, Speciality, UserRole } from "@prisma/client";
import { LucideIcon, LucideProps } from "lucide-react";
import { StaticImageData } from "next/image";
import { ReactNode } from "react";
import { Icons } from "@/components/ui/icons"

export interface ServiceProps {
    title: string;
    image: StaticImageData;
    slug: string;
}

export type RegisterInputProps = {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    token?: number;
    role?: string | string[] | undefined;
    plan?: string | string[] | undefined;
}

export type AdminProps = {
    name: string;
    email: string;
    role: UserRole | undefined;
    phone: string;
}

export type UserProps = {
    id: string;
  name: string;
  slug: string;
  email: string;
  phone?: string;
  emailVerified?: Date;
  image?: string;
  role: UserRole;
  plan?: string;
  password?: string;
  accounts: Account[]
  sessions: Session[]
  isVerfied: boolean;
  doctorProfile?: DoctorProfile
  token?: number;
  serviceId?: string;
  service?: Service
  specialityId?: string;
  speciality?: Speciality;
  symptomIds: string[]
  provider?:          string
  providerAccountId?: string
    
}

export type LoginProps = {
    email: string;
    password: string;
}

export type FAQItem = {
    qn: string;
    ans: string | JSX.Element; // Answer can be plain text or HTML
};

export type CardTotalProps = {
    title: string;
    icon: LucideIcon;
    count: string | null;
    href: string;
};

export type CardTransactionProps = {
    id: string | undefined | null;
    customer: string | undefined | null;
    transactionId: string | undefined | null;
    email: string | undefined | null;
    status: string | undefined;
    date: string;
    amount: number | undefined | null;
    role: UserRole | undefined;
};

export type SalesProps = {
    name: string
    email: string
    salesAmount: string
    image: string | null;
}

export type TabsSettingCategoryProps = {
    title: string;
    description: string;
    value: string;
    component: ReactNode;
}

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

export type BioDataFormProps = {
    firstName: string;
    lastName: string;
    middleName?: string;
    dob?: Date;
    gender: string;
    page: string;
    userId?: string | undefined;
    trackingNumber: string;
}

export type ProfileInfoFormProps = {
    medicalLicense: string;
    yearsOfExperience: number;
    medicalLicenseExpiry?: Date;
    bio: string;
    profilePicture?: string;
    page: string;
}

export type NewProfileInfoFormProps = {
    medicalLicense: string;
    yearsOfExperience: number;
    medicalLicenseExpiry?: String | undefined;
    bio: string;
    profilePicture?: string;
    page: string;
}

export type ContactInfoFormProps = {
    email: string;
    phone: string;
    country: string;
    city: string;
    state: string;
    page: string;
}

export type EducationInfoFormProps = {
    medicalSchool: string;
    graduationYear: string;
    primarySpecialization: string;
    otherSpecialties: string[];
    boardCertificates: string[];
    page: string;
}

export type PracticeInfoFormProps = {
    hospitalName: string;
    hospitalAddress: string;
    hospitalContactNumber: string;
    hospitalEmailAddress: string;
    hospitalWebsite?: string;
    hospitalHoursOfOperation: string;
    servicesOffered: string[];
    insuranceAccepted: string;
    languagesSpoken: string[];
    hourlyWage: number;
    page: string;
}

export type AdditionalInfoFormProps = {
    educationHistory: string;
    research: string;
    accomplishments: string;
    additionalDocuments: string[];
    page: string;
}

export type FileProps = {
    formatToBytes(size: any): React.ReactNode;
    title?: string;
    size?: number;
    url: string;
}

export type AvailabilityInfoFormProps = {
    meetingDuration: string;
    meetingAvailability: string;
    page: string;
}
   
export type GenderOptionProps = {
    value: string;
    label: string;
    description: string;
}

export type StepFormProps = {
    page: string; 
    title: string; 
    description: string;
    userId?: string | undefined;
    nextPage?: string;
    formId?: string;
    specialties?: Speciality[];
    doctorProfile: DoctorProfile | null;
}

export type ServiceFormProps = {
    title: string;
    imageUrl: string;
    slug: string;
};

export type SpecialtyFormProps = {
    title: string;
    slug: string;
};

export type SymptomFormProps = {
    title: string;
    slug: string;
};

export type StatsProps = {
    doctors: string;
    patients: string;
    appointments: string;
    services: string;
};

export type ShadSelectInputProps = {
    label: string;
    className?: string;
    optionTitle: string;
    options: ShadSelectOptionProps[];
    selectOption: string;
    setSelectOption: (value: string) => void;
}

export type ShadSelectOptionProps = {
    value: string;
    label: string;
}

export type MultiSelectInputProps = {
    label: string;
    className?: string;
    optionTitle: string;
    options: ShadSelectOptionProps[];
    selectOption: ShadSelectOptionProps[];
    setSelectOption: (value: ShadSelectOptionProps[]) => void;
}

export type Doctor = {
    id: string;
    name: string;
    slug: string;
    email: string;
    phone: string | null;
    doctorProfile: DoctorProfileCard | null;
}

export type DoctorDetail = {
    id: string | undefined;
    name: string;
    slug: string;
    email: string;
    phone: string | null;
    doctorProfile: DoctorProfileDetails | null;
}

export type DoctorProfileAvailability = {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
}

export type DoctorProfileCard = {
    id: string;
    firstName: string;
    lastName: string;
    middleName?: string | null;
    dob?: Date | null;
    gender: string;
    bio: string | null;
    profilePicture: string | null;
    availability: DoctorProfileAvailability | null;
    hourlyWage: number;
    hospitalAddress: string | null;
    operationMode: string | null;
    status: DoctorStatus | null;
    primarySpecialization: string | null;
}

export interface DoctorProfileDetails extends DoctorProfileCard {
    city: string | null;
    state: string | null;
    country: string | null;
    yearsOfExperience: number | null;
    medicalLicense: string | null;
    medicalLicenseExpiry: Date | null;
    boardCertificates: string[] | null;
    otherSpecialties: string[] | null;
    primarySpecialization: string | null;
    medicalSchool: string | null;
    hospitalName: string | null;
    hospitalAddress: string | null;
    hospitalContactNumber: string | null;
    hospitalEmailAddress: string | null;
    hospitalHoursOfOperation: string | null;
    hospitalWebsite: string | null;
    research: string | null;
    accomplishments: string | null;
    additionalDocuments: string[] | null;
    graduationYear: string | null;
    educationHistory: string | null;
    servicesOffered: string[] | null;
    insuranceAccepted: string | null;
    languagesSpoken: string[] | null;
    status: DoctorStatus | null;
    
}

export interface AppointmentProps {
    appointmentDate: Date | undefined;
    appointmentTime: string;
    appointmentFormattedDate: string;
    doctorId: string;
    doctorName: string;
    fee: number;

    // Patient information
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    phone: string;
    dob: Date | undefined;
    location: string;
    appointmentReason: string;
    medicalDocument: string[];
    occupation: string;
    patientId: string;

    status: string;
    meetingLink: string;
    meetingProvider: string;

    transactionId: string;
    paymentStatus: PaymentStatus;
    paymentMethod: string;
    paidAmount: number;
    reference: string;
}

export interface TransactionConfigProps {
    reference: string;
    email: string;
    amount: number;
    publicKey: string;
}

export interface AppointmentSaleProps {  
    id: string | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    transactionId: string | null;
    paidAmount: number | null;
    paymentStatus: PaymentStatus;
    paymentMethod: string | null;
    createdAt: Date;
    sale: SaleAppProps[]
}

export type SaleAppProps = {
    appointmentId: string | null;         
    doctorId: string | null;           
    doctorName: string | null;      
    patientId: string | null;
    patientName: string | null;     
    totalAmount: number | null;   
}

export type StatusOptionsProps = {
    label: string;
    value: string;
    description: string;
}

export type UpdateAppointmentFormProps = {
    status: string;
    meetingLink: string;
    meetingProvider: string;
}

export type PatientProps = {
    patientId: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    gender: string;
    occupation: string;
    doctorId: string;
    dob: Date | undefined;
}

export type DoctorProps = {
    doctorId: string;
    doctorName: string | null;
}

export type ServiceDoctorProfileCountProps = {
    id: string;
    title: string;
    slug: string;
    imageUrl: string;
    _count: {
        doctorProfile: number;
    };
}

export type AnalyticProps = {
    title: string;
    count: number;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    unit: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    detailLink: string;
}

export type InboxProps = {
    recieverId: string ;
    senderId: string;   
    senderName: string;
    senderEmail: string;
    message: string; 
    subject: string;
}

export type ComposeMailProps = {
    to: string;
    subject: string;
    message: string;
    attachments: FileProps[];
}

export interface TokenData {
    roomId: string;
    userName: string;
    role: string;
};

export type ReviewCardProps = {
    id: string;
    comment: string;
    rating: number;
    reviewerName: string;
    reviewerImage: string;
    reviewerTitle: string;
    videoLink: string;
    approved: boolean;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
};

export type BlogProps ={
    title: string;
    slug: string;
    imageUrl: string;
    tags: string;
    summary: string;
    content: string;
    categoryId: string;
}

export type BlogCategoryProps = {
    title: string;
    slug: string;
}

export interface IBlogCategoryProps extends BlogCategoryProps {
    blogs: Blogs[]
}

export interface IBlog extends Blogs {
    category: BlogCategory
}

export type SelectOptionProps = {
    label: string;
    value: string;
};