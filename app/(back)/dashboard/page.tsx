
import { getAppointmentByDoctorId, getAppointmentByPatientId, getAppointments } from '@/actions/appointments'
import { getAdminAnalytics, getDoctorAnalytics, getUserAnalytics } from '@/actions/stats'
import { getDoctors, getDoctorsById } from '@/actions/users'
import Dashboard from '@/components/Dashboard/Dashboard'
import DoctorDashboard from '@/components/Dashboard/DoctorDashboard'
import PatientDashboard from '@/components/Dashboard/PatientDashboard'
import { authOptions } from '@/lib/auth'
import { AnalyticProps, Doctor } from '@/utils/types'
import { Appointment } from '@prisma/client'
import { getServerSession } from 'next-auth'
import React from 'react'



const page = async() => {

  const session = await getServerSession(authOptions);
  const user = session?.user || null;
  const userId = user?.id ?? '';
  const role = user?.role || "Unknown";

  //----------------------------------------------------------------//
  
  if (role === "DOCTOR") {
    let doctorAnalytics = [] as AnalyticProps[];
    let doctors = null;
    let appointments = [] as Appointment[];
    try {
      const [doctorAnalyticsResponse, doctorsResponse, appointmentsResponse] = await Promise.all([
        getDoctorAnalytics(),
        getDoctorsById(userId),
        getAppointmentByDoctorId(userId),
      ]);
      doctorAnalytics = doctorAnalyticsResponse || [];
      doctors = doctorsResponse || null;
      appointments = appointmentsResponse?.data || [];
    } catch (err) {
      console.log("Failed to fetch doctor analytics:", err);
    }

    return (
      <div>
        <DoctorDashboard 
          session={session ?? null} 
          analytics={doctorAnalytics ?? []}
          doctors={doctors ?? null}
          appointments={appointments ?? []}
        />
      </div>
    );
  }

  if (role === "USER") {
    let userAnalytics = [] as AnalyticProps[];
    let appointmentByPatientId = [] as Appointment[];
    try {
      const [userAnalyticsResponse, appointmentByPatientIdResponse] = await Promise.all([
        getUserAnalytics(),
        getAppointmentByPatientId(userId),
      ]);
      userAnalytics = userAnalyticsResponse || [];
      appointmentByPatientId = appointmentByPatientIdResponse?.data || [];
    } catch (err) {
      console.log("Failed to fetch user analytics:", err);
    }
    return (
      <div>
        <PatientDashboard 
          session={session ?? null} 
          analytics={userAnalytics ?? []} 
          appointments={appointmentByPatientId ?? []} 
        />
      </div>
    )
  }

  if (role === "ADMIN") {
    let analytics = [] as AnalyticProps[]
    let doctorsAdmin = [] as Doctor[]
    let appointmentsAdmin = [] as Appointment[]
    try {
      const [analyticsResponse, doctorAdminResponse, appointmentsAdminResponse] = await Promise.all([
        getAdminAnalytics(),
        getDoctors(),
        getAppointments(),
      ]);
      analytics = analyticsResponse || [];
      doctorsAdmin = doctorAdminResponse || [];
      appointmentsAdmin = appointmentsAdminResponse?.data || [];
    } catch (err) {
      console.log("Failed to fetch admin analytics:", err);
    } 
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
  
}

export default page