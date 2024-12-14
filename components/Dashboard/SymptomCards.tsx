"use client"

import { deleteSymptom } from '@/actions/symptoms'
import { Pencil } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'
import DeletePopup from './DeletePopup'
import { Symptom } from '@prisma/client'

const SymptomCards = ({symptoms}: {symptoms: Symptom}) => {

    const { id, title } = symptoms

    const handleDelete = async (id: string) => {

        await deleteSymptom(id)
        toast.success("Specialty deleted successfully!")
    }

  return ( 

    <div>
        <div 
            className="border border-gray-100 shadow-sm text-xs py-3 px-4 
            w-full rounded-md bg-white dark:bg-slate-700
            flex items-center justify-between"
            >
                <div className='flex items-center justify-center gap-4'>
                    <h2>{symptoms.title}</h2>
                </div>
                 <div className="flex gap-2">
                    <Link href={`/dashboard/symptoms/update/${symptoms.slug}`}>
                        <Pencil className="w-4 h-4 text-blue-500 hover:text-blue-600">Edit</Pencil>
                    </Link>
                    <DeletePopup handleDelete={handleDelete} title={symptoms.title} id={id}/>
                </div>
        </div>
       
    </div>

  )
}

export default SymptomCards