"use client";

import React from "react";
import { useRouter } from "next/navigation";
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
  CircleUser, 
  Home, 
  LineChart, 
  Menu, 
  Package, 
  Package2, 
  Search, 
  ShoppingCart, 
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



export default function NavBar({session}: {session: Session} ) {

    const user = session.user

    const router = useRouter();

    async function handleLogout() {
        await signOut()
        router.push("/login");
    }

  return (
    <header className='flex h-14 items-center 
            gap-4 border-b bg-muted/40 px-4 
            lg:h-[60px] lg:px-6'
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
                            <Link 
                                href="#"
                                className='flex items-center gap-2 
                                text-lg font-semibold'
                            >
                                <Package2 className='h-6 w-6' />
                                <span className='sr-only'>Acme Inc</span>
                            </Link>
                            <Link 
                                href="#"
                                className='mx-[-0.65rem] flex items-center 
                                gap-4 rounded-xl px-3 py-2 
                                text-muted-foreground hover:text-foreground'
                            >
                                <Home className='h-5 w-5' />
                                Dashboard
                            </Link>
                            <Link 
                                href="#"
                                className='mx-[-0.65rem] flex items-center 
                                gap-4 rounded-xl px-3 py-2 
                                text-muted-foreground hover:text-foreground'
                            >
                                <ShoppingCart className="h-5 w-5" />
                                Orders
                                <Badge className="ml-auto flex h-6 w-6 
                                shrink-0 items-center justify-center 
                                rounded-full">
                                    6
                                </Badge>
                            </Link>
                            <Link
                                href="#"
                                className="mx-[-0.65rem] flex items-center 
                                gap-4 rounded-xl px-3 py-2 
                                text-muted-foreground hover:text-foreground"
                            >
                                <Package className="h-5 w-5" />
                                Products
                            </Link>
                                <Link
                                href="#"
                                className="mx-[-0.65rem] flex items-center 
                                gap-4 rounded-xl px-3 py-2 
                                text-muted-foreground hover:text-foreground"
                            >
                                <Users className="h-5 w-5" />
                                Customers
                            </Link>
                            <Link
                                href="#"
                                className="mx-[-0.65rem] flex items-center 
                                gap-4 rounded-xl px-3 py-2 
                                text-muted-foreground hover:text-foreground"
                            >
                                <LineChart className="h-5 w-5" />
                                Analytics
                            </Link>
                        </nav>
                        <div className="mt-auto">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Upgrade to Pro</CardTitle>
                                    <CardDescription>
                                    Unlock all features and get unlimited access to our
                                    support team.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button size="sm" className="w-full">
                                    Upgrade
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
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
                            :  <AvatarFallback>MA</AvatarFallback> }
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

