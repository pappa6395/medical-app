"use server";
import { prismaClient } from "@/lib/db";
import { BlogCategoryProps, BlogProps } from "@/utils/types";
import { revalidatePath } from "next/cache";


export async function updateBlog(id: string, data: BlogProps) {
  try {
    const updatedBlogs = prismaClient.blogs.update({
      where: {
        id,
      },
      data,
    });
    
    // console.log(newCategory);
    revalidatePath("/dashboard/Blogs");
    return updatedBlogs;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getBlogs() {
  try {
    const blogs = await prismaClient.blogs.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    });

    return blogs;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getBlogById(id: string) {
  if (id) {
    try {
      const blog = await prismaClient.blogs.findUnique({
        where: {
          id,
        }
      });
  
      return blog;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
}

export async function getBlogBySlug(slug: string) {
  if (slug) {
    try {
      const blog = await prismaClient.blogs.findUnique({
        where: {
          slug,
        },
        include: {
          category: true,
        },
      });
  
      return blog;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
}

export async function getBlogCategoryBySlug(slug: string) {
  if (slug) {
    try {
      const category = await prismaClient.blogCategory.findUnique({
        where: {
          slug,
        },
        include: {
          blogs: true,
        },
      });
  
      return category;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
}

export async function createBlog(data: BlogProps) {

  console.log("Payload checked:", data);
  
  const slug = data.slug
  try {
    const existingBlog = await prismaClient.blogs.findUnique({
      where: {
        slug,
      }
    });
    if (existingBlog) {
      return existingBlog;
    }
    const newBlog = await prismaClient.blogs.create({
      data,
    });
    revalidatePath("/dashboard/blogs");
    return newBlog;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createBlogCategory(data: BlogCategoryProps) {
  const slug = data.slug
  if (slug) {
    try {
      const existingCategory = await prismaClient.blogCategory.findUnique({
        where: {
          slug,
        }
      });
      if (existingCategory) {
        return existingCategory;
      }
      const newCategory = await prismaClient.blogCategory.create({
        data,
      });
      revalidatePath("/dashboard/blogs");
      return newCategory;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export async function getBlogCategories() {
  try {
    const categories = await prismaClient.blogCategory.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
 
    return categories;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getBlogsByCategories() {
  try {
    const blogs = await prismaClient.blogCategory.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        blogs: true,
      }
    });
 
    return blogs;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateBlogById(id: string, data: BlogProps) {
  try {
    const updatedBlog = await prismaClient.blogs.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/blogs");
    return updatedBlog;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteBlogById(id: string) {

  if (id) {
    try {
      const deletedBlog = await prismaClient.blogs.delete({
        where: {
          id,
        },
      });
      revalidatePath("/dashboard/blogs");
      return {
        ok: true,
        data: deletedBlog,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

export async function getRelatedBlogs(blogId: string) {
  const currentBlog = await prismaClient.blogs.findUnique({
    where: {
      id: blogId,
    },
    select: {
      categoryId: true
    },
  })
  if (!currentBlog) {
    throw new Error('Blog not found');
  }
  const relatedBlogs = await prismaClient.blogs.findMany({
    where: {
      categoryId: currentBlog.categoryId,
      NOT: {
        id: blogId,
      }
    },
    take: 3,
    orderBy: {
      createdAt: 'desc',
    },
  })
  return relatedBlogs;
}

export async function getOtherBlogCategories(categoryId: string) {

  const otherCategories = await prismaClient.blogCategory.findMany({
    where: {
      NOT: {
        id: categoryId,
      }
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      blogs: true,
    },
  })
  return otherCategories;
}