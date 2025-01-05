
import { getAppointmentByDoctorId, getAppointmentByPatientId, getAppointments, getRecentAppointmentByPatientId } from '@/actions/appointments'
import { getAdminAnalytics, getDoctorAnalytics, getUserAnalytics } from '@/actions/stats'
import { getDoctors, getDoctorsById } from '@/actions/users'
import Dashboard from '@/components/Dashboard/Dashboard'
import DoctorDashboard from '@/components/Dashboard/DoctorDashboard'
import PatientDashboard from '@/components/Dashboard/PatientDashboard'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import { AnalyticProps, AppointmentProps, Doctor, PatientProps } from '@/utils/types'
import { Appointment } from '@prisma/client'
import { Plus, Users } from 'lucide-react'
import { getServerSession } from 'next-auth'
import React from 'react'



const page = async() => {

  const session = await getServerSession(authOptions);
  const user = session?.user || null;
  const userId = user?.id ?? '';
  const role = user?.role || "Unknown";
  
  //const userAnalytics = await fetchData(getUserAnalytics, []);

  //const appointmentByPatientId = await fetchData(() => getAppointmentByPatientId(userId), [])
  

  //----------------------------------------------------------------//
  
  if (role === "DOCTOR") {
    const doctorAnalytics = await getDoctorAnalytics() || [];
    const doctors = await getDoctorsById(userId) || null;
    //const appointments = (await getAppointmentByDoctorId(userId))?.data || []
    return (
      <div>
        <DoctorDashboard 
          session={session ?? null} 
          analytics={doctorAnalytics ?? []}
          doctors={doctors ?? null}
          // appointments={appointments ?? []}
        />
      </div>
    );
  }

  if (role === "USER") {
    return (
      <div>
        <h2>I am a {role}</h2>
        {/* <PatientDashboard 
          session={session} 
          analytics={userAnalytics} 
          appointments={appointmentByPatientId} 
        /> */}
      </div>
    )
  }

  if (role === "ADMIN") {
    const analytics = await getAdminAnalytics() || [];
    const doctorsAdmin = await getDoctors() || [];
    const appointmentsAdmin = (await getAppointments()).data || []
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