import { UserRole } from "@prisma/client";
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
    label: string;
    icon: LucideIcon;
    amount: string;
    discription: string;
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
    page: string;
}

export type AdditionalInfoFormProps = {
    educationHistory: string;
    research: string;
    accomplishments: string;
    additionalDocuments: string[];
    page: string;
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
}