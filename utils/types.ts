import { DoctorProfile, Speciality, UserRole } from "@prisma/client";
import { LucideIcon } from "lucide-react";
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
    role?: string | string[] | undefined;
    plan?: string | string[] | undefined;
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
    customer: string;
    email: string;
    type: string;
    status: string;
    date: string;
    amount: string;
};

export type SalesProps = {
    name: string
    email: string
    salesAmount: string
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
    title: string;
    size: string;
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
    phone: string;
    doctorProfile: DoctorProfileCard | null;
}

export type DoctorDetail = {
    id: string;
    name: string;
    slug: string;
    email: string;
    phone: string;
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
    gender: string;
    bio: string | null;
    profilePicture: string | null;
    availability: DoctorProfileAvailability | null;
    hourlyWage: number;
    operationMode: string | null;
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
}

export interface AppointmentProps {
    appointmentDate: Date | undefined;
    appointmentTime: string;
    appointmentFormattedDate: string;
    doctorId: string;
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

export type ServiceDoctorProfileCountProps = {
    id: string;
    title: string;
    slug: string;
    imageUrl: string;
    _count: {
        doctorProfile: number;
    };
}
