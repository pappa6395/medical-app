

import React from 'react'
import AnalyticCards from '../AnalyticCards';
import { Session } from 'next-auth';
import { AnalyticProps, Doctor, PatientProps } from '@/utils/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import SalesCard from '../ui/saleCard';
import { Appointment } from '@prisma/client';
import RecentAppointmentCard from '../RecentAppointmentCard';
import { CheckCircle, CircleEllipsis, CircleX } from 'lucide-react';


const DoctorDashboard = ({ 
  session=null,
  analytics=[],
  doctors=null,
  appointments=[], 
}: {
  session?: Session | null; 
  analytics?: AnalyticProps[];
  doctors?: Doctor | null;
  appointments?: Appointment[];
}) => {


  const user = session?.user || null;
  const role = user?.role || undefined;

  // const uniquePatientsMap = new Map();
  
  // if (appointments) {
  //   appointments?.forEach((app) => {
  //     if (!app?.patientId) {
  //       console.warn("Invalid patient data", app);
  //       return;
  //     }
  //     if (!uniquePatientsMap.has(app.patientId)) {
  //       uniquePatientsMap?.set(app.patientId, {
  //         patientId : app.patientId ?? "",
  //         name: `${app.firstName ?? ""} ${app.lastName ?? ""}`,
  //         email: app.email ?? "",
  //         phone: app.phone ?? "",
  //         location: app.location ?? "",
  //         gender: app.gender ?? "",
  //         occupation: app.occupation ?? "",
  //         doctorId: app.doctorId ?? "",
  //         dob: app.dob ?? new Date(),
  //       });
  //     }
  //   });
  // }

  // const patients = Array.from(uniquePatientsMap.values() || []) as PatientProps[]
  
  
  return (

    <div className='px-8 py-4'>
      <div className='flex items-center justify-between'>
        <h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight'>
          Welcome, Dr. {user?.name ?? ""}
        </h1>
        {/* <div className=''>
          {doctors?.doctorProfile?.status === "APPROVED" ? (
              <div className='flex gap-2 items-center -translate-y-1'>
                  <CheckCircle className='w-6 h-6 text-green-500' />
                  <span className='border rounded-md
                  p-2 bg-green-500 dark:bg-green-600 text-green-100'
                  >Verified
                  </span>
              </div>
          ) : doctors?.doctorProfile?.status === "PENDING" ? (
              <div className='flex gap-2 items-center -translate-y-1'>
                  <CircleEllipsis className='w-6 h-6 text-amber-500' />
                  <span className='border rounded-md
                  p-2 bg-amber-500 dark:bg-amber-600 text-amber-100'
                  >Pending
                  </span>
              </div>
          ) : (
              <div className='flex gap-2 items-center -translate-y-1'>
                  <CircleX className='w-6 h-6 text-red-500' />
                  <span className='border rounded-md
                  p-2 bg-red-500 dark:bg-red-600 text-red-100'
                  >Unverified
                  </span>
              </div>
          )} 
        </div> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analytics?.map((item,i) => {
          return <AnalyticCards key={i} data={item}/>
        })}
      </div>
      <section className="grid gird-cols-1 md:grid-cols-2 py-4 gap-4 transition-all">
        {/* <Card>
          <CardHeader>
            <div className='flex justify-between'>
              <CardTitle>Recent Appointments</CardTitle>
              <Button asChild className='p-3 mr-5'>
                <Link href="/dashboard/doctor/appointments">
                  View All
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className='shadow-none border-none w-full'>
            <div className='flex flex-col justify-between'>
                {appointments?.slice(0,5).map((data, index) => {
                  const status = data.status??"PENDING"
                  return (
                  <div key={index}>
                    <RecentAppointmentCard
                      role={role || undefined}
                      id={data.id || ""}
                      status={status || ""}
                      firstName={data.firstName || "Unknown"}
                      lastName={data.lastName || "Unknown"}
                      appointmentTime={data.appointmentTime || "Unknown"}
                      appointmentFormattedDate={data.appointmentFormattedDate || "Unknown"}
                      createdAt={data.createdAt || undefined}
                    />
                  </div>  
                )})}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <CardTitle>Recent Patients</CardTitle>
              <Button asChild className='p-3'>
                <Link href="/dashboard/doctor/patients">
                  View All
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className='shadow-none border-none'>
            <div className='p-2 mt-2'>
              {patients?.map((data, index) => {
                return (
                  <SalesCard
                    key={index}
                    role={role || undefined}
                    email={data.email || ""}
                    name={data.name || "Unknown"}
                    profileId={data.patientId || ""}
                  />
              )})}
            </div>
          </CardContent> 
        </Card>   */}
      </section>
    </div>
    
  )
}

export default DoctorDashboard