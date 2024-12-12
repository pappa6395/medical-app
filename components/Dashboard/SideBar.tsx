"use client"

import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import LogoutButton from "./LogoutButton";
import {
  Bell, 
  Calendar, 
  CalendarClock, 
  CalendarDays, 
  CircleUser, 
  ClipboardList, 
  Globe, 
  Home, 
  Icon, 
  LineChart, 
  LucideProps, 
  Mail, 
  Menu, 
  Package, 
  Package2, 
  Search, 
  Settings, 
  ShoppingCart, 
  Users 
} from "lucide-react"
import { Badge } from "@/components/ui/badge";
import {
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";


export default function SideBar({session}: {session: Session}) {

    const { user } = session;
    const role = user?.role
    const pathName = usePathname();
    const roles = {
        USER: [
            { title: "Dashboard", path: "/dashboard", icon: Home },
            {
                title: "My Appointments",
                path: "/dashboard/user/appointments",
                icon: CalendarClock
            },
            {
                title: "Settings",
                path: "/dashboard/user/settings",
                icon: Settings
            },
        ],
        ADMIN: [
            { title: "Dashboard", path: "/dashboard", icon: Home },
            { title: "Doctors", path: "/dashboard/doctors", icon: Users },
            { title: "Patients", path: "/dashboard/patients", icon: CircleUser },
            { title: "Appointments", path: "/dashboard/appointments", icon: CalendarDays },
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
            { title: "Tasks", path: "/dashboard/doctor/tasks", icon: ClipboardList },
            { title: "Inbox", path: "/dashboard/doctor/inbox", icon: Mail },
            {
                title: "Settings",
                path: "/dashboard/doctor/settings",
                icon: Settings,
            }
        ],
    };
    console.log("Role:",role);
    let sideBarLinks = roles[role] || [];
    
    // const sideBarLinks = [
    //     {
    //         name: "Dashboard",
    //         path: "/dashboard",
    //         icon: Home
    //     },
    //     {
    //         name: "Products",
    //         path: "/dashboard/products",
    //         icon: Package 
    //     },
    //     {
    //         name: "Orders",
    //         path: "/dashboard/orders",
    //         icon: ShoppingCart, 
    //         badgeCount: 6
    //     },
    //     {
    //         name: "Customers",
    //         path: "/dashboard/customers",
    //         icon: Users
    //     },
    //     {
    //         name: "Analytics",
    //         path: "/dashboard/analytics",
    //         icon: LineChart
    //     },
    //     {
    //         name: "Settings",
    //         path: "/dashboard/settings",
    //         icon: Settings
    //     },
    //     {
    //         name: "Online",
    //         path: "/dashboard/settings",
    //         icon: Globe
    //     },

    // ]
    

  return (

    <div className='hidden border-r bg-muted/40 md:block'>
            <div className='flex h-full mx-h-screen flex-col gap-2'>
                <div className='flex h-14 items-center border-b px-4 
                lg:h-[60px] lg:px-6'>
                    <Link href="/" className='flex items-center gap-2 font-semibold'>
                        <Package2 className='h-6 w-6' />
                        <span className=''>Acme Inc</span>
                    </Link>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        className='ml-auto h-8 w-8'
                    >
                        <Bell className='h-4 w-4' />
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
                                        {/* {item.badgeCount && (
                                        <Badge className='ml-auto flex h-6 w-6 
                                        shrink-0 items-center justify-center 
                                        rounded-full'
                                        >
                                            {item.badgeCount}
                                        </Badge>
                                        )} */}
                                    </Link>
                                )
                            })
                        }
                    </nav>
                </div>
                <div className='p-4'>
                    <Card>
                        <CardHeader className="p-2 pt-0 md:p-4">
                            <CardTitle>Upgrade to Pro</CardTitle>
                            <CardDescription>
                                Unlock all features and get unlimited access 
                                to our support team.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                            <Button size="sm" className='w-full'>
                                Upgrade
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
  );
}