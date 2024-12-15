
import { PageProps } from '@/.next/types/app/(back)/dashboard/symptoms/update/[slug]/page';
import { getSymptomBySlug } from '@/actions/symptoms';
import SymptomForm from '@/components/Dashboard/SymptomForm';
import React from 'react';

const page = async({ params: paramsPromise }: PageProps) => {

  const { slug } = await paramsPromise

  const symptom = (await getSymptomBySlug(slug))?.data
  console.log("service:", symptom);
  
  return (

    <div>
        {symptom && symptom.id &&
           <SymptomForm title="Update Specialty" initialData={symptom} />
        }
    </div>

  )
}

export default page