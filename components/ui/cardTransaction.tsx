import React from 'react'
import { CardContent } from './card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'
import { Badge } from './badge'
import { CardTransactionProps } from '@/utils/types'
import { Button } from './button'
import Link from 'next/link'
import { UserRole } from '@prisma/client'



const cardTransaction = ({
    customer,
    email,
    transactionId,
    status,
    date,
    amount,
    id,
    role,
}: CardTransactionProps) => {

  return (

        <TableBody>
            <TableRow>
                <TableCell>
                    <div className="font-medium">{customer}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">{email}</div>
                </TableCell>
                <TableCell className="hidden xl:table-cell">{transactionId}</TableCell>
                <TableCell className="hidden lg:table-cell">
                    <Badge className="text-xs" variant="secondary">
                    {status}
                    </Badge>
                </TableCell>
                <TableCell className="text-sm text-center">{date}</TableCell>
                <TableCell className="text-right">&#3647;{amount}</TableCell>
                <TableCell className="text-right translate-x-4">
                    <Button asChild variant={"outline"}>
                        <Link href={`/dashboard/${role==="DOCTOR" ? `doctor/appointments/view/${id}` : "sales"}`}>
                            View
                        </Link>
                    </Button>
                </TableCell>
            </TableRow>
        </TableBody>

  )
}

export default cardTransaction