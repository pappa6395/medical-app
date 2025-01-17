import { Button } from '@/components/ui/button'
import generateSlug from '@/utils/generateSlug';
import { Doctor, DoctorDetail } from '@/utils/types';
import { Plus } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

const NewButton = ({
  title, 
  doctors,
  userId
}: {
  title: string; 
  doctors?: DoctorDetail | undefined | null;
  userId?: string | undefined;
}) => {

  const doctorSlug = generateSlug(
    `${doctors?.doctorProfile?.firstName || "Unknown"} ${doctors?.doctorProfile?.lastName || "Unknown"}`
  );

  return (

    <>
        <Button className='text-sm' variant={"outline"} asChild>
            <Link href={`/doctors/${doctorSlug ?? ""}?id=${userId ?? ""}`}>
                <Plus className='w-4 h-4 mr-2'/>
                {title}
            </Link>
        </Button>
    </>
  )
}

export default NewButton