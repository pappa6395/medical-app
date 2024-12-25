"use client"

import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Button } from './ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import { deleteInboxMessage } from '@/actions/inbox'
import { useRouter } from 'next/navigation'
import { UserRole } from '@prisma/client'

const DeleteMessage = ({id, role}: {id: string | undefined; role: UserRole | undefined}) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false)

    const handleDelete = async () => {
        setIsLoading(true)

        try {
            const res = await deleteInboxMessage(id??"")
            if (res?.ok) {
                router.replace(role === "DOCTOR" 
                    ? "/dashboard/doctor/inbox" 
                    : "/dashboard/user/inbox")
            }
            setIsLoading(false)


        } catch (error) {

        }
    }  

  return (

    <div>
        <TooltipProvider>
            <Tooltip>
            <TooltipTrigger asChild>
                {isLoading ? (
                    <Button disabled variant="ghost" size="icon">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="sr-only">Deleting...</span>
                    </Button>
                ) : (
                    <Button variant="ghost" size="icon" onClick={handleDelete}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete Message</span>
                    </Button>
                ) }
            </TooltipTrigger>
            <TooltipContent>{isLoading ? "Deleting...": "Delete Message" }</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>

  )
}

export default DeleteMessage