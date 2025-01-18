"use client"


import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import { Button } from "@/components/ui/button";
import {
Sheet,
SheetClose,
SheetContent,
SheetDescription,
SheetFooter,
SheetHeader,
SheetTitle,
SheetTrigger,
} from "@/components/ui/sheet"
import { BlogCategoryProps } from "@/utils/types";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import generateSlug from "@/utils/generateSlug";
import { createBlogCategory } from "@/actions/blogs";

const BlogCategoryForm = () => {


    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = React.useState<Partial<BlogCategoryProps>>({});
    const [blogCategoryData, setBlogCategoryData] = useState<BlogCategoryProps>({
        title: "",
        slug: "",
    });

    const validate = (contactData: Partial<BlogCategoryProps>) => {
            const newErrors: Partial<BlogCategoryProps> = {};
    
            if (!contactData.title) newErrors.title = "Title is required.";
    
            setErrors(newErrors);
    
            return Object.keys(newErrors).length === 0; 
        }
    
        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
            const { name, value } = e.target
            setBlogCategoryData((prev) => ({ ...prev, [name]:value}));
            
        } 

    const transformedErrors: Record<string, string[]> = 
    Object.entries(errors).reduce((acc, [key, value]) => {
        acc[key] = Array.isArray(value) ? value.map(String) : [String(value)];
        return acc;
    }, {} as Record<string, string[]>)


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        blogCategoryData.slug = generateSlug(blogCategoryData.title);

        try {
            
            const newCategory = await createBlogCategory(blogCategoryData)
            
            setSuccess(true)
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            toast.success("Blog Category Created Successfully")
            console.log("newCategory: ", newCategory);
            
        } catch (err) {
            setIsLoading(false);
            console.error(err);
        } finally {
            setIsLoading(false);
            setSuccess(false);
        }
    }

  return (

    <div className="grid grid-cols-2 gap-2">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                type="button"
                                variant={"outline"} 
                                size={"sm"} 
                                className="active:scale-90"
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader className="mt-2 py-3">
                                <SheetTitle>Create Blog Category</SheetTitle>
                                <SheetDescription className="py-3">
                                    Make changes to your blog here. Click create when you're done.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="w-full p-4 max-w-3xl bg-white border border-gray-200 
                            rounded-lg shadow sm:p-6 md:p-8 dark:bg-slate-900 dark:border-gray-700">
                                <form className="" onSubmit={handleSubmit}>
                                    <div className="col-span-full space-y-3">
                                        <div className="grid gap-6">
                                            <div className="gap-3">
                                                <TextInput
                                                label="Blog Category Title"
                                                name="title"
                                                placeholder="Enter your blog category title"
                                                type="text"
                                                value={blogCategoryData.title}
                                                errors={transformedErrors}
                                                disabled={isLoading}
                                                onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <SheetFooter>
                                    <div className="py-4">
                                        <SubmitButton
                                            title={"Create Blog Category"}
                                            isLoading={isLoading} 
                                            loadingTitle={"Creating..."} 
                                        />
                                    </div>
                                </SheetFooter>
                                </form>
                            </div>
                        </SheetContent>
                    </Sheet>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Add the new category</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>

  )
}

export default BlogCategoryForm