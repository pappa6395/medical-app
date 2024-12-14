import { PageProps } from '@/.next/types/app/(back)/dashboard/services/update/[slug]/page';
import { getServiceBySlug } from '@/actions/services';
import ServiceForm from '@/components/Dashboard/ServiceForm'
import { Service } from '@prisma/client';
import React from 'react'

const page = async({ params: paramsPromise }: PageProps) => {

  const { slug } = await paramsPromise

  const service = (await getServiceBySlug(slug))?.data
  console.log("service:", service);
  
  return (

    <div>
        {service && service.id &&
           <ServiceForm title="Update Service" initialData={service} />
        }
       
    </div>

  )
}

export default page