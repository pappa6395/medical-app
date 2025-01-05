"use client"

import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"

import { Appointment, Inbox, UserRole } from "@prisma/client"
import { timeAgo } from "@/utils/timeAgo"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"


export function MailListPanel({
    messages=[], 
    role=undefined
}: {
    messages: Inbox[]; 
    role: UserRole | undefined 
}) {
    
    const pathName = usePathname();

  return (
    <div>
        <ScrollArea className="h-80 md:h-screen">
            <div className="flex flex-col gap-2 p-4 pt-0 mt-2 mr-2">
                {messages?.map((item) => (
                <Link
                    href={`/dashboard/${role === "DOCTOR" ? "doctor" : "user"}/inbox/view/${item?.id || ""}`}
                    key={item.id}
                    className={cn(
                    "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                    pathName === `/dashboard/${role === "DOCTOR" ? "doctor" : "user"}/inbox/view/${item?.id || ""}`
                    && "border-green-600 bg-green-50 dark:bg-slate-600 border-2"
                    // mail.selected === item.id && "bg-muted"
                    )}
                >
                    <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                            <div className="flex items-center gap-2">
                            <div className="font-semibold">{item?.senderName || ""}</div>
                            </div>
                            <div
                            className={cn(
                                "ml-auto text-xs",
                            )}
                            >
                            {formatDistanceToNow(new Date(item?.createdAt || null), {
                                addSuffix: true,
                            })}
                        </div>
                    </div>
                    <div className="text-xs font-medium">{item?.subject || ""}</div>
                    </div>
                </Link>
                ))}
            </div>
        </ScrollArea>
    </div>
    
  )
}


export default MailListPanel