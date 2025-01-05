

import { PageProps } from '@/.next/types/app/api/auth/[...nextauth]/route';
import RegisterPage from '@/components/Auth/RegisterPage'
import React from 'react'


const page = async ({searchParams: searchParamsPromise}: PageProps ) => {

  const { role, plan } = await searchParamsPromise
  //console.log(role, plan);
  

  return (

    <div>
      <RegisterPage role={role} plan={plan} />
    </div>

  )
}

export default page