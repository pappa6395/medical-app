import { cn } from '@/lib/utils';
import React from 'react'
import { CardDescription, CardHeader, CardTitle } from './card';

type Props = {
    title: string;
    description: string;
    classname?: string;
}

export default function PageTitle({title, description, classname}: Props) {
  return (
    <div>
        <CardHeader className={cn("font-semibold", classname)}>
            <CardTitle className='text-2xl'>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
    </div>
    
  )
}