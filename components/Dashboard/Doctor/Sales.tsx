import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import CardTransaction from '@/components/ui/cardTransaction'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatCreatedDate } from '@/utils/formattedDate'
import { AppointmentProps, AppointmentSaleProps, SalesProps } from '@/utils/types'
import { Appointment, Sale, UserRole } from '@prisma/client'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

// const transactionData: CardTransactionProps[] = [
//     {
//         customer: "Liam Johnson",
//         email: "liam@example.com",
//         type: "Sale",
//         status: "Fulfilled",
//         date: "23-06-2024",
//         amount: "$ 250.00",
//     },
//     {
//         customer: "Olivia Smith",
//         email: "olivia@example.com",
//         type: "Refund",
//         status: "Declined",
//         date: "15-07-2024",
//         amount: "-",
//     },
// ]
// const userSalesData: SalesProps[] = [
//     {
//       name: "Olivia Martin",
//       email: "olivia.martin@email.com",
//       salesAmount: "+$1,999.00",
//       image: null,
//     },
//     {
//       name: "Jackson Lee",
//       email: "isabella.nguyen@email.com",
//       salesAmount: "+$1,999.00",
//       image: null,
//     },
//     {
//       name: "Isabella Nguyen",
//       email: "isabella.nguyen@email.com",
//       salesAmount: "+$39.00",
//       image: null,
//     },
//     {
//       name: "William Kim",
//       email: "will@email.com",
//       salesAmount: "+$299.00",
//       image: null,
//     },
//     {
//       name: "Sofia Davis",
//       email: "sofia.davis@email.com",
//       salesAmount: "+$39.00",
//       image: null,
//     }
// ];

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
            <CardContent>
                <CardHeader className="px-2">
                    <CardTitle className='flex justify-between'>
                        <div>Transactions</div>
                        <Button>
                            <span>View All</span><ArrowUpRight />
                        </Button>
                    </CardTitle>
                    <CardDescription>Recent transactions from your appointments.</CardDescription>
                </CardHeader>
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
                        {appointments.map((data, i) => {
                            return (
                                    <CardTransaction 
                                    key={i}
                                    id={data.id} 
                                    customer={`${data.firstName} ${data.lastName}`}
                                    transactionId={data.transactionId} 
                                    email={data.email}
                                    status={data.paymentStatus}
                                    date={formatCreatedDate(data.createdAt)}
                                    amount={data.paidAmount}
                                    role={role}
                                    />
                            )
                        })}
                </Table>
            </CardContent>
        </section>
    </div>

  )
}

export default Sales