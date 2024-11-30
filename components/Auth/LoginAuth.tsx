"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SubmitButton from "../FormInputs/SubmitButton"
import { LoginProps } from "@/utils/types"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Alert } from "flowbite-react"
import { HiInformationCircle } from "react-icons/hi"
import TextInput from "../FormInputs/TextInput"
import Link from "next/link"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LoginAuthForm({ className, ...props }: UserAuthFormProps) {

  const [loginData, setLoginData] = React.useState<LoginProps>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState<Partial<LoginProps>>({});
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showNotification, setShowNotification] = React.useState<boolean>(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setLoginData((prev) => ({ ...prev, [name]:value}));
  };

  const validate = () => {
      const newErrors: Partial<LoginProps> = {};

      if (!loginData.email) newErrors.email = "Email is required.";
      else if (!/\S+@\S+\.\S+/.test(loginData.email)) newErrors.email = "Invalid email.";
      if (!loginData.password) newErrors.password = "Password is required.";
      else if (loginData.password.length < 6) newErrors.password = "Password must be at least 6 characters."
      
      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;

  }

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (validate()) {
        console.log("Form submitted successfully:", loginData);
        try {
          setIsLoading(true);
          console.log("Attempting to sign in with credentials:", loginData);
          const authData = await signIn("credentials", {
            ...loginData,
            redirect: false,
          });
          console.log("SignIn response:", authData);
          
          if (authData?.error) {
            setIsLoading(false);
            console.error("Sign-in error: Check your credentials");
            setShowNotification(true);
          } else {
            // Sign-in was successful
            setShowNotification(false);
            resetForm();
            setIsLoading(false);
            console.log("Login Successful");
            router.push("/dashboard");
          }
        } catch (error) {
          setIsLoading(false);
          console.error("Network Error:", error);
          //toast.error("Its seems something is wrong with your Network");
        }

        setIsSubmitted(true);
        resetForm();
        
      }
    }

  const resetForm = () => {
    setLoginData({ email: "", password: "" })
    setErrors({});
    setIsSubmitted(false);
    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
      {showNotification && (
        <Alert color="failure" icon={HiInformationCircle}>
          <span className="font-medium">Sign-in error!</span> Please Check
          your credentials
        </Alert>
      )}
        <div className="grid gap-4">
          <TextInput
              label="Email Address"
              name="email"
              placeholder="e.g. john@example.com"
              type="email"
              value={loginData.email}
              errors={errors}
              disabled={isLoading}
              onChange={handleChange} />
          <TextInput
              label="Password"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={loginData.password}
              errors={errors}
              disabled={isLoading}
              onChange={handleChange} />
          <SubmitButton 
            title={"Login"} 
            isLoading={isLoading} 
            loadingTitle={"Logging you in please wait..."} />
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or Login with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
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