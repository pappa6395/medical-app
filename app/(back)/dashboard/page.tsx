
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

  if (role === "Unknown") {
    return <NotAuthorized />
  }

  const doctorAnalytics = await getDoctorAnalytics() || [
    {
      title: "Unknown",
      count: 0,
      icon: Users,
      unit: Plus,
      detailLink: "#"
    }
];
  //const userAnalytics = await fetchData(getUserAnalytics, []);
  const analytics = await getAdminAnalytics() || [
    {
      title: "Unknown",
      count: 0,
      icon: Users,
      unit: Plus,
      detailLink: "#"
    }
  ];

  const doctorsAdmin = await getDoctors() || [{
    status: 'Unknown',
    email: 'Unknown',
    name: 'Unknown',
    image: '/public/defaultImage.png',
    profileId: 'ab1234567890cd'
  }];
  
  //const appointmentByPatientId = await fetchData(() => getAppointmentByPatientId(userId), [])
  const appointmentsAdmin = (await getAppointments()).data || [] as Appointment[]

  //----------------------------------------------------------------//

  // if (role === "DOCTOR") {
  //   const doctors = await fetchData(() => getDoctorsById(userId), {
  //     id: "",
  //     name: "",
  //     slug: "",
  //     email: "",
  //     phone: "",
  //     doctorProfile: {
  //       id: "",
  //       firstName: "",
  //       lastName: "",
  //       middleName: "",
  //       gender: "",
  //       dob: null,
  //       bio: "",
  //       profilePicture: "/public/defaultImage.png",
  //       operationMode: "",
  //       hourlyWage: 0,
  //       city: "",
  //       state: "",
  //       country: "",
  //       yearsOfExperience: 0,
  //       medicalLicense: "",
  //       medicalLicenseExpiry: null,
  //       boardCertificates: [],
  //       otherSpecialties: [],
  //       primarySpecialization: "",
  //       medicalSchool: "",
  //       hospitalName: "",
  //       hospitalAddress: "",
  //       hospitalContactNumber: "",
  //       hospitalEmailAddress: "",
  //       hospitalHoursOfOperation: "",
  //       hospitalWebsite: "",
  //       research: "",
  //       accomplishments: "",
  //       additionalDocuments: [],
  //       graduationYear: "",
  //       educationHistory: "",
  //       servicesOffered: [],
  //       insuranceAccepted: "",
  //       languagesSpoken: [],
  //       status: "PENDING",
  //       availability: {
  //         monday: [],
  //         tuesday: [],
  //         wednesday: [],
  //         thursday: [],
  //         friday: [],
  //         saturday: [],
  //         sunday: [],
  //       }
  //     },
  //   }) as Doctor
  //   const appointments = (await getAppointmentByDoctorId(userId))?.data || [] as Appointment[];
  //   return (
  //     <div>
  //       <DoctorDashboard 
  //         session={session ?? null} 
  //         analytics={doctorAnalytics ?? []}
  //         doctors={doctors}
  //         appointments={appointments ?? []}
  //       />
  //     </div>
  //   );
  // }

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