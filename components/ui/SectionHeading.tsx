import React from 'react'

const SectionHeading = ({title}: {title: string}) => {
  return (
    <div>
        <h2 className="mb-3 text-3xl font-bold leading-[1.2]
         text-dark dark:text-white sm:text-4xl md:text-[40px]">
            {title}
        </h2>
    </div>
  )
}

export default SectionHeading