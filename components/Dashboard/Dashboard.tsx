import React from 'react'
import { Activity, ArrowUpRight, CalendarDays, CreditCard, DollarSign, LayoutGrid, Users, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTotalProps, CardTransactionProps, Doctor, SalesProps } from '@/utils/types';
import CardTotal, { CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableHead, TableHeader, TableRow } from '../ui/table';
import CardTransaction from '../ui/cardTransaction';
import SalesCard from '../ui/saleCard';
import { getAdminAnalytics, getStats } from '@/actions/stats';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import AnalyticCards from '../AnalyticCards';
import { getDoctors } from '@/actions/users';
import Link from 'next/link';



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

  const analytics = await getAdminAnalytics();
  const session = await getServerSession(authOptions)
  const user = session?.user

  const doctors = await getDoctors() || [] as Doctor[]
  



  // const statsCards: CardTotalProps[] = [
  //   {
  //     title: "Doctors",
  //     icon: Users,
  //     count: stats.doctors,
  //     href: "/dashboard/doctors"
  //   },
  //   {
  //     title: "Patients",
  //     icon: UsersRound,
  //     count: stats.patients,
  //     href: "/dashboard/patients"
  //   },
  //   {
  //     title: "Appointments",
  //     icon: CalendarDays,
  //     count: stats.appointments,
  //     href: "/dashboard/appointments"
  //   },
  //   {
  //     title: "Services",
  //     icon: LayoutGrid,
  //     count: stats.services,
  //     href: "/dashboard/services"
  //   },

  // ]

  return (

    <main className="flex flex-col gap-5 w-full">
        <h1 className='scroll-m-20 text-2xl font-extrabold tracking-tight'>
        Welcome, Admin. {user?.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analytics && analytics.map((item,i) => {
          return <AnalyticCards key={i} data={item}/>
        })}
      </div>
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
            <CardContent>
                    <section className='flex justify-between'>
                      <div>
                        <CardTitle>Recent Doctors</CardTitle>
                        <p className="text-sm text-gray-400">
                        You made 265 sales this month.
                        </p>
                      </div>
                        <Button asChild className='p-3'>
                          <Link href="/dashboard/doctors">
                            View All
                          </Link>
                        </Button>
                    </section>
                    {doctors.slice(0,5).map((data, index) => {
                      const status = data.doctorProfile?.status
                      return (
                        <SalesCard
                          key={index}
                          status={status}
                          email={data.email}
                          name={data.name}
                          image={data.doctorProfile?.profilePicture}
                          wage={data.doctorProfile?.hourlyWage}
                        />
                    )})}
            </CardContent> 
      </section>
    </main>
        
  )
}

export default Dashboard