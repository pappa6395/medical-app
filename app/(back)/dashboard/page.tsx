

import { getDoctorAnalytics, getUserAnalytics } from '@/actions/stats'
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

  //const doctorProfileId = (await getDoctorProfileByUserId(id)).data || "";
  const doctorAnalytics = await getDoctorAnalytics() || []
  const userAnalytics = await getUserAnalytics() || []
  

  if (role === "DOCTOR") {
    return (
      <div>
        <DoctorDashboard session={session} analytics={doctorAnalytics} />
      </div>
    )
  };
  if (role === "USER") {
    return (
      <div>
        <p>The user role is {role}</p>
        <PatientDashboard session={session} analytics={userAnalytics} />
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