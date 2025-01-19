"use client"

import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Bell, 
  BookOpenText, 
  BriefcaseMedical, 
  Calendar, 
  CalendarClock, 
  CalendarDays, 
  CircleUser, 
  ClipboardList, 
  DollarSign, 
  Globe, 
  Home, 
  Icon, 
  LineChart, 
  LucideProps, 
  Mail, 
  Menu, 
  Microscope, 
  Package, 
  Package2, 
  Pencil, 
  Power, 
  Search, 
  Settings, 
  ShoppingCart, 
  Syringe, 
  UserRoundPen, 
  Users 
} from "lucide-react"

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from 'next/image'


export default function SideBar({session}: {session: Session}) {

    const { user } = session;
    const role = user?.role
    const id = user?.id

    const pathName = usePathname();
    const router = useRouter()

    const roles = {
        USER: [
            { title: "Dashboard", path: "/dashboard", icon: Home },
            {
                title: "My Appointments",
                path: "/dashboard/user/appointments",
                icon: CalendarClock
            },
            { 
                title: "Doctors", 
                path: "/dashboard/user/doctors", 
                icon: CircleUser 
            },
            {   title: "Inbox", 
                path: "/dashboard/user/inbox", 
                icon: Mail 
            },
            {
                title: "Settings",
                path: "/dashboard/user/settings",
                icon: Settings
            },
        ],
        ADMIN: [
            { title: "Dashboard", path: "/dashboard", icon: Home },
            { title: "Services", path: "/dashboard/services", icon: Syringe },
            { title: "Specialties", path: "/dashboard/specialties", icon: BriefcaseMedical },
            { title: "Symptoms", path: "/dashboard/symptoms", icon: Microscope },
            { title: "Doctors", path: "/dashboard/doctors", icon: Users },
            { title: "Patients", path: "/dashboard/patients", icon: CircleUser },
            { title: "Appointments", path: "/dashboard/appointments", icon: CalendarDays },
            { title: "Blogs", path: "/dashboard/blogs", icon: BookOpenText },
            {
                title: "Settings",
                path: "/dashboard/settings",
                icon: Settings,
            }
        ],
        DOCTOR: [
            { title: "Dashboard", path: "/dashboard", icon: Home },
            { title: "Patients", path: "/dashboard/doctor/patients", icon: CircleUser },
            { title: "Appointments", path: "/dashboard/doctor/appointments", icon: CalendarDays },
            { title: "Sales", path: "/dashboard/doctor/sales", icon: DollarSign },
            { title: "Inbox", path: "/dashboard/doctor/inbox", icon: Mail },
            { title: "Compose", path: "/dashboard/doctor/compose", icon: Pencil },
            { 
                title: "Profile", 
                path: `/dashboard/doctor/profile/${id}`, 
                icon: UserRoundPen },
            {
                title: "Settings",
                path: "/dashboard/doctor/settings",
                icon: Settings,
            }
        ],
    };
    let sideBarLinks = roles[role] || [];
    
    const handleLogout = async() => {
        await signOut();
        localStorage.clear();
        document.cookie = "";
        router.push("/login");
    }
    

  return (

    <div className='hidden border-r bg-muted/40 md:block dark:bg-slate-900'>
            <div className='flex h-full mx-h-screen flex-col gap-2'>
                <div className='flex h-14 items-center border-b px-4 
                lg:h-[60px] lg:px-6'>
                    <Link href="/" className='flex items-center gap-2 font-semibold'>
                        <Image 
                            src={'/Medical-Care Logo2.png'} 
                            alt="logo" 
                            width={40} 
                            height={40}
                        />
                        <span className=''>Medical-Care</span>
                    </Link>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        className='ml-auto h-8 w-8'
                    >
                        <Bell className='h-4 w-4 dark:bg-slate-950' />
                        <span className='sr-only'>Toggle notifications</span>
                    </Button>
                </div>
                <div className=''>
                    <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
                        {
                            sideBarLinks.map((item, i) => {
                                const Icon = item.icon
                                return (
                                    <Link
                                        key={i}
                                        href={item.path}
                                        className={cn(
                                            'flex items-center gap-3 rounded-lg px3 py-2 text-muted-foreground transition-all hover:text-primary',
                                             pathName === item.path ? "bg-muted text-primary" : "" )}
                                    >   
                                        {Icon && <Icon className='h-5 w-5' />}
                                        {item.title}
                                    </Link>
                                )
                            })
                        }
                    </nav>
                </div>
                <div className='mt-auto p-4'>
                   <Button onClick={handleLogout} size={"sm"} className="w-full">
                    <Power className="w-4 h-4 mr-1"/>
                    Logout
                   </Button>
                </div>
            </div>
        </div>
  );
}