
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { AnalyticProps } from '@/utils/types'
import Link from 'next/link'

const AnalyticCards = ({data}: {data: AnalyticProps}) => {

    const Icon = data.icon;
    const Unit = data.unit;

  return (

        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium'>
                {data.title??""}
            </CardTitle>
            <Icon className='h-5 w-5 text-muted-foreground' />
          </CardHeader>
          <CardContent className='border-none shadow-none'>
                <div className='text-2xl font-bold flex items-center'>
                    <Unit className='w-4 h-4' />
                    {data.count.toString().padStart(2,"0")??""}
                </div>
                <Link href={data.detailLink??""} className='text-xs text-muted-foreground'>
                    View Details
                </Link>
          </CardContent>
        </Card>

  )
}

export default AnalyticCards