import { getBlogsByCategories } from '@/actions/blogs';
import BlogSection, { IBlogCategory } from '@/components/BlogSection'
import React from 'react'


const page = async () => {

  let blogCategories = [] as IBlogCategory[];
  try {
    blogCategories = await getBlogsByCategories() || [];
  } catch (err) {
    console.log("Failed to fetch blog data:", err);
  }

  return (

    <div>
        <BlogSection blogCategories={blogCategories}/>
    </div>

  )
}

export default page