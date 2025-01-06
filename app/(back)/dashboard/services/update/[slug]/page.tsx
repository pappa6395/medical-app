

import { PageProps } from '@/.next/types/app/api/auth/[...nextauth]/route';
import { getServiceBySlug } from '@/actions/services';
import ServiceForm from '@/components/Dashboard/ServiceForm'
import React from 'react'

const page = async({ params: paramsPromise }: PageProps) => {

  const { slug } = await paramsPromise

  let service = null;

  try {
    service = (await getServiceBySlug(slug))?.data || null;
  } catch (err) {
    console.error("Failed to fetch service: ", err);
    
  }
  
  return (

    <div>
        {service && service.id &&
           <ServiceForm title="Update Service" initialData={service ?? null} />
        }
       
    </div>

  )
}

export default page