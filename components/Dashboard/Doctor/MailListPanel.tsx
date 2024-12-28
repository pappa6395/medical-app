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
    messages, 
    role
}: {
    messages: Inbox[]; 
    role: UserRole | undefined }) {
    
    const [mail, setMail] = React.useState({})

    const pathName = usePathname();
    const currentRole = role?.toLowerCase()

  return (
    <div>
        <ScrollArea className="h-80 md:h-screen">
            <div className="flex flex-col gap-2 p-4 pt-0 mt-2 mr-2">
                {messages.map((item) => (
                <Link
                    href={`/dashboard/${role === "DOCTOR" ? "doctor" : "user"}/inbox/view/${item.id}`}
                    key={item.id}
                    className={cn(
                    "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                    pathName === `/dashboard/${role === "DOCTOR" ? "doctor" : "user"}/inbox/view/${item.id}`
                    && "border-green-600 bg-green-50 dark:bg-slate-600 border-2"
                    // mail.selected === item.id && "bg-muted"
                    )}
                    // onClick={() => setMail({ ...mail, selected: item.id })}
                >
                    <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                            <div className="flex items-center gap-2">
                            <div className="font-semibold">{item.senderName}</div>
                            {/* {!item.read && (
                                <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                            )} */}
                            </div>
                            <div
                            className={cn(
                                "ml-auto text-xs",
                                // mail.selected === item.id
                                // ? "text-foreground"
                                // : "text-muted-foreground"
                            )}
                            >
                            {formatDistanceToNow(new Date(item.createdAt), {
                                addSuffix: true,
                            })}
                        </div>
                    </div>
                    <div className="text-xs font-medium">{item.subject}</div>
                    </div>
                    {/* <div className="line-clamp-2 text-xs text-muted-foreground">
                    {item.subject.substring(0, 300)}
                    </div> */}
                    {/* {item.labels.length ? (
                    <div className="flex items-center gap-2">
                        {item.labels.map((label) => (
                        <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                            {label}
                        </Badge>
                        ))}
                    </div>
                    ) : null} */}
                </Link>
                ))}
            </div>
        </ScrollArea>
        {/* <ScrollArea className="h-96 space-x-4">
            {appointment.map((item) => (
                <div key={item.id} className="mt-2 mr-4 cursor-pointer">
                    <Link 
                        href={`/dashboard/${currentRole}/appointments/view/${item.id}`}
                        className={cn(
                            "border border-gray-100 shadow-sm text-xs py-3 px-4 inline-block w-full rounded-md bg-white dark:bg-slate-700", 
                            item.status === "approved" ? "bg-green-100/80" : item.status === "rejected" ? "bg-red-100/80" : "bg-white",
                            pathName === `/dashboard/doctor/appointments/view/${item.id}`
                            && "border-slate-600 border-2")}
                    >
                        <div className="flex justify-between items-center ">
                            <h4 className="scroll-m-20 text-lg font-medium tracking-tight">{item.firstName} {item.lastName}</h4>
                            <div className="flex items-center flex-shrink-0 text-slate-500">
                                <History className="w-4 h-4 mr-2" />
                                <span className="scroll-m-20 text-base font-normal tracking-tight">{timeAgo(item.createdAt)}</span>
                            </div>
                            
                        </div> 
                        <div className="flex justify-between items-center gap-4 py-2">
                            <div className="flex items-center gap-2">
                                <CalendarCheck className="w-4 h-4" />
                                <span className="scroll-m-20 text-base font-normal tracking-tight">{item.appointmentFormattedDate}</span>
                            </div>
                            <span className="scroll-m-20 text-lg font-normal tracking-tight">{item.appointmentTime}</span>
                        </div>
                        <div className={cn("flex items-center pt-2", 
                            item.status === "approved" ? "text-teal-400" 
                            : item.status === "rejected" ? "text-rose-400" 
                            : "text-slate-500" )}
                        >
                            {item.status === "approved" ? (
                                    <Check className="mr-2 w-4 h-4" />
                                ) : item.status === "pending" ? (
                                    <CircleEllipsis className="mr-2 w-4 h-4" />
                                ) : item.status === "rejected" ? ( 
                                    <CircleX className="mr-2 w-4 h-4" />
                                ) : <CircleEllipsis className="mr-2 w-4 h-4" />
                            }
                            <span className="scroll-m-20 font-normal 
                            tracking-tight"
                            >
                                {item.status === "" ? "pending" : item.status}
                            </span>
                        </div>
                    </Link>
                </div>
            ))}
        </ScrollArea> */}
    </div>
    
  )
}


export default MailListPanel