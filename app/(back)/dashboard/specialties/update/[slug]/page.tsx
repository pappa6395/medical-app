

import { PageProps } from '@/.next/types/app/api/auth/[...nextauth]/route';
import { getSpecialtyBySlug } from '@/actions/specialties';
import SpecialtyForm from '@/components/Dashboard/SpecialtyForm';
import React from 'react'

const page = async({ params: paramsPromise }: PageProps) => {

  const { slug } = await paramsPromise

  let specialty = null
  try {
    specialty = (await getSpecialtyBySlug(slug))?.data || null;
  } catch (err) {
    console.error("Failed to fetch specialty: ", err);
  }

  return (

    <div>
        {specialty && specialty.id &&
           <SpecialtyForm title="Update Specialty" initialData={specialty ?? null} />
        }
       
    </div>

  )
}

export default page