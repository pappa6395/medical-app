

import { PageProps } from '@/.next/types/app/api/auth/[...nextauth]/route';
import { getSymptomBySlug } from '@/actions/symptoms';
import SymptomForm from '@/components/Dashboard/SymptomForm';
import React from 'react';

const page = async({ params: paramsPromise }: PageProps) => {

  const { slug } = await paramsPromise

  let symptom = null;
  try {
    symptom = (await getSymptomBySlug(slug))?.data || null;
  } catch (err) {
    console.error("Failed to fetch symptom:", err);
    
  }
  
  return (

    <div>
        {symptom && symptom.id &&
           <SymptomForm title="Update Specialty" initialData={symptom ?? null} />
        }
    </div>

  )
}

export default page