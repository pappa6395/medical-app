
import React from 'react'
import AnalyticCards from '../AnalyticCards';
import { Session } from 'next-auth';
import { AnalyticProps, Doctor, PatientProps } from '@/utils/types';
import { CardContent, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import SalesCard from '../ui/saleCard';
import { Appointment } from '@prisma/client';
import RecentAppointmentCard from '../RecentAppointmentCard';
import { ScrollArea } from '../ui/scroll-area';
import { CheckCircle, CircleEllipsis, CircleX } from 'lucide-react';


const DoctorDashboard = ({ 
  session,
  analytics,
  patientsApp,
  doctors,
  appointments, 
}: {
  session?: Session | null; 
  analytics?: AnalyticProps[];
  patientsApp?: Appointment[];
  doctors?: Doctor | undefined | null;
  appointments?: Appointment[] | undefined | null;
}) => {

  const user = session?.user
  const role = user?.role

  const uniquePatientsMap = new Map();
  
    patientsApp && patientsApp.forEach((app) => {
      if (!uniquePatientsMap.has(app.patientId)) {
        uniquePatientsMap.set(app.patientId, {
          patientId : app.patientId,
          name: `${app.firstName} ${app.lastName}`,
          email: app.email,
          phone: app.phone,
          location: app.location,
          gender: app.gender,
          occupation: app.occupation,
          doctorId: app.doctorId,
          dob: app.dob,
        });
      }
    });
      
    const patients = Array.from(uniquePatientsMap.values()) as PatientProps[]

  
  return (
    <div className='px-8 py-4'>
      <div className='flex items-center justify-between'>
        <h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight'>
          Welcome, Dr. {user?.name}
        </h1>
        <div className=''>
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
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analytics && analytics.map((item,i) => {
          return <AnalyticCards key={i} data={item}/>
        })}
      </div>
      <section className="grid gird-cols-1 md:grid-cols-2 py-4 gap-4 transition-all">
      <CardContent>
        <section className='flex flex-col justify-between'>
          <div>
            <CardTitle>Recent Appointments</CardTitle>
          </div>
            <ScrollArea className="h-96 py-3 space-x-4">
            {appointments && appointments.slice(0,5).map((data, index) => {
              const status = data.status??"PENDING"
              return (
                <RecentAppointmentCard
                  key={index}
                  role={role}
                  id={data.id}
                  status={status}
                  firstName={data.firstName??""}
                  lastName={data.lastName??""}
                  appointmentTime={data.appointmentTime??""}
                  appointmentFormattedDate={data.appointmentFormattedDate}
                  createdAt={data.createdAt}
                />
            )})}
          </ScrollArea>
        </section>
        <Button asChild className='p-3'>
          <Link href="/dashboard/doctor/appointments">
            View All
          </Link>
        </Button>
      </CardContent>
      {/* <CardContent>
        <section className='flex justify-between'>
          <div>
            <CardTitle>Recent Patients</CardTitle>
          </div>
            <Button asChild className='p-3'>
              <Link href="/dashboard/doctor/patients">
                View All
              </Link>
            </Button>
        </section>
        {patients && patients.map((data, index) => {
          return (
            <SalesCard
              key={index}
              role={role}
              email={data.email??""}
              name={data.name}
              profileId={data.patientId??""}
            />
        )})}
      </CardContent>  */}
      </section>
    </div>
  )
}

export default DoctorDashboard