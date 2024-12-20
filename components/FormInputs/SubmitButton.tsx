import { Loader } from 'lucide-react';
import React from 'react'
import { Button } from '../ui/button';
import { Icons } from '../ui/icons';

type SubmitButtonProps = {
    title: string;
    buttonType?: "submit" | "reset" | "button" | undefined
    isLoading: boolean;
    loadingTitle: string;
    variant?: "default" | "link" | "booking" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
}

const SubmitButton = ({
  title, 
  buttonType="submit", 
  isLoading=false, 
  loadingTitle,
  variant,
}: SubmitButtonProps) => {

  return (

    <div className='mt-2'>
        {isLoading ? (
            <Button disabled type={buttonType} variant={variant}  className='w-full'>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              {loadingTitle}
            </Button>
        ) : (
            <Button type={buttonType} variant={variant} className='w-full'>
              {title}
            </Button>
        )
      }  
    </div>
  )
}

export default SubmitButton