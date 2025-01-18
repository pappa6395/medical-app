
import { getBlogById, getBlogCategories } from '@/actions/blogs';
import BlogForm from '@/components/FormInputs/BlogForm';
import { BlogCategory } from '@prisma/client';
import React from 'react'

const page = async ({params: paramsPromise}: any) => {

  const { id } = await paramsPromise;

  let blog = null;
  let categories = [] as BlogCategory[]
  try {
    const [blogResponse, categoriesResponse] = await Promise.all([
      getBlogById(id),
      getBlogCategories(),
    ]);
    blog = blogResponse || null;
    categories = categoriesResponse || [];

  } catch (err) {
    console.log("Failed to get blog or categories:", err);
  }

  const blogCategories = categories?.map((item) => {
      return {
          value: item?.id || "",
          label: item?.title || "",
      };
  })

  return (

    <div>
        <BlogForm 
          initialData={blog ?? null}
          editingId={id ?? ""}
          blogCategories={blogCategories ?? []} />
    </div>


  )
}

export default page