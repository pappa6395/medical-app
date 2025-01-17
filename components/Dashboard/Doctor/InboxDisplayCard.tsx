import { Calendar } from 'lucide-react'
import React from 'react'
import { Inbox } from '@prisma/client';
import NewLinkButton from './NewLinkButton';

const InboxDisplayCard = ({
  messages, 
  href,
  title,
}: {
  messages: Inbox[]; 
  href: string;
  title: string;
}) => {

  const count = messages.length??0;
  

  return (

    <div className='flex items-center justify-center h-1/2 px-4'>
        <div className='text-center border-gray-100 dark:bg-slate-700
        shadow-md rounded-md py-4 px-6 flex flex-col items-center gap-1'>
            <Calendar />
            <div className='py-3'>
                  {count && count > 1 ? (
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                      You have {count} {title}s today.
                    </p>
                  ) : (
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                      You have {count} {title} today.
                    </p>
                  )}
            </div>
            <NewLinkButton  title={`New ${title}`} href={href}/>
        </div>
    </div>

  )
}

export default InboxDisplayCard