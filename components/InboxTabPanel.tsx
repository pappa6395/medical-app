import { Inbox, UserRole } from '@prisma/client'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import MailListPanel from './Dashboard/Doctor/MailListPanel'

const InboxTabPanel = ({
    messages, 
    sentMessages, 
    role
}: {
    messages: Inbox[], 
    sentMessages: Inbox[], 
    role: UserRole | undefined}) => {


  return (

    <div className='px-3 mt-2'>
        <Tabs defaultValue="recieved" className="">
            <TabsList>
                <TabsTrigger value="recieved">Recieved({messages?.length.toString().padStart(2,'0') || ""})</TabsTrigger>
                <TabsTrigger value="sent">Sent({sentMessages?.length.toString().padStart(2,'0') || ""})</TabsTrigger>
            </TabsList>
            <TabsContent value="recieved">
                <MailListPanel messages={messages ?? []} role={role ?? undefined} />
            </TabsContent>
            <TabsContent value="sent">
                <MailListPanel messages={sentMessages ?? []} role={role ?? undefined} />
            </TabsContent>
        </Tabs>
    </div>

  )
}

export default InboxTabPanel