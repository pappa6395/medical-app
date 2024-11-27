"use client"
import Image from "next/image";
import Link from "next/link";
import medicalLogo from '@/public/medicalLogo.png';
import { RegisterInputProps } from "@/utils/types";
import { useState } from "react";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { createUser } from "@/actions/users";
import { UserRole } from "@prisma/client";
import toast from "react-hot-toast";


  const RegisterForm = ({role="USER"}:{role?:UserRole}) => {

    const [formData, setFormData] = useState<RegisterInputProps>({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      role,
    });

    const [errors, setErrors] = useState<Partial<RegisterInputProps>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]:value}));
    };

    const validate = () => {
      const newErrors: Partial<RegisterInputProps> = {};

      if (!formData.fullName) newErrors.fullName = "Fullname is required.";
      if (!formData.email) newErrors.email = "Email is required.";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email.";
      if (!formData.phone) newErrors.phone = "Phone number is required.";
      if (!formData.password) newErrors.password = "Password is required.";
      else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters."
      
      setErrors(newErrors);

      return Object.keys(newErrors).length === 0;

    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (validate()) {

        setIsLoading(true)

        try {

          console.log(formData, role);
          
          const user = await createUser({...formData, role});
          
          if (user && user.status === 200) {
            console.log("Account created successfully:", user.data);
            setIsSubmitted(true);
            resetForm();
            toast.success("Account created successfully")

          } else {
            console.log(user.error);
          }
        } catch (error) {
          console.log("Error creating data:", error);
          
        } finally {
          setIsLoading(false)
        }
      } 

    }

    const resetForm = () => {
      setFormData({ fullName: "", email: "", phone:"", password: "", role: "USER" })
      setErrors({});
      setIsSubmitted(false);
      setIsLoading(false);
    }


  return (

      <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-8 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              alt="Your Company"
              src={medicalLogo}
              className="mx-auto"
              width={200}
              height={200}
            />
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-600">
              Create your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
                <TextInput
                    label="Full Name"
                    name="fullName"
                    type="text"
                    errors={errors}
                    value={formData.fullName}
                    onChange={handleChange}/>
                  <TextInput
                    label="Email Address"
                    name="email"
                    type="email"
                    errors={errors}
                    value={formData.email}
                    onChange={handleChange}/>
                   <TextInput
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    errors={errors}
                    value={formData.phone}
                    onChange={handleChange}/>
                  <TextInput
                    label="Password"
                    name="password"
                    type="password"
                    errors={errors}
                    value={formData.password}
                    onChange={handleChange}/>
              <div>
                <SubmitButton 
                  title={"Create Account"} 
                  isLoading={isLoading} 
                  loadingTitle={"Creating an Account. Please wait..."}
                  />
              </div>
              {isSubmitted && <p className="text-sm text-green-600 font-semibold">
                Form submitted successfully!
              </p>
              }
            </form>
  
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              <span>Already have an Account?</span>{' '}
              <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }
  
export default RegisterForm

