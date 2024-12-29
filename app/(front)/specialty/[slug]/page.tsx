import { PageProps } from '@/.next/types/app/(front)/specialty/[slug]/page'
import { getDoctorsBySpecialtySlug, getOtherDoctorSpecialtiesBySpecialty } from '@/actions/doctors'
import DoctorCard from '@/components/DoctorCard'
import SpecialtyPanel from '@/components/SpecialtyPanel'
import generateSlug from '@/utils/generateSlug'
import Link from 'next/link'
import React from 'react'



const page = async ({
    params: paramsPromise, 
    searchParams 
}: PageProps) => {
     
    const { slug } = await paramsPromise
    const title = slug.split("-").join(" ")
    const { type } = await searchParams
    console.log("Type:", type);
    
    const specialties = (await getDoctorsBySpecialtySlug(slug))?.data || []
    //console.log("doctors:", specialtys);

    const specialtySlug = specialties.find(specialty => specialty.slug === slug);
    
    const doctorSpecialty = specialtySlug?.doctorProfile.map((doctor) => {
        return {
            id: doctor.userId,
            name: `${doctor.firstName} ${doctor.lastName}`,
            email: doctor.email??"",
            phone: doctor.phone??"",
            slug: generateSlug(`${doctor.firstName} ${doctor.lastName}`),
            doctorProfile: doctor,
        }
    })
    //console.log("Doctor specialty:", doctorSpecialty);
    
    const otherSpecialties = (await getOtherDoctorSpecialtiesBySpecialty(specialtySlug))?.data || []
   // console.log("Other specialtys:", otherSpecialties);
    

  return (

    <div className='p-8'>
        <SpecialtyPanel doctors={doctorSpecialty} specialties={otherSpecialties} title={title}/>
    </div>

  )
}

export default page