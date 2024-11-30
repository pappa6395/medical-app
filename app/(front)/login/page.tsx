import LoginForm from '@/components/Auth/LoginForm'
import LoginPage from '@/components/Auth/LoginPage'
// import loginImage from "@/public/LoginImage.jpeg"
// import Image from 'next/image'
import React from 'react'


const page = () => {


  return (
    
    <div>
      <LoginPage />
    </div>
    // <div className='bg-blue-100 min-h-screen py-8'>
    //     <div className="grid md:grid-cols-2 grid-cols-1 w-full 
    //         max-w-5xl mx-auto bg-white border border-gray-200 rounded-lg 
    //         shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
    //         <div className="hidden md:flex login-bg">
    //             {/* <Image 
    //               src={loginImage} 
    //               alt={'loginimage'}
    //               className='object-cover'/> */}
    //         </div>
    //         <div className="">
    //             <LoginForm />
    //         </div>

    //     </div>
    // </div>

  )
}

export default page