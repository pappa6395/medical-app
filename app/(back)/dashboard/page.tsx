

import { getAppointmentByDoctorId, getAppointmentByPatientId, getAppointments, getRecentAppointmentByPatientId } from '@/actions/appointments'
import { getAdminAnalytics, getDoctorAnalytics, getUserAnalytics } from '@/actions/stats'
import { getDoctors, getDoctorsById } from '@/actions/users'
import Dashboard from '@/components/Dashboard/Dashboard'
import DoctorDashboard from '@/components/Dashboard/DoctorDashboard'
import PatientDashboard from '@/components/Dashboard/PatientDashboard'
import { authOptions } from '@/lib/auth'
import { AppointmentProps, Doctor, PatientProps } from '@/utils/types'
import { Appointment } from '@prisma/client'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async() => {

  const session = await getServerSession(authOptions);
  const user = session?.user
  const userId = user?.id??""
  const role = user?.role;

  //const doctorAnalytics = await getDoctorAnalytics() || []
  // const userAnalytics = await getUserAnalytics() || []
  //const analytics = await getAdminAnalytics();
  
  // for doctors, get recent appointment by doctor id and get recent patients from appointment map patient id
  
  //const appointments = (await getAppointmentByDoctorId(userId))?.data || [] as Appointment[]
  // // Option 1 : [patientIds] => remove dups => fetch users with these ids
  // // Option 2 : [patientId, name, email] => remove dups
  //const recentAppointments = (await getAppointments())?.data || []
  //const doctors = await getDoctorsById(userId)
  //const doctorsAdmin = await getDoctors() || [] as Doctor[]
  //const appointmentsAdmin = (await getAppointments()).data || []
    
  //for User, Recent get doctor by patientId and Recent appointment  by patientId
  // const appointmentByPatientId = (await getAppointmentByPatientId(userId))?.data || [];
  // const uniqueDoctorsMap = new Map();

  //   appointmentByPatientId.forEach((app) => {
  //     if (!uniqueDoctorsMap.has(app.doctorId)) {
  //       uniqueDoctorsMap.set(app.doctorId, {
  //         doctorId : app.doctorId,
  //         name: app.doctorName??'Unknown Name'
  //       });
  //     }
  //   });
  //   const doctorsPatientId = Array.from(uniqueDoctorsMap.values()) as Doctor[]
  //   console.log("doctorsPatientId:", doctorsPatientId);
      
  //----------------------------------------------------------------//

  if (role === "DOCTOR") {
    return (
      <div>
        <h2>I am a Doctor</h2>
        {/* <DoctorDashboard 
          session={session} 
          analytics={doctorAnalytics}
          patientsApp={appointments} 
          doctors={doctors}
          appointments={recentAppointments}
        /> */}
      </div>
    );
  }

  if (role === "USER") {
    return (
      <div>
        <h2>I am a Patient</h2>
        {/* <PatientDashboard 
          session={session} 
          analytics={userAnalytics} 
          doctors={doctorsPatientId}
          appointments={appointmentByPatientId}
          role={role} 
        /> */}
      </div>
    )
  }

  return (
    <div>
      <h2>I am an Admin</h2>
      {/* <Dashboard
        session={session}
        analytics={analytics}
        doctors={doctorsAdmin}
        appointments={appointmentsAdmin}
      /> */}
    </div>
  )
}

export default page