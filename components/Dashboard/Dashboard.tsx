
import React from 'react'
import { Button } from "@/components/ui/button";
import { AnalyticProps, Doctor, PatientProps } from '@/utils/types';
import { CardContent, CardTitle } from '../ui/card';
import SalesCard from '../ui/saleCard';
import { Session } from 'next-auth';
import AnalyticCards from '../AnalyticCards';
import Link from 'next/link';
import ApproveBtn from './ApproveBtn';
import { Appointment } from '@prisma/client';



const Dashboard = ({
  analytics,
  session,
  doctors,
  appointments,
}: {
  analytics: AnalyticProps[];
  session: Session | null;
  doctors: Doctor[];
  appointments: Appointment[];
}) => {

  const user = session?.user

  const uniquePatientsMap = new Map();

    appointments.forEach((app) => {
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
    
    const patients = Array.from(uniquePatientsMap.values()) as PatientProps[];

  return (

    <div className="flex flex-col gap-5 w-full">
        <h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight'>
        Welcome, Admin. {user?.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analytics && analytics.map((item,i) => {
          return <AnalyticCards key={i} data={item}/>
        })}
      </div>
      <section className="grid gird-cols-1 md:grid-cols-2 gap-4 transition-all">    
        {/* <CardContent>
          <section className='flex justify-between'>
            <div>
              <CardTitle>Recent Doctors</CardTitle>
            </div>
              <Button asChild className='p-3 mr-4'>
                <Link href="/dashboard/doctors">
                  View All
                </Link>
              </Button>
          </section>
          {doctors.slice(0,5).map((data, index) => {
            const status = data.doctorProfile?.status??"PENDING"
            return (
              <div key={index} className="flex items-center justify-between mr-6">
                <SalesCard
                  status={status}
                  email={data.email}
                  name={data.name}
                  image={data.doctorProfile?.profilePicture}
                  profileId={data.doctorProfile?.id}
                />
                <div>
                  <ApproveBtn status={status} profileId={data.doctorProfile?.id} />
                </div> 
              </div>
          )})}
        </CardContent>
        <CardContent>
          <section className='flex justify-between'>
            <div>
              <CardTitle>Recent Patients</CardTitle>
            </div>
              <Button asChild className='p-3'>
                <Link href="/dashboard/patients">
                  View All
                </Link>
              </Button>
          </section>
          {patients.map((data, index) => {
            return (
              <SalesCard
                key={index}
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

export default Dashboard