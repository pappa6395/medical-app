import { cn } from "@/lib/utils";
import { generateInitial } from "@/utils/generateInitial";
import { DoctorStatus } from "@prisma/client";
import Image from 'next/image';
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { formattedDate } from "@/utils/formattedDate";



export default function SalesCard({
    name,
    email,
    image,
    status,
    appointmentId,
    createdAt,
    className=""
}: {
    name: string;
    email: string;
    image: string | undefined | null;
    status?: DoctorStatus;
    appointmentId: string | undefined;
    createdAt: Date | undefined; 
    className?: string;
}) {

    const initial = generateInitial(name)
    const createDate = createdAt?.toLocaleDateString("en-us", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })

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
                    <p>{name} <span className="text-xs">({createDate})</span></p>
                    <div className='text-ellipsis overflow-hidden 
                    whitespace-nowrap w-[120px] sm:w-auto text-gray-400'
                    >
                        {email}
                    </div>
                </div>
            </section>
            <div>
                <Button asChild variant={"outline"} className="text-xs mr-2">
                    <Link href={`/dashboard/appointments/view/${appointmentId}`}>
                        View
                    </Link>
                </Button>
            </div>
      </div>
    )
}