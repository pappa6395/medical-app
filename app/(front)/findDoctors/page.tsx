

import { getDoctors } from '@/actions/users'
import FindDoctorPanel from '@/components/FindDoctorPanel'
import React from 'react'



const page = async () => {
     

  const allDoctors = (await getDoctors()) || [];

    
  return (

    <div className='p-8'>
        <FindDoctorPanel doctors={allDoctors} title={"Find Doctors"}/>
    </div>

  )
}

export default page