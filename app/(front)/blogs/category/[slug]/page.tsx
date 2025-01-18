import { getBlogCategoryBySlug, getOtherBlogCategories } from '@/actions/blogs'
import { Button } from '@/components/ui/button';
import { getBlogDate } from '@/utils/getBlogDate';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { IBlogCategoryProps } from '@/utils/types';


const page = async ({params: paramsPromise}: any) => {

    const { slug } = await paramsPromise
    let category = null;
    try {
        category = await getBlogCategoryBySlug(slug) || null;
    } catch (err) {
        console.log("Failed to fetch blog category data:",err)
    }

    if (!category) {
        return <div>No blog category found with the given slug.</div>
    }

    let otherCategories = [] as IBlogCategoryProps[]
    try {
        otherCategories = await getOtherBlogCategories(category.id) || []
    } catch (err) {
        console.log("Failed to fetch other blog categories:",err)
    }

  return (

    <div className='max-w-7xl mx-auto'>
        <div className='lg: container'>
            <div className='grid grid-cols-12'>
                <div className='lg:col-span-8 p-6 col-span-full'>
                    <h1 className="scroll-m-20 text-4xl font-extrabold 
                    tracking-tight lg:text-5xl py-3">
                        {category.title}
                    </h1>
                    <div className='py-6'>
                        <div className='py-4 flex flex-col items-center justify-center'>
                            <div className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {category.blogs?.map((blog,i) => {
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
                <div className='lg:col-span-4 col-span-full p-6'>
                        {/* Social Links */}
                        {/* Related Blog */}
                        {/* Categories */}
                        {otherCategories && otherCategories.length > 0 && (
                            <div className='py-2'>
                                <h2 className='text-xl font-semibold border-b pb-2'>
                                    Categories
                                </h2>
                                <div className='inline-flex flex-col gap-3 pt-3'>
                                    {otherCategories?.map((category,i) => {
                                        return (
                                            <Button asChild key={i} variant={"outline"}>
                                                <Link 
                                                href={`${category.slug}`} 
                                                className='flex items-center gap-4 py-4'>
                                                    <div>
                                                        <p className='text-sm'>
                                                            {category.title}
                                                            ({category.blogs.length.toString().padStart(2,"0")}){" "}
                                                        </p>
                                                        
                                                    </div>
                                                </Link>
                                            </Button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                        
                </div>
            </div>
        </div>
    </div>

  )
}

export default page