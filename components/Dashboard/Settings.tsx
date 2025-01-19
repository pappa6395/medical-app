import React from 'react'
import { Separator } from '../ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import AdminProfilePanel from './Settings/AdminProfilePanel'
import { User } from '@prisma/client'
import { RegisterInputProps, UserProps } from '@/utils/types'
import AccountPanel from './Settings/AccountPanel'




const Settings = ({userProfile}: {userProfile: User | undefined | null;}) => {

  return (

    <div className="hidden space-y-6 p-6 pb-16 md:block">
        <div className="space-y-0.5">
            <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
                Manage your account settings and user role.
            </p>
        </div>
        <Tabs defaultValue='general' className='w-full'>
            <div className='flex items-center'>
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="accounts">Accounts</TabsTrigger>
                </TabsList>
            </div>
            <Separator className="my-6" />
            <TabsContent value="general">
                <AdminProfilePanel initialProfile={userProfile} />
            </TabsContent>
            <TabsContent value="accounts">
                <AccountPanel />
            </TabsContent>
        </Tabs>
    </div>

  )
}

export default Settings