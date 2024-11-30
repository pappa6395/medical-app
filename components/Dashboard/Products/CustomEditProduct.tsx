/**
 * v0 by Vercel.
 * @see https://v0.dev/t/N7CbSrZ7cjT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ImageUpload from "next/image"

export default function Component() {

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="sm:hidden">
                        <div className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Edit Product
                    </h1>
                </div>
                <div className="flex items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm">
                    Discard
                </Button>
                <Button size="sm">Save Product</Button>
                </div>
             </header>
             <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                    <Card>
                        <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                        <CardDescription>Update the product information</CardDescription>
                        </CardHeader>
                        <CardContent>
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
                            <div>
                            <Label htmlFor="image">Product Image</Label>
                            <div />
                            </div>
                        </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <div className="grid gap-3">
                <Label htmlFor="image">Image</Label>
                <div className="grid gap-2">
                    <img
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src="/placeholder.svg"
                        width="300"
                    />
                    <Button variant="outline" className="w-full">
                        <UploadIcon className="h-4 w-4 mr-2" />
                        Upload Image
                    </Button>
                    <Button variant="outline" size="sm" className="ml-auto">
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Remove Image
                    </Button>
                </div>
            </div>
        </div>
    )
}

  
    
  
