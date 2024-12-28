
import React from 'react'
import AnalyticCards from '../AnalyticCards';
import { Session } from 'next-auth';
import { AnalyticProps } from '@/utils/types';


const DoctorDashboard = ({ 
  session,
  analytics 
}: {
  session?: Session | null; 
  analytics?: AnalyticProps[];
}) => {

  const user = session?.user
  
  
  return (
    <div className='px-8 py-4'>
      <h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight'>
        Welcome, Dr. {user?.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analytics && analytics.map((item,i) => {
          return <AnalyticCards key={i} data={item}/>
        })}
      </div>
    </div>
  )
}

export default DoctorDashboard