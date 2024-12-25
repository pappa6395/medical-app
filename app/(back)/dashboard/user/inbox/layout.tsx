
import { getInboxMessages, getInboxSentMessages } from '@/actions/inbox';
import MailListPanel from '@/components/Dashboard/Doctor/MailListPanel';
import PanelHeader from '@/components/Dashboard/Doctor/PanelHeader';
import NotAuthorized from '@/components/NotAuthorized';
import { authOptions } from '@/lib/auth';
import { Mail } from 'lucide-react';
import { getServerSession } from 'next-auth';
import React, { ReactNode } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NewButton from '@/components/Dashboard/Doctor/NewButton';


const layout = async ({children}: {children: ReactNode}) => {

    
    const session = await getServerSession(authOptions)
    const user = session?.user
    const userId = user?.id || ""
    const role = user?.role

    if (!userId) {
        return <div>You must be logged in to access this page.</div>
    }
    if (user?.role !== "USER") {
      return <NotAuthorized/>
    }
    

    const messages = (await getInboxMessages(user.id))?.data || [];
    const sentMessages = (await getInboxSentMessages(user.id))?.data || [];
    

  return (

    <div>
      {/* Header */}
      {/* 2 Panels */}
      <div className="grid col-span-full md:grid-cols-12 dark:bg-slate-950">
        {/* List Panel */}
        <div className="col-span-full md:col-span-5 px-3 py-3 border-r border-gray-100">
          <div className='flex justify-between'>
            <PanelHeader 
              title={"Inbox"} 
              count={messages.length??0} 
              icon={Mail}/>
            <div className='block md:hidden'>
              <NewButton 
                title="New Message" 
                href={`/dashboard/${role === "USER" ? "user" : "doctor"}/inbox/new`}
              />
            </div>
          </div>
          
          <div className='px-3 mt-2'>
            <Tabs defaultValue="recieved" className="">
                <TabsList>
                  <TabsTrigger value="recieved">Recieved({messages.length.toString().padStart(2,'0')})</TabsTrigger>
                  <TabsTrigger value="sent">Sent({sentMessages.length.toString().padStart(2,'0')})</TabsTrigger>
                </TabsList>
                <TabsContent value="recieved">
                  <MailListPanel messages={messages} role={role} />
                </TabsContent>
                <TabsContent value="sent">
                  <MailListPanel messages={sentMessages} role={role} />
                </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="md:col-span-7 px-3 ">
            {children}
        </div>
      </div>
      
    </div>


  )
}

export default layout