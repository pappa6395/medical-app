import { cn } from '@/lib/utils'
import { DoctorStatus } from '@prisma/client'
import React from 'react'

const ApproveBtn = ({
    status,
}: {
    status: DoctorStatus
}) => {

  return (

    <div>
        <button className={cn("py-1 px-1 rounded-full text-[10px] font-semibold dark:text-slate-600 text-slate-100",
                        status==="APPROVED"? "bg-green-500" 
                        : status==="PENDING"?"bg-amber-500"
                        :"bg-red-500")}>
                        {status}
                    </button>
    </div>
  )
}

export default ApproveBtn