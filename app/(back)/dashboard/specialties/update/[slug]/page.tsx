
import { PageProps } from '@/.next/types/app/(back)/dashboard/specialties/update/[slug]/page';
import { getSpecialtyBySlug } from '@/actions/specialties';
import SpecialtyForm from '@/components/Dashboard/SpecialtyForm';
import React from 'react'

const page = async({ params: paramsPromise }: PageProps) => {

  const { slug } = await paramsPromise

  const specialty = (await getSpecialtyBySlug(slug))?.data
  
  return (

    <div>
        {specialty && specialty.id &&
           <SpecialtyForm title="Update Specialty" initialData={specialty} />
        }
       
    </div>

  )
}

export default page