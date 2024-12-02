"use client"
import React from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'

const FixedBookButton = () => {

  return (

    <div 
        className="fixed bottom-0 w-full left-0 right-0 z-40 bg-white
        dark:bg-slate-800 shadow-2xl 
        py-8 px-6 rounded-md border border-gray-200 dark:border-gray-500">
        <div className='mx-auto max-w-4xl flex gap-4 justify-between'>
            <div className='w-full'>
                <p className='font-bold text-lg'>$56</p>
                <p className='font-semibold text-sm'>Tue, Mar 12 - 8:00 AM GMT+3</p>
            </div>
            <Button
            variant="outline"
            className="inline-flex items-center justify-center 
            w-full px-2 py-6 text-sm font-semibold leading-5 
            text-white transition-all duration-200 
            bg-slate-800 dark:bg-slate-500 border border-transparent 
            rounded-full focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-slate-600 
            hover:bg-slate-500 hover:text-slate-50
            uppercase tracking-widest"
            >
            <Plus className="w-5 h-5 mr-1" />
                Book
            </Button>
        </div>
    </div>
  )
}

export default FixedBookButton