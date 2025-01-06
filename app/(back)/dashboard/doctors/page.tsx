
import { getDoctors } from '@/actions/users'
import AdminDisplayCard from '@/components/Dashboard/Doctor/AdminDisplayCard'
import NewLinkButton from '@/components/Dashboard/Doctor/NewLinkButton'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import { Doctor } from '@/utils/types'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {

  const session = await getServerSession(authOptions)
  const user = session?.user || null;
  const userId = user?.id || "";


  if (!userId) {
      return (
        <div>You must be logged in to access this page.</div>
      )
  }
  if (user?.role !== "ADMIN") {
    return <NotAuthorized/>
  }
  
  let doctors = [] as Doctor[]
  try {
    doctors = (await getDoctors()) || []
  } catch (err) {
    console.error("Failed to fetch doctors", err);
    
  }

  return (

    <div>
        <div className='flex items-center justify-end py-2 px-2 border-b border-gray-200'>
          <div className='flex items-center gap-4'>
            <NewLinkButton title="New Doctor" href={`#`}/>
          </div>
        </div>
        {/* Display Panel */}
        <div className='mt-4'>
          <AdminDisplayCard
            title={"Doctor"} 
            href={`#`}
            count={doctors.length??0}  
          />
        </div>
    </div>

  )
}

export default page