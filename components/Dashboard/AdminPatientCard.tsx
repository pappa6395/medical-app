"use client"

import { cn } from "@/lib/utils";
import { generateInitial } from "@/utils/generateInitial";
import { DoctorStatus, UserRole } from "@prisma/client";
import Image from 'next/image';

import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";



export default function AdminPatientCard({
    name="",
    email="",
    role=undefined,
    image=null,
    status=undefined,
    profileId="",
    className=""
}: {
    name: string;
    email: string;
    role?: UserRole | undefined;
    image?: string | null;
    status?: DoctorStatus;
    profileId: string;
    className?: string;
}) {

    const initial = generateInitial(name) || "";

    return (
      <div className={cn('flex justify-between items-center gap-3',className)}>
            <div className='flex items-center gap-3'>
                <div className='w-12'>
                    {image && image.length > 0 ? (
                        <Image 
                        src={image??initial} 
                        alt={`${generateInitial(name)??""}`} 
                        width={200} 
                        height={200}
                        className="rounded-full bg-gray-100 p-1 h-12 w-12 object-contain flex-shrink"
                        />
                    ): (
                        <Avatar>
                            <AvatarFallback className='rounded-full bg-gray-100 dark:bg-slate-600 self-center p-1 h-12 w-12'>{initial??""}</AvatarFallback>
                        </Avatar>
                    )}
                    
                </div>
                <div className='text-sm w-auto mx-auto'>
                    <p>{name??""}</p>
                    <div className='truncate text-gray-400'
                    >
                        {email??""}
                    </div>
                </div>
            </div>
            {!status && (
                <Button asChild variant={"outline"}>
                    <Link href={`/dashboard/patients/view/${profileId??""}`}>
                        View
                    </Link>
                </Button>
            )}
      </div>
    )
}