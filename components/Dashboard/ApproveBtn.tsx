"use client"
import { updateDoctorProfileById } from '@/actions/onboarding'
import { cn } from '@/lib/utils'
import { DoctorStatus } from '@prisma/client'

import React from 'react'
import toast from 'react-hot-toast'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ShadSelectInput from '../FormInputs/ShadSelectInput'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'


const ApproveBtn = ({
    status,
    profileId,
}: {
    status?: DoctorStatus;
    profileId: string | undefined;
}) => {

  const router = useRouter()
  const options = [
    {
      label: "PENDING",
      value: "PENDING",
    },
    {
      label: "APPROVED",
      value: "APPROVED",
    },
    {
      label: "REJECTED",
      value: "REJECTED",
    },
  ]

  const initialOption = status;
  const [selectedOption, setSelectedOption] = React.useState<any>(initialOption);
  const [isLoading, setIsLoading] = React.useState(false);
  console.log("Selected Option:", selectedOption);

  const updateStatus = async () => {
    setIsLoading(true);
    const data = {
      status: selectedOption,
    };

    try {
      const res = await updateDoctorProfileById(profileId, data);
      if (res?.status === 201) {
        toast.success("Doctor Status Updated Successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.log("Failed to update soctor status:", error);
      
    } finally {
      setIsLoading(false);
    }

  }
  

  return (

    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button 
            className={cn("py-1 px-1 rounded-full text-[10px] font-semibold dark:text-slate-600 text-slate-100",
              status==="APPROVED"? "bg-green-500" 
              : status==="PENDING"?"bg-amber-500"
              :"bg-red-500")}>
              {status}
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Approve the Doctor</DialogTitle>
              <DialogDescription>
                  Choose your approval status
              </DialogDescription>
              <ShadSelectInput 
                    label={'status'} 
                    optionTitle={'status'} 
                    options={options} 
                    selectOption={selectedOption} 
                    setSelectOption={setSelectedOption} 
                  />
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
                  {isLoading ? (
                    <DialogClose asChild>
                      <Button disabled type="button" variant="secondary">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </Button>
                    </DialogClose>
                  ) : (
                    <DialogClose asChild>
                      <Button onClick={updateStatus} type="button" variant="secondary">
                        save changes
                      </Button>
                  </DialogClose>
                  )}
                </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ApproveBtn