
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { DoctorProfile } from '@prisma/client';
import { useOnBoardingContext } from '@/context/context';

const DoctorDashboard = ({ 
  id, 
  doctorProfileId 
}: {
  id?: string; 
  doctorProfileId?: string;}) => {

  
  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <Button asChild>
        {doctorProfileId ? (
          <Link href={`/onboarding/resume`}>
          Update your Doctor Profile application
        </Link>
        ) : (
          <Link href={`/onboarding/${id}`}>
          Create your Doctor Profile
        </Link>
        )}
        
      </Button>
    </div>
  )
}

export default DoctorDashboard