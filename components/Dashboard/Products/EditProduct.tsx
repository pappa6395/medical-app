"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ChevronLeft, TrashIcon, UploadIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import productImage from '@/public/product1.jpg'
import { DataTable } from '@/components/ui/DataTable'
import { columns, data } from './EditProduct/StockDataTable'
import PageTitle from '@/components/ui/PageTitle'

type Props = {};

const EditProduct = ({}: Props) => {


  return (

    <main className="grid flex-1 items-start gap-6 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid flex-1">
            <div className='flex justify-between items-center'>
                <div className='flex gap-4'>
                    <Button variant="outline" size={"icon"} className='h-7 w-7'>
                        <ChevronLeft className='h-4 w-4' />
                        <span className='sr-only'>Back</span>
                    </Button>
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Edit Product
                    </h1>
                    <Badge className="text-base" variant="secondary">
                        In stock
                    </Badge>
                </div>
                <div className="flex items-center gap-2 md:ml-auto md:flex">
                    <Button variant="outline" size="sm">
                        Discard
                    </Button>
                    <Button size="sm">Save Product</Button>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 flex-1 gap-6">
            <div className='flex flex-col col-span-1 sm:col-span-2 gap-6'>
                <Card className=''>
                    <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>Update the product information</CardDescription>
                    </CardHeader>
                    <CardContent className='border-none shadow-none'>
                        <form className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" type="text" className="w-full" defaultValue="Gamer Gear Pro Controller" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                                    className="min-h-32"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <Label htmlFor="price">Price</Label>
                                    <Input id="price" type="number" defaultValue="99.99" />
                                </div>
                                <div>
                                    <Label htmlFor="inventory">Inventory</Label>
                                    <Input id="inventory" type="number" defaultValue="100" />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-05-chunk-3">
                  <PageTitle title='Stock' description='update your stock info here.'/>
                  <CardContent className='border-none shadow-none'>
                    <DataTable columns={columns} data={data} />
                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-05-chunk-3">
                  <PageTitle title='Product Category' description=''/>
                  <CardContent className='border-none shadow-none'>
                        <div className="grid gap-6 sm:grid-cols-3">
                            <div className="grid gap-3">
                                <Label htmlFor="category">Category</Label>
                                <Select>
                                <SelectTrigger id="category" aria-label="Select category">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="clothing">Clothing</SelectItem>
                                    <SelectItem value="electronics">Electronics</SelectItem>
                                    <SelectItem value="accessories">Accessories</SelectItem>
                                </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="subcategory">Subcategory (optional)</Label>
                                <Select>
                                <SelectTrigger id="subcategory" aria-label="Select subcategory">
                                    <SelectValue placeholder="Select subcategory" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="t-shirts">T-Shirts</SelectItem>
                                    <SelectItem value="hoodies">Hoodies</SelectItem>
                                    <SelectItem value="sweatshirts">Sweatshirts</SelectItem>
                                </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className='flex flex-col gap-6'>
                <Card>
                    <CardHeader>
                    <CardTitle>Product Status</CardTitle>
                    <CardDescription>Update the product information</CardDescription>
                    </CardHeader>
                    <CardContent className='border-none shadow-none'>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Product Image</CardTitle>
                        <CardDescription>Update the product information</CardDescription>
                    </CardHeader>
                    <CardContent className='border-none shadow-none'>
                    <div className="grid gap-3">
                        <Label htmlFor="image">Image</Label>
                        <div className="grid gap-2">
                            <Image
                                alt="Product image"
                                className="aspect-square w-full rounded-md object-cover"
                                height="300"
                                src={productImage}
                                width="300"
                            />
                            <div className='flex justify-between'>
                                <Button variant="outline" className="p-2">
                                    <UploadIcon className="" />
                                    Upload
                                </Button>
                                <Button variant="outline" className="p-2">
                                    <TrashIcon className="" />
                                    Remove
                                </Button>
                            </div>
                        </div>
                    </div>
                    </CardContent>
                </Card>
            </div>  
        </div>
    </main>

  )
}

export default EditProduct