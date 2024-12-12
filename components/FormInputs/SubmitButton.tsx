import { Loader } from 'lucide-react';
import React from 'react'
import { Button } from '../ui/button';
import { Icons } from '../ui/icons';

type SubmitButtonProps = {
    title: string;
    buttonType?: "submit" | "reset" | "button" | undefined
    isLoading: boolean;
    loadingTitle: string;
}

const SubmitButton = ({title, buttonType="submit", isLoading=false, loadingTitle}: SubmitButtonProps) => {

  return (

    <div className='mt-2'>
        {isLoading ? (
            <Button disabled type={buttonType} className='w-full'>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              {loadingTitle}
            </Button>
        ) : (
            <Button type={buttonType} className='w-full'>
              {title}
            </Button>
        )
      }  
    </div>
  )
}

export default SubmitButton