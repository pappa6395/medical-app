
import React from 'react'
import AnalyticCards from '../AnalyticCards';
import { Session } from 'next-auth';
import { AnalyticProps, Doctor } from '@/utils/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ScrollArea } from '../ui/scroll-area';
import { Appointment, UserRole } from '@prisma/client';
import RecentAppointmentCard from '../RecentAppointmentCard';
import SalesCard from '../ui/saleCard';


const PatientDashboard = ({ 
  session=null,
  analytics=[],
  appointments=[], 
}: {
  session?: Session | null; 
  analytics?: AnalyticProps[];
  appointments?: Appointment[];
}) => {

  const user = session?.user || null;
  const role = user?.role || undefined;

  const uniqueDoctorsMap = new Map();

    appointments?.forEach((app) => {
      if (!app.doctorId) return;
      if (!uniqueDoctorsMap.has(app.doctorId)) {
        uniqueDoctorsMap?.set(app.doctorId, {
          doctorId : app.doctorId ?? "",
          name: app.doctorName ?? 'Unknown Name',
        });
      }
    });
    const doctorsPatientId = Array.from(uniqueDoctorsMap.values() || []) as Doctor[]
    //console.log("doctorsPatientId:", doctorsPatientId);
  
  return (
    <div className='p-1 md:p-2 space-y-3'>
      <h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight'>
        Welcome, {user?.name ?? ""}
      </h1>
      <div className="grid w-[340px] md:w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analytics?.map((item,i) => {
          return <AnalyticCards key={i} data={item}/>
        })}
      </div>
      <section className="grid gird-cols-1 md:grid-cols-2 py-4 gap-4 transition-all">
        <Card className='w-[340px] md:w-full'>
          <CardHeader>
            <div className='flex justify-between'>
              <div>
                <CardTitle>Recent Appointments</CardTitle>
              </div>
                <Button asChild className='p-3'>
                  <Link href="/dashboard/user/appointments">
                    View All
                  </Link>
                </Button>
            </div>
          </CardHeader>
          <CardContent className='shadow-none border-none'>
            <ScrollArea className="h-96">
              {appointments?.slice(0,5).map((data, index) => {
                const status = data.status??"PENDING"
                return (
                  <div key={index} className='shadow w-[330px] md:w-full'>
                    <RecentAppointmentCard
                      role={role || undefined}
                      id={data.id || ""}
                      status={status || "PENDING"}
                      firstName={data.firstName || "Unknown"}
                      lastName={data.lastName || "Unknown"}
                      appointmentTime={data.appointmentTime || "Unknown"}
                      appointmentFormattedDate={data.appointmentFormattedDate || "Unknown"}
                      createdAt={data.createdAt || null}
                    />
                  </div>
              )})}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className='w-[340] md:w-full'>
          <CardHeader>
            <div className='flex justify-between'>
              <div>
                <CardTitle>Recent Doctors</CardTitle>
              </div>
                <Button asChild className=''>
                  <Link href="/dashboard/user/doctors">
                    View All
                  </Link>
                </Button>
            </div>
          </CardHeader>
          <CardContent className='shadow-none border-none'>
            {doctorsPatientId?.map((data, index) => {
              return (
                <div key={index} className='md:p-2 p-1 border shadow rounded-lg hover:bg-slate-100'>
                  <SalesCard
                    role={role || undefined}
                    email={data.email || ""}
                    name={data.name || "Unknown"}
                    image={data.doctorProfile?.profilePicture || null}
                    profileId={data.id ?? ""}
                  />
                </div>
            )})}
          </CardContent> 
        </Card>
      </section>
    </div>
  )
}

export default PatientDashboard