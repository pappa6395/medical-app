import { cn } from '@/lib/utils'
import React from 'react'

const SectionHeading = ({title, className}: {title: string; className?: string;}) => {
  return (
    <div>
        <h2 className={cn("mb-3 leading-[1.2] scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>
            {title}
        </h2>
    </div>
  )
}

export default SectionHeading