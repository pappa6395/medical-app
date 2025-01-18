"use client";
 
import {
Card,
CardContent,
CardDescription,
CardHeader,
CardTitle,
} from "@/components/ui/card";
 
import FormHeader from "./FormHeader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import FormFooter from "./FormFooter";
import ImageInput from "@/components/FormInputs/ImageInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import TextInput from "@/components/FormInputs/TextInput";
import TextArea from "@/components/FormInputs/TextAreaInput";
import generateSlug from "@/utils/generateSlug";
import { BlogProps, SelectOptionProps } from "@/utils/types";
import { Blogs } from "@prisma/client";
import { createBlog, updateBlogById } from "@/actions/blogs";
import BlogCategoryForm from "./BlogCategoryForm";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type BlogFormProps = {
    editingId?: string | undefined;
    initialData?: Blogs | undefined | null;
    blogCategories: SelectOptionProps[];
}

const QuillEditor = dynamic(() => import('./QuillEditor'), { ssr: false });

export default function BlogForm({
editingId,
initialData,
blogCategories,
}: BlogFormProps) {

const router = useRouter();
const [blogData, setBlogData] = useState<BlogProps>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    tags: initialData?.tags || "",
    summary: initialData?.summary || "",
    content: initialData?.content || "",
    imageUrl: initialData?.imageUrl || "/defaultImage.png",
    categoryId: initialData?.categoryId || "",
})
const [errors, setErrors] = useState<Partial<BlogProps>>({});

const initialBlogCategoryId = initialData?.categoryId || "";
const initialCategory = blogCategories.find(
(item) => item.value === initialBlogCategoryId
);
const [selectedMainCategory, setSelectedMainCategory] =
useState<any>(initialCategory);

const [isLoading, setIsLoading] = useState(false);

const initialImage = initialData?.imageUrl || "/defaultImage.png";
const [imageUrl, setImageUrl] = useState(initialImage);
const initialContent = initialData?.content || "";

const [content, setContent] = useState(initialContent);
const [step, setStep] = useState(1)

    const nextStep= () => {
        if (step < 3) {
            setStep((prev) => prev + 1)
        }
    }
    const prevStep = () => {
        if (step > 1) {
            setStep((prev) => prev - 1)
        }
    }

    const transformedErrors: Record<string, string[]> = 
    Object.entries(errors).reduce((acc, [key, value]) => {
        acc[key] = Array.isArray(value) ? value.map(String) : [String(value)];
        return acc;
    }, {} as Record<string, string[]>)

    const validate = (contactData: Partial<BlogProps>) => {
            const newErrors: Partial<BlogProps> = {};
    
            if (!contactData.title) newErrors.title = "Title is required.";
    
            if (!contactData.tags) newErrors.tags = "Tag is required.";
    
            if (!contactData.summary) newErrors.summary = "Summary is required.";
    
            if (!contactData.content) newErrors.content = "Contents are required.";
    
            setErrors(newErrors);
    
            return Object.keys(newErrors).length === 0; 
        }
    
        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
            const { name, value } = e.target
            setBlogData((prev) => ({ ...prev, [name]:value}));
            
        }
        const reset = () => {
            setBlogData({
                title: "",
                slug: "",
                tags: "",
                summary: "",
                content: "",
                imageUrl: "/defaultImage.png",
                categoryId: "",
            })
            setErrors({})
        }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        blogData.slug = generateSlug(blogData.title);
        blogData.imageUrl = imageUrl;
        blogData.categoryId = selectedMainCategory?.value;
        blogData.content = content;

        if (validate(blogData)) {

            setIsLoading(true)
            console.log("Data: ",blogData);
            
            try {
                
                    if (editingId) {
                        const updatedBlog = await updateBlogById(editingId, blogData);
                        console.log("UpdateData:", updatedBlog);
                        setIsLoading(false);
                        // Toast
                        toast.success("Successfully Updated!");
                        //reset
                        reset();
                        //route
                        router.push("/dashboard/blogs");
                        setImageUrl("/defaultImage.png");
        
                    } else {
                        const createdBlog = await createBlog(blogData);
                        console.log("CreateData:", createdBlog);
                        setIsLoading(false);
                        // Toast
                        toast.success("Successfully Created!");
                        //reset
                        reset();
                        //route
                        router.push("/dashboard/blogs");
                        setImageUrl("/defaultImage.png");
                    }
                } catch (error) {
                setIsLoading(false);
                console.log(error);
                }
        }

        
        
    }
 
    return (
    
        <form className="" onSubmit={handleSubmit}>
            {step === 2 ? (
                <FormHeader
                href="/blogs"
                title="Blog"
                editingId={editingId}
                loading={isLoading}
            />
            ) : (
                <div className="flex items-center justify-between">
                    <h2>Create Blog</h2>
                    <Button type="button" onClick={nextStep}>Next Step</Button>
                </div>
            )}

            {step === 1 && (
                <div className="grid grid-cols-12 gap-6 py-8">
                    <div className="lg:col-span-8 col-span-full space-y-5">
                    <Card>
                        <CardHeader>
                        <CardTitle>New Blog</CardTitle>
                        <CardDescription>
                            Add your new Blog category and details here.
                        </CardDescription>
                        </CardHeader>
                        <CardContent className="border-none shadow-none">
                            <div className="grid gap-6 space-y-3">
                                <div className="grid gap-3">
                                    <TextInput
                                        label="Blog Title"
                                        name="title"
                                        placeholder="e.g. Enter your Blog Title"
                                        type="text"
                                        value={blogData.title}
                                        errors={transformedErrors}
                                        disabled={isLoading}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <TextInput
                                        label="Blog Tags"
                                        name="tags"
                                        placeholder="e.g. Enter your tags"
                                        type="text"
                                        value={blogData.tags}
                                        errors={transformedErrors}
                                        disabled={isLoading}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <TextArea
                                        label="Blog Summary"
                                        name="summary"
                                        placeholder="e.g. Enter your summary"
                                        value={blogData.summary}
                                        errors={transformedErrors}
                                        disabled={isLoading}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-6 px-3">
                                <div className="flex space-x-2 items-end">
                                    <FormSelectInput
                                    label="Blog Categories"
                                    options={blogCategories}
                                    option={selectedMainCategory}
                                    setOption={setSelectedMainCategory}
                                    />
                                    <div>
                                        <BlogCategoryForm />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    </div>
                    <div className="lg:col-span-4 col-span-full ">
                    <div className="grid auto-rows-max items-start gap-4 ">
                        <ImageInput
                            label="Blog Banner Image"
                            imageUrl={imageUrl}
                            setImageUrl={setImageUrl}
                            endpoint="blogImageUpdate"
                        />
                    </div>
                    </div>
                </div>
            )}
            
            {step === 2 && (
                <div className="space-y-3">
                    <QuillEditor
                    label="Write your content here..."
                    className=""
                    value={content}
                    onChange={setContent}
                    />
                    <Button 
                        size={"sm"}
                        type="button" 
                        variant={"secondary"} 
                        onClick={prevStep}
                    >
                        Prev Step
                    </Button>
                </div>
                
            )}
            
            {step === 2 ? (
                <FormFooter
                href="/blogs"
                editingId={editingId}
                loading={isLoading}
                title="Blog"
                />
            ) : (
                <div className="flex justify-between items-center">
                    <div>
                        <Button variant={"outline"} type="button">
                            <Link href='/dashboard/blogs'>
                                Close
                            </Link>
                        </Button>
                    </div>
                    <Button type="button" onClick={nextStep} >
                        Next Step
                    </Button>
                </div>
            )}
            
        </form>
    
    );
}
 