
import Dashboard from '@/components/Dashboard/Dashboard'
import DoctorDashboard from '@/components/Dashboard/DoctorDashboard'
import PatientDashboard from '@/components/Dashboard/PatientDashboard'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async() => {

  const session = await getServerSession(authOptions);
  const user = session?.user;
  const role = user?.role

  if (role === "DOCTOR") {
    return (
      <div>
        <p>The user role is {role}</p>
        <DoctorDashboard />
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