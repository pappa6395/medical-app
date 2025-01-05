
import { getAppointmentByDoctorId, getAppointmentByPatientId, getAppointments, getRecentAppointmentByPatientId } from '@/actions/appointments'
import { getAdminAnalytics, getDoctorAnalytics, getUserAnalytics } from '@/actions/stats'
import { getDoctors, getDoctorsById } from '@/actions/users'
import Dashboard from '@/components/Dashboard/Dashboard'
import DoctorDashboard from '@/components/Dashboard/DoctorDashboard'
import PatientDashboard from '@/components/Dashboard/PatientDashboard'
import { authOptions } from '@/lib/auth'
import { AnalyticProps, AppointmentProps, Doctor, PatientProps } from '@/utils/types'
import { Appointment } from '@prisma/client'
import { getServerSession } from 'next-auth'
import React from 'react'

const fetchData = async (fetchFn: Function, defaultValue: any) => {
  try {
    return await fetchFn() || defaultValue;
  } catch (err) {
    console.error('Failed to fetched data:', err);
    return defaultValue;
  }
}

const page = async() => {

  const session = await getServerSession(authOptions);
  const user = session?.user || null;
  const userId = user?.id ?? '';
  const role = user?.role || "Unknown";

  if (role === "Unknown") {
    return <div>You must be logged in to access this page.</div>
  }

  const doctorAnalytics = await fetchData(getDoctorAnalytics, []);
  //const userAnalytics = await fetchData(getUserAnalytics, []);
  const analytics = await fetchData(getAdminAnalytics, []);
  
  const doctorsAdmin = await fetchData(getDoctors, [])
  
  //const appointmentByPatientId = await fetchData(() => getAppointmentByPatientId(userId), [])
  const appointmentsAdmin = (await getAppointments()).data || [] as Appointment[]

  //----------------------------------------------------------------//

  if (role === "DOCTOR") {
    const doctors = await fetchData(() => getDoctorsById(userId), {}) as Doctor
    const appointments = (await getAppointmentByDoctorId(userId))?.data || [] as Appointment[];
    return (
      <div>
        <DoctorDashboard 
          session={session ?? null} 
          analytics={doctorAnalytics ?? []}
          doctors={doctors ?? {}}
          appointments={appointments ?? []}
        />
      </div>
    );
  }

  // if (role === "USER") {
  //   return (
  //     <div>
  //       <PatientDashboard 
  //         session={session} 
  //         analytics={userAnalytics} 
  //         appointments={appointmentByPatientId} 
  //       />
  //     </div>
  //   )
  // }

  return (
    <div>
        <Dashboard
        session={session ?? null}
        analytics={analytics ?? []}
        doctors={doctorsAdmin ?? []}
        appointments={appointmentsAdmin ?? []}
      />
    </div>
  )
}

export default page