import { getAppointmentByDoctorId } from '@/actions/appointments'
import { getInboxMessages } from '@/actions/inbox'
import HomeDisplayCard from '@/components/Dashboard/Doctor/HomeDisplayCard'
import InboxDisplayCard from '@/components/Dashboard/Doctor/InboxDisplayCard'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {

  const session = await getServerSession(authOptions)
      const user = session?.user
      const userId = user?.id || ""
      const role = user?.role.toLowerCase()
  
      if (!userId) {
          return <div>You must be logged in to access this page.</div>
      }
      if (user?.role !== "USER") {
        return <NotAuthorized/>
      }
      
      const messages = (await getInboxMessages(user.id))?.data || [];

  return (

    <div>
        <div className='flex items-center justify-end py-2 px-2 border-b border-gray-200'>
          <div className='flex items-center gap-4'>
            <NewButton 
              title="New Message" 
              href={`/dashboard/${role}/inbox/new`}
            />
          </div>
        </div>
        {/* Display Panel */}
        <div className='mt-4'>
          <InboxDisplayCard 
            messages={messages} 
            href={`/dashboard/${role}/inbox/new`}
            title={"Inbox Messages"} />
        </div>
    </div>

  )
}

export default page