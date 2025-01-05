import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import CardTransaction from '@/components/ui/cardTransaction'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatCreatedDate } from '@/utils/formattedDate'
import { AppointmentProps, AppointmentSaleProps, SalesProps } from '@/utils/types'
import { Appointment, Sale, UserRole } from '@prisma/client'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'



const Sales = ({
    saleData,
    appointments, 
    title,
    role,
}: {
    saleData: Sale[]; 
    appointments: AppointmentSaleProps[];
    title: string;
    role: UserRole | undefined;
}) => {

  return (

    <div>
        <section className="grid gird-cols-1 md:grid-cols-1 gap-4 transition-all">
            <Card>
                <CardHeader className="px-2">
                    <CardTitle className='flex justify-between'>
                        <div>Transactions</div>
                        <Button>
                            <span>View All</span><ArrowUpRight />
                        </Button>
                    </CardTitle>
                    <CardDescription>Recent transactions from your patients.</CardDescription>
                </CardHeader>
                <CardContent className='shadow-none border-none'> 
                <Table x-chunk="dashboard-05-chunk-3">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead className="hidden xl:table-cell">Transaction ID</TableHead>
                            <TableHead className="hidden lg:table-cell">Status</TableHead>
                            <TableHead className="text-sm text-center">Date</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">View</TableHead>
                        </TableRow>
                    </TableHeader>
                        {appointments?.map((data, i) => {
                            return (
                                <CardTransaction 
                                    key={i}
                                    id={data.id || ""} 
                                    customer={`${data.firstName || "Unknown"} ${data.lastName || "Unknown"}`}
                                    transactionId={data.transactionId || ""} 
                                    email={data.email || ""}
                                    status={data.paymentStatus || "pending"}
                                    date={formatCreatedDate(data.createdAt) || ""}
                                    amount={data.paidAmount || 0}
                                    role={role || undefined}
                                />
                            )
                        })}
                </Table>
                </CardContent>
            </Card>
        </section>
    </div>
  )
}

export default Sales