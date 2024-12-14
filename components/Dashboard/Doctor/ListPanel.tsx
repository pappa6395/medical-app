import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { BriefcaseMedical, Dot } from "lucide-react"

const tags = Array.from({ length: 50 },(_,i) => ({
    id: i + 1,
    name: `name-${i-1}`
}))

export function ListPanel() {
  return (
    <div>
        <ScrollArea className="h-96 space-x-4">
            {tags.map((tag, i) => (
                <div key={i} className="mt-2 mr-4">
                <Link 
                    href="/dashboard/doctor/appointments/view/1" 
                    className="border border-gray-100 shadow-sm text-xs py-3 px-4 
                    inline-block w-full rounded-md bg-white dark:bg-slate-700"
                >
                    <div className="flex justify-between items-center">
                        <h2>William Larsen</h2>
                        <span>4:00pm</span>
                    </div> 
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex items-center">
                            <Dot />
                            <span>Follow Up</span>
                        </div>
                        <div className="flex items-center flex-shrink-0">
                            <BriefcaseMedical className="w-4 h-4 mr-2" />
                            <span>Medicine</span>
                        </div>
                    </div>
                </Link>
                </div>
            ))}
        </ScrollArea>
    </div>
    
  )
}


export default ListPanel