"use server"

import HandlePayments from '@/components/Payments/handlePayments'
import React from 'react'

const page = () => {

    // const transactionConfig = {
    //     reference: (new Date()).getTime().toString(),
    //     email: "johnDoe@example.com",
    //     amount: 150,
    //     publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY??"",
    // }

  return (

    <div>
        {/* <HandlePayments transactionConfig={transactionConfig} /> */}
    </div>

  )
}

export default page