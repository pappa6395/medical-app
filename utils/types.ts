import { UserRole } from "@prisma/client";
import { StaticImageData } from "next/image";

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