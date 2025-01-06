
import { getInboxMessages } from '@/actions/inbox'
import InboxDisplayCard from '@/components/Dashboard/Doctor/InboxDisplayCard'
import NewButton from '@/components/Dashboard/Doctor/NewButton'
import NewLinkButton from '@/components/Dashboard/Doctor/NewLinkButton'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import { Inbox } from '@prisma/client'
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
  
  let messages = [] as Inbox[]
  
  try {
    messages = (await getInboxMessages(user.id))?.data || [];
  } catch (err) {
    console.error("Failed o get messages:", err);
    
  }
      

  return (

    <div>
        <div className='flex items-center justify-end py-2 px-2 border-b border-gray-200'>
          <div className='flex items-center gap-4'>
            <NewLinkButton 
              title="New Message" 
              href={`/dashboard/${role}/inbox/new`}
            />
          </div>
        </div>
        {/* Display Panel */}
        <div className='mt-4'>
          <InboxDisplayCard 
            messages={messages || []} 
            href={`/dashboard/${role}/inbox/new`}
            title={"Inbox Messages"} />
        </div>
    </div>

  )
}

export default page