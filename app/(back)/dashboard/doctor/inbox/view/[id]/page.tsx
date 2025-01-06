
import { format } from "date-fns/format"
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components//ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getInboxMessageById } from "@/actions/inbox"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"

import DeleteMessage from "@/components/DeleteMessage"
import { PageProps } from "@/.next/types/app/api/auth/[...nextauth]/route"


export default async function MailDisplay({ params: paramsPromise }: PageProps) {
  
  const { id } =  await paramsPromise

  const session = await getServerSession(authOptions);
  const user = session?.user || null;
  const role = user?.role || undefined;
  const userEmail = user?.email || ""

  let mail = null;

  try {
    mail = await getInboxMessageById(id) || null;
  } catch (err) {
    console.error("Failed to fetch mail:", err);
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center p-2">
          {userEmail === mail?.senderEmail && (
           <div className="flex justify-center items-center gap-2">
              <DeleteMessage id={mail?.id} role={role}/>
          </div>
          )}
        <Separator orientation="vertical" className="mx-1 h-6" />
        <div className="ml-auto flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="ghost" size="icon" disabled={!mail}>
                  <Link href={role === "DOCTOR" ? "/dashboard/doctor/inbox/new" : "/dashboard/user/inbox/new"}>
                    <Reply className="h-4 w-4" />
                    <span className="sr-only">Reply</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reply</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <Separator />
      {mail ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={mail?.senderName || "Unknown"} />
                <AvatarFallback>
                  {mail?.senderName
                    .split(" ")
                    .map((chunk: any) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{mail?.senderName || "Unknown"}</div>
                <div className="line-clamp-1 text-xs">{mail?.subject || ""}</div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Reply-To:</span> {mail?.senderEmail || "Unknown"}
                </div>
              </div>
            </div>
            {mail?.createdAt && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(mail?.createdAt), "PPpp")}
              </div>
            )}
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {mail?.message}
          </div>
          <Separator className="mt-auto" />
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  )
}