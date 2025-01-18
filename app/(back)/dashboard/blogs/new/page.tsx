import { getBlogCategories } from '@/actions/blogs';
import BlogForm from '@/components/FormInputs/BlogForm'
import { BlogCategory } from '@prisma/client';
import React from 'react'


const page = async () => {

  let categories = [] as BlogCategory[]; 
  try {
    categories = await getBlogCategories() || [];
  } catch (err) {
    console.log("Failed to get blog categories:", err);
  }

  const blogCategories = categories?.map((item) => {
      return {
          value: item?.id || "",
          label: item?.title || "",
      };
  })

  return (

    <div>
      <BlogForm blogCategories={blogCategories ?? []} />
    </div>

  )
}

export default page