import React from 'react'
import { CardContent } from './card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'
import { Badge } from './badge'
import { CardTransactionProps } from '@/utils/types'



const cardTransaction = (props: CardTransactionProps) => {

  return (

        <TableBody>
            <TableRow>
                <TableCell>
                    <div className="font-medium">{props.customer}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">{props.email}</div>
                </TableCell>
                <TableCell className="hidden xl:table-cell">{props.type}</TableCell>
                <TableCell className="hidden lg:table-cell">
                    <Badge className="text-xs" variant="secondary">
                    {props.status}
                    </Badge>
                </TableCell>
                <TableCell className="text-sm">{props.date}</TableCell>
                <TableCell className="text-right">{props.amount}</TableCell>
            </TableRow>
        </TableBody>

  )
}

export default cardTransaction