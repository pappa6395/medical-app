import { Button } from '@/components/ui/button'
import generateSlug from '@/utils/generateSlug';
import { Doctor, DoctorDetail } from '@/utils/types';
import { Plus } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

const NewLinkButton = ({
  title, 
  href="#",
  userId=""
}: {
  title: string; 
  href: string;
  userId?: string | undefined;
}) => {

  return (

    <>
        <Button className='text-sm' variant={"outline"} asChild>
            <Link href={href}>
                <Plus className='w-4 h-4 mr-2'/>
                {title}
            </Link>
        </Button>
    </>
  )
}

export default NewLinkButton