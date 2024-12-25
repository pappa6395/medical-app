import React from 'react'
import { Activity, ArrowUpRight, CalendarDays, CreditCard, DollarSign, LayoutGrid, Users, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTotalProps, CardTransactionProps, SalesProps } from '@/utils/types';
import CardTotal, { CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableHead, TableHeader, TableRow } from '../ui/table';
import CardTransaction from '../ui/cardTransaction';
import SalesCard from '../ui/saleCard';
import { getStats } from '@/actions/stats';


// const cardData: CardTotalProps[] = [
//     {
//       label: "Total Revenue",
//       amount: "$45,231.89",
//       discription: "+20.1% from last month",
//       icon: DollarSign
//     },
//     {
//       label: "Subscription",
//       amount: "+2350",
//       discription: "+180.1% from last month",
//       icon: Users
//     },
//     {
//       label: "Sales",
//       amount: "+12,234",
//       discription: "+19% from last month",
//       icon: CreditCard
//     },
//     {
//       label: "Active Mow",
//       amount: "+573",
//       discription: "+201 from last month",
//       icon: Activity
//     }
// ]
const transactionData: CardTransactionProps[] = [
    {
        customer: "Liam Johnson",
        email: "liam@example.com",
        type: "Sale",
        status: "Fulfilled",
        date: "23-06-2024",
        amount: "$ 250.00",
    },
    {
        customer: "Olivia Smith",
        email: "olivia@example.com",
        type: "Refund",
        status: "Declined",
        date: "15-07-2024",
        amount: "-",
    },
]
const userSalesData: SalesProps[] = [
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      salesAmount: "+$1,999.00"
    },
    {
      name: "Jackson Lee",
      email: "isabella.nguyen@email.com",
      salesAmount: "+$1,999.00"
    },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      salesAmount: "+$39.00"
    },
    {
      name: "William Kim",
      email: "will@email.com",
      salesAmount: "+$299.00"
    },
    {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      salesAmount: "+$39.00"
    }
  ];


const Dashboard = async() => {

  const stats = await getStats();

  const statsCards: CardTotalProps[] = [
    {
      title: "Doctors",
      icon: Users,
      count: stats.doctors,
      href: "/dashboard/doctors"
    },
    {
      title: "Patients",
      icon: UsersRound,
      count: stats.patients,
      href: "/dashboard/patients"
    },
    {
      title: "Appointments",
      icon: CalendarDays,
      count: stats.appointments,
      href: "/dashboard/appointments"
    },
    {
      title: "Services",
      icon: LayoutGrid,
      count: stats.services,
      href: "/dashboard/services"
    },

  ]

  return (

    <main className="flex flex-col gap-5 w-full">
        <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Medical-App</h1>
        </div>
        <section className="grid w-full grid-cols-1 gap-4 gap-x-8 
        transition-all sm:grid-cols-2 xl:grid-cols-4">
        {statsCards.map((stat, index) => (
          <CardTotal 
            key={index}
            count={stat.count}
            href={stat.href}
            icon={stat.icon}
            title={stat.title}
          />
        ))}
        </section>
      <section className="grid gird-cols-1 md:grid-cols-2 gap-4 transition-all">    
            <CardContent>
                <CardHeader className="px-2">
                    <CardTitle className='flex justify-between'>
                        <div>Transactions</div>
                        <Button>
                            <span>View All</span><ArrowUpRight />
                        </Button>
                    </CardTitle>
                    <CardDescription>Recent transactions from your store.</CardDescription>
                </CardHeader>
                <Table x-chunk="dashboard-05-chunk-3">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead className="hidden xl:table-cell">Type</TableHead>
                            <TableHead className="hidden lg:table-cell">Status</TableHead>
                            <TableHead className="text-sm">Date</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                        {transactionData.map((data, index) => (
                            <CardTransaction 
                                key={index} 
                                customer={data.customer}
                                email={data.email}
                                type={data.type}
                                status={data.status}
                                date={data.date}
                                amount={data.amount}
                            />
                        ))}
                </Table>
            </CardContent>
            <CardContent className="flex justify-between gap-4">
                    <section>
                        <h1>Recent Sales</h1>
                        <p className="text-sm text-gray-400">
                        You made 265 sales this month.
                        </p>
                    </section>
                    {userSalesData.map((data, index) => (
                        <SalesCard
                        key={index}
                        email={data.email}
                        name={data.name}
                        salesAmount={data.salesAmount}
                        />
                    ))}
            </CardContent> 
      </section>
    </main>
        
  )
}

export default Dashboard