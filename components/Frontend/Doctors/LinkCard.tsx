import Link from 'next/link'
import React from 'react'


const LinkCard = ({className}:{className:string}) => {


  return (

    <div className='grid lg:grid-cols-5 
        md:grid-cols-3 sm:grid-cols-2 
        grid-col-1 gap-6'>
        <Link href={"#"} className={`flex gap-4
        text-slate-50 rounded-md py-3 px-6 ${className}`}>
            <h2>Anxiety</h2>
            <span aria-hidden="true">&rarr;</span>
        </Link>
        <Link href={"#"} className={`flex gap-4
        text-slate-50 rounded-md py-3 px-6 ${className}`}>
            <h2>Anxiety</h2>
            <span aria-hidden="true">&rarr;</span>
        </Link>
        <Link href={"#"} className={`flex gap-4
        text-slate-50 rounded-md py-3 px-6 ${className}`}>
            <h2>Anxiety</h2>
            <span aria-hidden="true">&rarr;</span>
        </Link>
        <Link href={"#"} className={`flex gap-4
        text-slate-50 rounded-md py-3 px-6 ${className}`}>
            <h2>Anxiety</h2>
            <span aria-hidden="true">&rarr;</span>
        </Link>
        <Link href={"#"} className={`flex gap-4
        text-slate-50 rounded-md py-3 px-6 ${className}`}>
            <h2>Anxiety</h2>
            <span aria-hidden="true">&rarr;</span>
        </Link>
        <Link href={"#"} className={`flex gap-4
        text-slate-50 rounded-md py-3 px-6 ${className}`}>
            <h2>Anxiety</h2>
            <span aria-hidden="true">&rarr;</span>
        </Link>
    </div>
  )
}

export default LinkCard