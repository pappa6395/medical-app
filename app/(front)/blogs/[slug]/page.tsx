import { getBlogBySlug, getBlogsByCategories, getRelatedBlogs } from '@/actions/blogs'
import { getUserById } from '@/actions/users'

import BlogDetail from '@/components/BlogDetails'
import { authOptions } from '@/lib/auth'
import { BlogCategory, Blogs, } from '@prisma/client'
import { getServerSession } from 'next-auth'
import React from 'react'

const BlogPage = async ({params: paramsPromise}: any) => {

    const { slug } = await paramsPromise
    const session = await getServerSession(authOptions);
    const userId = session?.user.id || ""
    console.log("User ID:",userId);
    
    // const blog = await getBlogBySlug(slug);
    // const categories = await getBlogsByCategories() || [];
    // const settings = await getSettings() || null;

    let blog = null;
    let categories = [] as BlogCategory[];
    let user = null;

    try {
      const [
        blogResponse, 
        categoriesResponse, 
        userResponse
      ] = await Promise.all([

        getBlogBySlug(slug),
        getBlogsByCategories(),
        getUserById(userId),
      ])

      blog = blogResponse || null;
      categories = categoriesResponse || [];
      user = userResponse || null;

    } catch (err) {
      console.log("Failed to fetch blog data:",err)
    }

    if (!blog) {
        return <h1>Blog not found</h1>
    }

    let relatedBlog = [] as Blogs[]
    try {
      relatedBlog = await getRelatedBlogs(blog?.id) || []
    } catch (err) {
      console.log("Failed to fetch related blogs:", err)
    }
    
  return (

    <div className='dark:bg-green-950'>
        <BlogDetail 
            blog={blog} 
            relatedBlog={relatedBlog}
            categories={categories as any}
            settings={user}
        />
    </div>

  )
}

export default BlogPage