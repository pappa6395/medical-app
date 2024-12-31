import { PageProps } from '@/.next/types/app/(meeting)/meeting/[roomId]/page';
import MeetingPage from '@/components/hms/MeetingPage';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'


const page = async ({params: paramsPromise}: PageProps) => {

    const { roomId } = await paramsPromise;
    const session = await getServerSession(authOptions);
    
    if (!session) {
      redirect("/login");
    }

  return (

    <div>
       <MeetingPage roomId={roomId} session={session} />
    </div>

  )
}

export default page