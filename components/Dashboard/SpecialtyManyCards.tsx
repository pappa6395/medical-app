"use client"

import { deleteSpecialty } from '@/actions/specialties'
import { Speciality } from '@prisma/client'

import { Pencil, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import toast from 'react-hot-toast'
import DeletePopup from './DeletePopup'

const SpecialtyManyCards = ({specialties}: {specialties: Speciality}) => {

    const { id, title } = specialties;

    const handleDelete = async (id: string) => {

        await deleteSpecialty(id)
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
                    <h2>{specialties.title}</h2>
                </div>
                 <div className="flex gap-2">
                    <Link href={`/dashboard/specialties/update/${specialties.slug}`}>
                        <Pencil className="w-4 h-4 text-blue-500 hover:text-blue-600">Edit</Pencil>
                    </Link>
                    <DeletePopup handleDelete={handleDelete} title={specialties.title} id={id}/>
                </div>
        </div>
       
    </div>

  )
}

export default SpecialtyManyCards