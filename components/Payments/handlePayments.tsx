"use client"

import React from 'react';
import logo from './logo.svg';
import { usePaystackPayment } from 'react-paystack';
import { Button } from '../ui/button';


// you can call this function anything
const onSuccess = (reference: any) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed')
}

export interface ConfigProps {
    reference: string;
    email: string;
    amount: number;
    publicKey?: string;
}

function HandlePayments({
    transactionConfig
}: {
    transactionConfig: ConfigProps
}) {

    const [configData, setConfigData] = React.useState({
        reference: transactionConfig?.reference ?? "",
        email: transactionConfig?.email ?? "",
        amount: transactionConfig?.amount ?? 0,
        publicKey: transactionConfig?.publicKey ?? "",
        
    })

    const PaystackHookExample = (config: ConfigProps) => {
        const transactionConfig = {...config,...configData};
        const initializePayment = usePaystackPayment(transactionConfig);
        return (
          <div>
              <Button onClick={() => {
                  initializePayment({onSuccess, onClose})
              }}>Paystack Hooks Implementation</Button>
          </div>
        );
    };


  return (
    <div className="max-w-5xl mx-auto p-8">
        <PaystackHookExample 
            reference={configData.reference} 
            email={configData.email} 
            amount={configData.amount} 
        />
    </div>
  );
}

export default HandlePayments;