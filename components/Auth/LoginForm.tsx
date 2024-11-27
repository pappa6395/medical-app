"use client"
import Image from "next/image";
import Link from "next/link";
import medicalLogo from '../../public/medicalLogo.png'
import { useState } from "react";
import { LoginProps } from "@/utils/types";
import TextInput from "../FormInputs/TextInput";

const LoginForm = () => {

    const [loginData, setLoginData] = useState<LoginProps>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<Partial<LoginProps>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
          console.log("Form submitted successfully:", loginData);
  
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

      <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              alt="Your Company"
              src={medicalLogo}
              className="mx-auto"
              width={200}
              height={200}
            />
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <TextInput
                    label="Email Address"
                    name="email"
                    type="email"
                    errors={errors}
                    value={loginData.email}
                    onChange={handleChange}/>
                <TextInput
                    label="Password"
                    name="password"
                    type="password"
                    errors={errors}
                    value={loginData.password}
                    onChange={handleChange}/>
              <div>
                <div className="flex items-center justify-end">
                  <div className="text-sm">
                    <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              <span>Don't have an Account?</span>{' '}
              <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Create a new account
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

export default LoginForm
  