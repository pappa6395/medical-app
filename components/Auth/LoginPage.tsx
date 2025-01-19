import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import LoginAuth from "./LoginAuth"
import loginImage2 from "@/public/loginImage2.jpeg"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function LoginPage() {
    
  return (
    <div className="relative min-h-screen flex-col">
        <div className="grid grid-cols-1 justify-center md:grid-cols-2 flex-1">
            <div className="hidden min-h-screen md:grid items-center">
                <div className="md:grid flex-col items-center 
                justify-center text-white dark:border-r bg-red-200">
                    <div className="">
                        <Image
                        src={loginImage2}
                        width={850}
                        height={1200}
                        alt="loginimage"
                        className="min-w-screen min-h-screen login-bg" />
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
            <div className="bg-muted min-h-screen lg:p-8 
            items-center justify-center grid dark:bg-green-950">
                <div className="mx-auto space-y-6 grid grid-cols-1 items-center 
                justify-center px-4 sm:px-0 sm:w-[350px]">
                    <div className="grid space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Welcome Back!
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email and password below to login your account
                        </p>
                    </div>
                    <LoginAuth />
                    <p className="mt-5 text-center text-sm/6 
                    text-muted-foreground">
                    <span>Don't have an Account?</span>{' '}
                    <Link 
                        href="/register" 
                        className="underline underline-offset-4 
                        hover:text-primary">
                        Create a new account
                    </Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}