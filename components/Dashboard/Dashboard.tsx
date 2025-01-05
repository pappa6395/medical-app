
import React from 'react'
import { Button } from "@/components/ui/button";
import { AnalyticProps, Doctor, PatientProps } from '@/utils/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import SalesCard from '../ui/saleCard';
import { Session } from 'next-auth';
import AnalyticCards from '../AnalyticCards';
import Link from 'next/link';
import ApproveBtn from './ApproveBtn';
import { Appointment } from '@prisma/client';



const Dashboard = ({
  analytics=[],
  session=null,
  doctors=[],
  appointments=[],
}: {
  analytics?: AnalyticProps[];
  session?: Session | null;
  doctors?: Doctor[];
  appointments?: Appointment[];
}) => {

  const user = session?.user || null;

  const uniquePatientsMap = new Map();

  if (appointments) {
    appointments?.forEach((app) => {
      if (!app?.patientId) return;
      if (!uniquePatientsMap.has(app.patientId)) {
        uniquePatientsMap?.set(app.patientId, {
          patientId : app.patientId ?? '',
          name: `${app.firstName ?? ''} ${app.lastName ?? ''}`,
          email: app.email ?? '',
          phone: app.phone ?? '',
          location: app.location ?? '',
          gender: app.gender ?? '',
          occupation: app.occupation ??'',
          doctorId: app.doctorId ?? '',
          dob: app.dob ?? new Date(),
        });
      }
    });
  }
  const patients = Array.from(uniquePatientsMap?.values() || []) as PatientProps[];


  return (

    <div className="flex flex-col gap-5 w-full">
        <h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight'>
        Welcome, Admin. {user?.name??""}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analytics?.map((item,i) => {
          return <AnalyticCards key={i} data={item}/>
        })}
      </div>
      <section className="grid gird-cols-1 md:grid-cols-2 gap-4 transition-all">    
        <Card>
          <CardHeader>
            <div className='flex justify-between'>
              <div>
                <CardTitle>Recent Doctors</CardTitle>
              </div>
                <Button asChild className='p-3 mr-4'>
                  <Link href="/dashboard/doctors">
                    View All
                  </Link>
                </Button>
            </div>
          </CardHeader>
          <CardContent className='shadow-none border-none'>
            {doctors?.slice(0,5).map((data, index) => {
              const status = data.doctorProfile?.status??"PENDING"
              return (
                <div key={index} className="flex items-center justify-between mr-6">
                  <SalesCard
                    status={status || 'Unknown'}
                    email={data.email || ''}
                    name={data.name || 'Unknown'}
                    image={data.doctorProfile?.profilePicture || '/public/defaultImage.png'}
                    profileId={data.doctorProfile?.id || ''}
                  />
                  <div>
                    <ApproveBtn status={status || 'Unknown'} profileId={data.doctorProfile?.id || ''} />
                  </div> 
                </div>
            )})}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className='flex justify-between'>
              <div>
                <CardTitle>Recent Patients</CardTitle>
              </div>
                <Button asChild className='p-3'>
                  <Link href="/dashboard/patients">
                    View All
                  </Link>
                </Button>
            </div>
          </CardHeader>
          <CardContent className='shadow-none border-none'>
            {patients?.map((data, index) => {
              return (
                <SalesCard
                  key={index}
                  email={data.email || "Unknown"}
                  name={data.name || 'Unknown'}
                  profileId={data.patientId || ""}
                />
            )})}
          </CardContent> 
        </Card>  
      </section>
    </div>
  )
}

export default Dashboard