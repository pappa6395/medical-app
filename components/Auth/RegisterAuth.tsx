"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import SubmitButton from "../FormInputs/SubmitButton"
import { RegisterInputProps } from "@/utils/types"
import { useRouter, useSearchParams } from "next/navigation"
import { Alert } from "flowbite-react"
import { HiInformationCircle } from "react-icons/hi"
import TextInput from "../FormInputs/TextInput"
import { createUser } from "@/actions/users"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"


interface UserAuthFormProps {
    role?: string | string[] | undefined
    plan?: string | string[] | undefined
}

export default function RegisterAuth({ role="USER", plan="", ...props }: UserAuthFormProps) {

  const [formData, setFormData] = React.useState<RegisterInputProps>({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        role,
        plan,
  });

  const [errors, setErrors] = React.useState<Partial<RegisterInputProps>>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role,
    plan,
  });
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showNotification, setShowNotification] = React.useState<boolean>(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('returnUrl') || "/dashboard"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]:value}));
  };

  const validate = () => {
    const newErrors: Partial<RegisterInputProps> = {
      fullName: "",
      email: "",
      phone: "",
      password: "",
    };

    if (!formData.fullName) newErrors.fullName = "Fullname is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters."
    
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  }

  const transformedErrors: Record<string, string[]> = 
    Object.entries(errors).reduce((acc, [key, value]) => {
      acc[key] = Array.isArray(value) ? 
      value.filter((v): v is string => typeof v === 'string') 
      : [value].filter((v): v is string => typeof v === 'string');
      return acc;
    }, {} as Record<string, string[]>)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {

      setIsLoading(true)

      try {

        console.log(formData, role, plan);
        
        const user = await createUser({...formData, role, plan});
        
        if (user && user.status === 200) {
          console.log("Account created successfully:", user.data);
          setIsSubmitted(true);
          resetForm();
          toast.success("Account created successfully")
          router.push(`/verifyAccount/${user.data?.id}`);
        } else {
          setShowNotification(true);
          console.log(user.error);
        }
      } catch (error) {
        console.log("Error creating data:", error);
        
      } finally {
        setIsLoading(false)
      }
    } 

  }

  const handleSignInWithProvider = async () => {
    setIsLoading(true);
    try {
      const res = await signIn("google", {redirect: false});
      console.log("Google Sign-in successful:", res);
      
      if (res?.error) {
        throw new Error(res.error);
      };

      router.push(returnUrl);

    } catch (error) {
      console.error("Network Error:", error);
      toast.error("Its seems something is wrong with your Network");

    } finally {
      setIsLoading(false);

    }
  }

  const resetForm = () => {
    setFormData({ fullName: "", email: "", phone:"", password: "", role: "USER", plan: "" })
    setErrors({});
    setIsSubmitted(false);
    setIsLoading(false);
  }


  return (
    <div className={cn("grid gap-6")} {...props}>
      <form onSubmit={handleSubmit}>
      {showNotification && (
        <Alert color="failure" icon={HiInformationCircle}>
          <span className="font-medium">Sign-up error!</span> Please Check
          your registration details
        </Alert>
      )}
        <div className="grid gap-4">
          <TextInput
              label="Full Name"
              name="fullName"
              placeholder="e.g. John Doh"
              type="text"
              value={formData.fullName}
              errors={transformedErrors}
              disabled={isLoading}
              onChange={handleChange} />
          <TextInput
              label="Email Address"
              name="email"
              placeholder="e.g. john@example.com"
              type="email"
              value={formData.email}
              errors={transformedErrors}
              disabled={isLoading}
              onChange={handleChange} />
            <TextInput
              label="Phone No."
              name="phone"
              placeholder="e.g. 098-765-4321"
              type="tel"
              value={formData.phone}
              errors={transformedErrors}
              disabled={isLoading}
              onChange={handleChange} />
            <TextInput
              label="Password"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={formData.password}
              errors={transformedErrors}
              disabled={isLoading}
              onChange={handleChange} />
            <SubmitButton 
              title={"Create your account"} 
              isLoading={isLoading} 
              loadingTitle={"creating an account..."} />
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 text-muted-foreground">
            Or Sign Up with
          </span>
        </div>
      </div>
      <Button variant="review" type="button" disabled={isLoading} onClick={() => signIn("google")}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}
