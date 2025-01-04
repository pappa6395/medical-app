"use client"

import { cn } from "@/lib/utils";
import { generateInitial } from "@/utils/generateInitial";
import { DoctorStatus, UserRole } from "@prisma/client";
import Image from 'next/image';
import ApproveBtn from "../Dashboard/ApproveBtn";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import Link from "next/link";



export default function SalesCard({
    name="",
    email="",
    role=undefined,
    image=null,
    status="PENDING",
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
            <section className='flex items-center gap-3'>
                <div className=''>
                    {image && image.length > 0 ? (
                        <Image 
                        src={image??initial} 
                        alt={`${generateInitial(name)??""}`} 
                        width={200} 
                        height={200}
                        className="rounded-full bg-gray-100 p-1 h-12 w-12 object-contain flex-shrink-0"
                        />
                    ): (
                        <Avatar>
                            <AvatarFallback className='rounded-full bg-gray-100 dark:bg-slate-600 self-center p-1 h-12 w-12'>{initial??""}</AvatarFallback>
                        </Avatar>
                    )}
                    
                </div>
                <div className='text-sm'>
                    <p>{name??""}</p>
                    <div className='text-ellipsis overflow-hidden
                    whitespace-nowrap w-[120px] sm:w-auto text-gray-400'
                    >
                        {email??""}
                    </div>
                </div>
            </section>
            {!status && (
                <Button asChild variant={"outline"}>
                    <Link href={`/dashboard/${role==="DOCTOR" ? "doctor/patients" : role ==="USER" ? "user/doctors" : "doctors"}/view/${profileId??""}`}>
                        View
                    </Link>
                </Button>
            )}
      </div>
    )
}