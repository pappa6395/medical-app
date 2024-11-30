import React from 'react'
import { Separator } from '../ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import GeneralForm from './Settings/GeneralForm'
import { AccountForm } from './Settings/AccountForm'
import TabsSettingCategory from '@/components/ui/tabSettingCatgory'
import { TabsSettingCategoryProps } from '@/utils/types'

const tabContentData: TabsSettingCategoryProps[] = [
    {
        title: "General",
        description: "This is how others will see you on the site.",
        value: "general",
        component: <GeneralForm />
    },
    {
        title: "Security",
        description: "Update your account settings. Set your preferred language and timezone.",
        value: "security",
        component: <AccountForm />
    },
    {
        title: "Integrations",
        description: "Update your account settings. Set your preferred language and timezone.",
        value: "integrations",
        component: <AccountForm />
    },
    {
        title: "Support",
        description: "Update your account settings. Set your preferred language and timezone.",
        value: "support",
        component: <AccountForm />
    },
    {
        title: "Organizations",
        description: "Update your account settings. Set your preferred language and timezone.",
        value: "organizations",
        component: <AccountForm />
    },
    {
        title: "Advanced",
        description: "Update your account settings. Set your preferred language and timezone.",
        value: "advanced",
        component: <AccountForm />
    },

]

const Settings = () => {

  return (

    <div className="hidden space-y-6 p-6 pb-16 md:block">
        <div className="space-y-0.5">
            <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
                Manage your account settings and set e-mail preferences.
            </p>
        </div>
        <Tabs defaultValue='general'>
            <div className='flex items-center'>
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="integration">Integration</TabsTrigger>
                    <TabsTrigger value="support">Support</TabsTrigger>
                    <TabsTrigger value="organizations">Organizations</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
            </div>
            <Separator className="my-6" />
            {tabContentData.map((data, index) => (
                <TabsSettingCategory
                    key={index} 
                    title={data.title}
                    description={data.description}
                    value={data.value} 
                    component={data.component} 
                />
            ))}
            
        </Tabs>
    </div>

  )
}

export default Settings