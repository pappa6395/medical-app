import { Speciality, Symptom } from '@prisma/client';
import Link from 'next/link';
import React from 'react'

type SymptomCardProps ={
    className?: string;
    symptoms?: Symptom[];
}

const SymptomCard = ({
    className,
    symptoms,
}: SymptomCardProps) => {


  return (

    <div className='grid lg:grid-cols-5 
        md:grid-cols-3 sm:grid-cols-2 
        grid-col-1 gap-6'>
            {symptoms && symptoms.map((item, i) => {
                return (
                    <Link href={`/symptom/${item.slug}?id=${item.id}`} key={i} className={`flex gap-4
                        text-slate-50 rounded-md py-3 px-6 ${className} justify-between`}>
                            <h2>{item.title}</h2>
                            <span aria-hidden="true">&rarr;</span>
                    </Link>
                )
            })}
    </div>
  )
}

export default SymptomCard