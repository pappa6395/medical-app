"use client"

import React from 'react'
import SectionHeading from '@/components/ui/SectionHeading'
import { FaBriefcase } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Captions } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BlogCategory, Blogs } from '@prisma/client'
import { getBlogDate } from '@/utils/getBlogDate'


export interface IBlogCategory extends BlogCategory {
    blogs: Blogs[]
}

const BlogSection = ({blogCategories}: {blogCategories: IBlogCategory[] }) => {

    const [activeCategory, setActiveCategory] = React.useState(blogCategories[0])
    
  return (

    <div id="blogs" className='ralative bg-slate-50 dark:bg-slate-900
    rounded-tr-2xl px-8 py-16'>
        <div className='space-y-2'>
            <SectionHeading title={"Exploring Our Blog"} className=''/> 
        </div>
        <div className='py-5'>
            <div className='flex flex-wrap gap-4'>
                {blogCategories.map((category, i) => {
                    return (
                        <button  
                        key={i} 
                        className={cn('dark:bg-slate-600 bg-slate-200 py-2 px-6 text-sm rounded-full uppercase', 
                        activeCategory.slug === category.slug && "bg-lime-500 dark:bg-lime-600")}
                        onClick={() => setActiveCategory(category)}
                        >
                            {category.title}
                        </button>
                    )
                })}
            </div>
            <div className='py-4 flex flex-col items-center justify-center'>
                <div className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {activeCategory.blogs?.map((blog,i) => {
                        return (
                            <div key={i} className='border rounded-xl shadow-md dark:border-gray-800'>
                                <div>
                                    <Link href={`/blogs/${blog.slug}`}>
                                        <Image 
                                            src={`${blog.imageUrl}` || "/defaultImage.png"}
                                            alt={"image"}
                                            width={1280}
                                            height={720}
                                            className='rounded-2xl'
                                        />
                                    </Link>
                                    <Link href={"#"} className='block w-fit ml-3 px-2 py-2 mt-2 
                                    dark:hover:bg-lime-600 hover:bg-lime-400 duration-300 
                                    border rounded-full'>
                                        <span className='font-medium text-neutral-500 
                                        hover:text-slate-800'>
                                            {getBlogDate(blog.createdAt)}
                                        </span>
                                    </Link>
                                    <Link href={"#"} className='block px-2 py-2 ml-3 hover:text-lime-400 duration-300'>
                                        <h2 className='font-bold text-2xl'>{blog.title}</h2>
                                    </Link>
                                </div>  
                            </div>
                        )
                    })}
                </div>
                <button 
                    type="button" 
                    className='border w-fit rounded-full shadow-md font-semibold
                    px-2 py-2 uppercase tracking-wide hover:text-lime-500'>
                    Load More
                </button>
            </div>
        </div>
    </div>

  )
}

export default BlogSection