
import RegisterPage from '@/components/Auth/RegisterPage'
import React from 'react'


const page = async ({searchParams}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {

  const { role, plan } = await searchParams
  console.log(role, plan);
  

  return (

    <div>
      <RegisterPage role={role} plan={plan} />
    </div>
    // <div className='bg-blue-100 min-h-screen py-8'>
    //     <div className="grid md:grid-cols-2 grid-cols-1 w-full 
    //         max-w-5xl mx-auto bg-white border border-gray-200 rounded-lg 
    //         shadow dark:bg-gray-800 dark:border-gray-700">
    //         <div className="hidden md:flex linear-bg">
    //             {/* image */}
    //         </div>
    //         <div className="">
    //             <RegisterForm />
    //         </div>

    //     </div>
    // </div>

  )
}

export default page