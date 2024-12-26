import { cn } from "@/lib/utils";
import { generateInitial } from "@/utils/generateInitial";
import { DoctorStatus } from "@prisma/client";
import Image from 'next/image';



export default function SalesCard({
    name,
    email,
    image,
    wage,
    status,
    className=""
}: {
    name: string;
    email: string;
    image: string | undefined | null;
    wage: number | undefined;
    status: DoctorStatus | undefined | null;
    className?: string;
}) {
    return (
      <div className={cn('flex justify-between items-center gap-3',className)}>
            <section className='flex items-center gap-3'>
                <div className=''>
                    <Image 
                        src={image??`${generateInitial(name)}`} 
                        alt="avatar" 
                        width={200} 
                        height={200}
                        className="rounded-full bg-gray-100 p-1 h-12 w-12 object-contain"
                        />
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
            <button className={cn("py-1 px-1 rounded-full text-[10px] font-semibold dark:text-slate-600 text-slate-100",
                status==="APPROVED"? "bg-green-500" 
                : status==="PENDING"?"bg-amber-500"
                :"bg-red-500")}>
                {status}
            </button>
      </div>
    )
  }