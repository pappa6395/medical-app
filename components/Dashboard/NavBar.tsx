"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger
} from "@/components/ui/sheet";
import {
  Bell, 
  BriefcaseMedical, 
  CalendarClock, 
  CalendarDays, 
  CircleUser, 
  Home, 
  LineChart, 
  Mail, 
  Menu, 
  Microscope, 
  Package, 
  Package2, 
  Search, 
  Settings, 
  ShoppingCart, 
  Syringe, 
  Users 
} from "lucide-react"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu";
import { Input } from "@/components/ui/input";
import ModeToggle from "../ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { generateInitial } from "@/utils/generateInitial";
import { cn } from "@/lib/utils";



export default function NavBar({session}: {session: Session} ) {

    const user = session.user
    const name = user?.name?? ""
    const initial = generateInitial(name)

    const router = useRouter();
    const pathName = usePathname();

    const role = user?.role

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
            { title: "Services", path: "/dashboard/services", icon: Syringe },
            { title: "Specialties", path: "/dashboard/specialties", icon: BriefcaseMedical },
            { title: "Symptoms", path: "/dashboard/symptoms", icon: Microscope },
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
            { title: "Inbox", path: "/dashboard/doctor/inbox", icon: Mail },
            {
                title: "Settings",
                path: "/dashboard/doctor/settings",
                icon: Settings,
            }
        ],
    };
    let sideBarLinks = roles[role] || [];
    

    async function handleLogout() {
        await signOut()
        router.push("/login");
    }

  return (
    <header className='flex h-14 items-center 
            gap-4 border-b bg-muted/40 px-4 
            lg:h-[60px] lg:px-6 dark:bg-slate-900'
            >
                <Sheet>
                    <SheetTrigger asChild>
                        <Button 
                            variant="outline" 
                            size="icon" 
                            className='shrink-0 md:hidden'>
                            <Menu className='h-5 w-5' />
                            <span className='sr-only'>Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className='flex flex-col'>
                        <SheetHeader>
                            <SheetTitle>
                                Medical-App
                            </SheetTitle>
                            <SheetDescription>
                                Medical Online Services
                            </SheetDescription>
                        </SheetHeader>
                        <nav className='grid gap-2 text-lg font-medium'>
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
                    </SheetContent>
                </Sheet>
                <div className="w-full flex-1">
                    <form>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                            type="search"
                            placeholder="Search products..."
                            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                            />
                        </div>
                    </form>
                </div>
                <ModeToggle />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <Avatar>
                            {user.image ? 
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> 
                            :  <AvatarFallback>{initial}</AvatarFallback> }
                        </Avatar>
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="text-center">{user.name}</DropdownMenuLabel>
                    <DropdownMenuLabel className="text-center text-muted-foreground">{user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href={"/"}>Home</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleLogout()}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </header>
  );
}

