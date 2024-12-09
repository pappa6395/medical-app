"use client";
 
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import SubmitButton from "../FormInputs/SubmitButton";
import { Input } from "../ui/input";
import { getApplicationByTn } from "@/actions/onboarding";

 
export default function TrackingForm() {

  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  
  const router = useRouter();
  const FormSchema = z.object({
    trackingNumber: z.string().min(10, {
      message: "Username must be at least 10 characters.",
    }),
  })
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trackingNumber: "",
    },
  })
 
  async function onSubmit(data: z.infer<typeof FormSchema>) {

    setIsLoading(true);
    
    try {
      const res = await getApplicationByTn(data.trackingNumber); 
      if (res?.status === 404) {
        setShowNotification(true);
        console.log("No application found with this tracking number");
        
      } else if (res?.status === 200) {
        // setUserId(res.data?.userId?? "")
        // setMatchedNumber(true)
        // setPage(res.data?.page?? "")
        toast.success("Reteiving your application successfully")
        router.push(`/onboarding/${res.data?.userId}?page=${res.data?.page}`)
      }
    } catch (error) {
      toast.error("Your tracking number is not matched or missing, please try again")
      console.log("Resuming Application Failed:", error);
      
    } finally {
      setIsLoading(false);

    }
    
  }
 
  return (
    <Form {...form}>
      {showNotification && (
        <div className="text-red-600 bg-red-200/40 rounded-lg">
            <Alert color="failure" icon={HiInformationCircle}>
              <p className="text-sm ml-2 -mt-2">
                Wrong Tracking Number!
                <span className="text-sm ml-2">Please Check the number and Enter again</span>
              </p>     
            </Alert>
        </div>
      )}
      
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="trackingNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tracking Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g NGAV1204TH" {...field} />
              </FormControl>
              <FormDescription className="overflow-hidden">
                Enter your Tracking Number to retrieve your application.
                This number is found on your application form. 
                          Example: NGAV1204TH 
                          (Note: The tracking number is case-sensitive)
                          Note: This feature is only available for applications submitted
                          through the online application form.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton 
            title="Submit to Resume"
            isLoading={isLoading} 
            loadingTitle={"Verify please wait..."} />
      </form>
    </Form>
  );
}