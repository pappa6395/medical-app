import { Speciality } from '@prisma/client';
import Link from 'next/link'
import React from 'react'

type LinkCardProps ={
    className?: string;
    specialties?: Speciality[];
}

const LinkCard = ({
    className,
    specialties,
}: LinkCardProps) => {


  return (

    <div className='grid lg:grid-cols-5 
        md:grid-cols-3 sm:grid-cols-2 
        grid-col-1 gap-6'>
            {specialties && specialties.map((item, i) => {
                return (
                    <Link href={`/specialty/${item.slug}`} key={i} className={`flex gap-4
                        text-slate-50 rounded-md py-3 px-6 ${className} justify-between`}>
                            <h2>{item.title}</h2>
                            <span aria-hidden="true">&rarr;</span>
                    </Link>
                )
            })}
    </div>
  )
}

export default LinkCard