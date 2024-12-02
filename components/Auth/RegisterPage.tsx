import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import loginImage2 from "@/public/loginImage2.jpeg"
import RegisterAuth from "./RegisterAuth"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex-col">
        <div className="grid grid-cols-1 justify-center md:grid-cols-2 flex-1">
            <div className="hidden min-h-screen md:grid items-center">
                <div className="md:grid flex-col items-center justify-center text-white dark:border-r">
                    <div className="">
                        <Image
                        src={loginImage2}
                        width={850}
                        height={1200}
                        alt="loginimage"
                        className="min-w-screen min-h-screen login-bg" />
                    </div>
                    <div className="absolute z-20 p-4 flex top-10 text-lg font-medium">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        Acme Inc
                    </div>
                    <div className="absolute p-4 bottom-16 z-20 mt-auto">
                        <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;This library has saved me countless hours of work and
                            helped me  
                        </p>
                        <p className="text-lg">
                            deliver stunning designs to my clients faster than ever before.&rdquo;
                        </p>
                        <footer className="text-sm">Sofia Davis</footer>
                        </blockquote>
                    </div>
                </div>
                
            </div>
            <div className="bg-muted lg:p-8 items-center justify-center md:grid">
                <Link
                href="/examples/authentication"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute right-4 top-4 md:right-8 md:top-8"
                )}
                >
                SignUp
                </Link>
                    <div className="mx-auto space-y-6 grid grid-cols-1 items-center 
                    justify-center sm:w-[350px]">
                        <div className="grid space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Create an account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email below to create your account
                            </p>
                        </div>
                        
                        <RegisterAuth />
                        <p className="mt-5 text-center text-sm/6 
                        text-muted-foreground">
                        <span>Already have an Account?</span>{' '}
                        <Link 
                            href="/login" 
                            className="underline underline-offset-4 
                            hover:text-primary">
                            Sign In
                        </Link>
                        </p>
                    </div>
            </div>
        </div>
    </div>
  )
}