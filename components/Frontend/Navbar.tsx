"use client"

import React from 'react'
import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import logoImage from '@/public/medicalLogo.png'

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 bg-white min-w-full z-40"> 
      <nav 
        className="flex max-w-7xl items-center 
        justify-between py-2.5 px-2 lg:px-8"
        aria-label="Global"
        >
       
        <div className="flex lg:flex-1">
          <Link href="/" className='py-2'> 
                <Image
                    alt="logoimage"
                    src={logoImage}
                    width={100}
                    height={100}
                    className="-mt-10 -mb-10 -translate-x-5 w-auto"
                />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-800"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="w-6 h-6 mx-5" aria-hidden/>
          </button>
        </div>
        
        
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link href="#" className="text-lg/6 font-semibold text-gray-600"> 
                Features
          </Link>
          <Link href="#" className="text-lg/6 font-semibold text-gray-600"> 
                Marketplace 
          </Link>
          <Link href="#" className="text-lg/6 font-semibold text-gray-600"> 
                Company
          </Link>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/login" className="text-sm/6 font-semibold text-gray-50
            bg-blue-500 py-2 px-6 rounded-md"> 
                Log in <span aria-hidden="true">&rarr;</span>  
          </Link>   
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full 
            overflow-y-auto bg-white px-6 py-6 sm:max-w-sm 
            sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md text-gray-800"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6 mt-20" />
            </button>
          </div>
          <div className="flow-root">
            <div className="divide-y divide-gray-200">
              <div className="space-y-2 py-6">
                <Link href="#" className="-mx-3 block rounded-lg px-3 py-2 
                    text-base/7 font-semibold text-gray-800 hover:bg-gray-400">
                        Features
                </Link>
                <Link href="#" className="-mx-3 block rounded-lg px-3 py-2 
                    text-base/7 font-semibold text-gray-800 hover:bg-gray-400">
                        Marketplace
                </Link>
                <Link href="#" className="-mx-3 block rounded-lg px-3 py-2 
                    text-base/7 font-semibold text-gray-800 hover:bg-gray-400">
                        Company
                </Link>
              </div>
              <div className="py-6">
                <Link href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 
                    text-base/7 font-semibold text-gray-800 hover:bg-gray-400">
                        Log in
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
