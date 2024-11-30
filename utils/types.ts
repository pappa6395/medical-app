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
    role: UserRole;
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