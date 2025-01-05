
import React from 'react'
import AnalyticCards from '../AnalyticCards';
import { Session } from 'next-auth';
import { AnalyticProps, Doctor } from '@/utils/types';
import { CardContent, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ScrollArea } from '../ui/scroll-area';
import { Appointment, UserRole } from '@prisma/client';
import RecentAppointmentCard from '../RecentAppointmentCard';
import SalesCard from '../ui/saleCard';


const PatientDashboard = ({ 
  session,
  analytics,
  appointments, 
}: {
  session?: Session | null; 
  analytics?: AnalyticProps[];
  appointments?: Appointment[];
}) => {

  const user = session?.user || null;
  const role = user?.role || undefined;

  const uniqueDoctorsMap = new Map();

    appointments?.forEach((app) => {
      if (!uniqueDoctorsMap.has(app.doctorId)) {
        uniqueDoctorsMap.set(app.doctorId, {
          doctorId : app.doctorId,
          name: app.doctorName ?? 'Unknown Name'
        });
      }
    });
    const doctorsPatientId = Array.from(uniqueDoctorsMap.values()) as Doctor[]
    console.log("doctorsPatientId:", doctorsPatientId);
  
  return (
    <div className='px-8 py-4'>
      <h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight'>
        Welcome, {user?.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analytics && analytics.map((item,i) => {
          return <AnalyticCards key={i} data={item}/>
        })}
      </div>
      <section className="grid gird-cols-1 md:grid-cols-2 py-4 gap-4 transition-all">
      <CardContent>
        <section className='flex justify-between'>
          <div>
            <CardTitle>Recent Appointments</CardTitle>
          </div>
            <Button asChild className='p-3'>
              <Link href="/dashboard/user/appointments">
                View All
              </Link>
            </Button>
        </section>
        <ScrollArea className="h-96 space-x-4">
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
        </CardContent>
        <CardContent>
          <section className='flex justify-between'>
            <div>
              <CardTitle>Recent Doctors</CardTitle>
            </div>
              <Button asChild className='p-3'>
                <Link href="/dashboard/user/doctors">
                  View All
                </Link>
              </Button>
          </section>
          {doctorsPatientId?.map((data, index) => {
            return (
              <SalesCard
                key={index}
                role={role}
                email={data.email??""}
                name={data.name ?? "Unknown"}
                image={data.doctorProfile?.profilePicture ?? "/public/defaultImage.png"}
                profileId={data.id ?? ""}
              />
          )})}
        </CardContent> 
      </section>
    </div>
  )
}

export default PatientDashboard