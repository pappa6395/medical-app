import React from 'react'

const SectionHeading = ({title}: {title: string}) => {
  return (
    <div>
        <h2 className="mb-3 leading-[1.2] text-slate-700 dark:text-slate-100
         scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {title}
        </h2>
    </div>
  )
}

export default SectionHeading