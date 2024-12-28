import { cn } from "@/lib/utils";
import { generateInitial } from "@/utils/generateInitial";
import { DoctorStatus } from "@prisma/client";
import Image from 'next/image';
import ApproveBtn from "../Dashboard/ApproveBtn";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import Link from "next/link";



export default function SalesCard({
    name,
    email,
    image,
    status,
    profileId,
    className=""
}: {
    name: string;
    email: string;
    image: string | undefined | null;
    status?: DoctorStatus;
    profileId: string | undefined;
    className?: string;
}) {

    const initial = generateInitial(name)

    return (
      <div className={cn('flex justify-between items-center gap-3',className)}>
            <section className='flex items-center gap-3'>
                <div className=''>
                    {image && image.length > 0 ? (
                        <Image 
                        src={image??initial} 
                        alt={`${generateInitial(name)}`} 
                        width={200} 
                        height={200}
                        className="rounded-full bg-gray-100 p-1 h-12 w-12 object-contain"
                        />
                    ): (
                        <Avatar>
                            <AvatarFallback className='rounded-full bg-gray-100 dark:bg-slate-600 self-center p-1 h-12 w-12'>{initial}</AvatarFallback>
                        </Avatar>
                    )}
                    
                </div>
                <div className='text-sm'>
                    <p>{name}</p>
                    <div className='text-ellipsis overflow-hidden 
                    whitespace-nowrap w-[120px] sm:w-auto text-gray-400'
                    >
                        {email}
                    </div>
                </div>
            </section>
            {status ? (
                <ApproveBtn status={status} profileId={profileId} />
            ) : (
                <Button asChild variant={"outline"}>
                    <Link href={`/dashboard/patients/view/${profileId}`}>
                        View
                    </Link>
                </Button>
            )}
            
      </div>
    )
}