

import { getInboxMessages, getInboxSentMessages } from '@/actions/inbox';
import MailListPanel from '@/components/Dashboard/Doctor/MailListPanel';
import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader';
import NotAuthorized from '@/components/NotAuthorized';
import { authOptions } from '@/lib/auth';
import { Mail } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React, { ReactNode } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NewLinkButton from '@/components/Dashboard/Doctor/NewLinkButton';
import { Inbox } from '@prisma/client';
import InboxTabPanel from '@/components/InboxTabPanel';


const layout = async ({children}: {children: ReactNode}) => {

    
  const session = await getServerSession(authOptions)
  const user = session?.user || null;
  const userId = user?.id || "";
  const role = user?.role || undefined;

  if (!userId) {
      return <div>You must be logged in to access this page.</div>
  }
  if (user?.role !== "DOCTOR") {
    return <NotAuthorized/>
  }
  
  let messages = [] as Inbox[]
  let sentMessages = [] as Inbox[];
  try {
    const [messagesResponse, sentMessagesResponse] = await Promise.all([
      getInboxMessages(userId),
      getInboxSentMessages(userId)
    ])
    messages = messagesResponse?.data || [];
    sentMessages = sentMessagesResponse?.data || [];

  } catch (err) {
    console.error("Failed to get inbox messages:", err);
    
  }

  return (

    <div>
      <div className="grid col-span-full md:grid-cols-12 dark:bg-slate-950">
        <div className="col-span-full md:col-span-5 px-3 py-3 border-r border-gray-100">
          <div className='flex justify-between'>
            <PanelHeader 
              title={"Inbox"} 
              count={messages?.length??0} 
              icon={Mail}/>
            <div className='block md:hidden'>
              <NewLinkButton 
                title="New Message" 
                href={`/dashboard/${role?.toLowerCase()}/inbox/new`}
              />
            </div>
          </div>
          <InboxTabPanel 
            messages={messages ?? []} 
            sentMessages={sentMessages ?? []} 
            role={role ?? undefined} 
          />
        </div>
        <div className="md:col-span-7 px-3 ">
            {children}
        </div>
      </div>
      
    </div>


  )
}

export default layout