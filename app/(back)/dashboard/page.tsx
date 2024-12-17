
import { getDoctorProfileById, getDoctorProfileByUserId } from '@/actions/onboarding'
import { getUserById } from '@/actions/users'
import Dashboard from '@/components/Dashboard/Dashboard'
import DoctorDashboard from '@/components/Dashboard/DoctorDashboard'
import PatientDashboard from '@/components/Dashboard/PatientDashboard'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async() => {

  const session = await getServerSession(authOptions);
  const user = session?.user
  const role = user?.role;
  const id = user?.id || "";

  const doctorProfileId = (await getDoctorProfileByUserId(id)).data || "";
  

  if (role === "DOCTOR") {
    return (
      <div>
        <p>The user role is {role}</p>
        <DoctorDashboard id={id} doctorProfileId={doctorProfileId.toString()} />
      </div>
    )
  };
  if (role === "USER") {
    return (
      <div>
        <p>The user role is {role}</p>
        <PatientDashboard />
      </div>
    )
  }

  return (
    <div>
      <p>The user role is {role}</p>
      <Dashboard />
    </div>
  )
}

export default page