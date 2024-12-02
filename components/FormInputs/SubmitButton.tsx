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

        //     <button
        //     type={buttonType}
        //     className="flex w-full justify-center items-center rounded-md 
        //     bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold 
        //     text-white shadow-sm hover:bg-indigo-500 
        //     focus-visible:outline focus-visible:outline-2 
        //     focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        //     >
        //     <Loader className='w-4 h-4 mr-2 flex-shrink-0 animate-spin'/>{loadingTitle}
        //     </button>
        // ) : ( 
        //     <button
        //     type={buttonType}
        //     className="flex w-full justify-center items-center rounded-md 
        //     bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold 
        //     text-white shadow-sm hover:bg-indigo-500 
        //     focus-visible:outline focus-visible:outline-2 
        //     focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        //     >
        //     {title}
        //     </button>
        )
      }  
    </div>
  )
}

export default SubmitButton