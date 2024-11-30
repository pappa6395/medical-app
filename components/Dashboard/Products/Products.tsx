
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
    Table, 
    TableHeader, 
    TableRow, 
    TableHead, 
    TableBody, 
    TableCell } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdownMenu"
import { DeleteIcon, FileIcon, ListFilterIcon, TrashIcon } from "lucide-react"
import doctorProfile1 from '@/public/doctorProfile1.jpeg'


export default function Products() {
  return (

    <div className="hidden space-y-6 p-6 pb-16 md:block">
        <Tabs defaultValue='all'>
            <div className='flex items-center'>
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="draft">Draft</TabsTrigger>
                    <TabsTrigger value="archieved">Archieved</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                        <ListFilterIcon className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>Fulfilled</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                    <FileIcon className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Export</span>
                  </Button>
                  <Button className="ml-auto" size="sm">
                    Add product
                </Button>
                </div>
            </div>
            <Separator className="my-6" />
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <div className="items-center">
                    <h1 className="font-semibold text-lg md:text-2xl">Products</h1>
                    <p className="text-muted-foreground">
                        Manage your account settings and set e-mail preferences.
                    </p>
                </div>
                <div className="border shadow-sm rounded-lg">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>{" "}</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Inventory</TableHead>
                        <TableHead />
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    <TableRow>
                        <TableCell className="">
                            <Image 
                                src={doctorProfile1}
                                alt="doctorprofile"
                                width={50}
                                height={50}
                                className="p-2 h-20 w-20 rounded-full object-cover"/>
                        </TableCell>
                        <TableCell className="font-medium">Glimmer Lamps</TableCell>
                        <TableCell>Elegant and stylish lamps for your home</TableCell>
                        <TableCell>$99.99</TableCell>
                        <TableCell>500 in stock</TableCell>
                        <TableCell>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon">
                            <DeleteIcon className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="outline" size="icon">
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                            </Button>
                        </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Aqua Filters</TableCell>
                        <TableCell>High-quality water filters for your home</TableCell>
                        <TableCell>$49.99</TableCell>
                        <TableCell>750 in stock</TableCell>
                        <TableCell>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon">
                            <DeleteIcon className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="outline" size="icon">
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                            </Button>
                        </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Eco Planters</TableCell>
                        <TableCell>Sustainable and eco-friendly planters</TableCell>
                        <TableCell>$29.99</TableCell>
                        <TableCell>300 in stock</TableCell>
                        <TableCell>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon">
                            <DeleteIcon className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="outline" size="icon">
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                            </Button>
                        </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Zest Juicers</TableCell>
                        <TableCell>High-performance juicers for your kitchen</TableCell>
                        <TableCell>$149.99</TableCell>
                        <TableCell>1000 in stock</TableCell>
                        <TableCell>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon">
                            <DeleteIcon className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="outline" size="icon">
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                            </Button>
                        </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Flexi Wearables</TableCell>
                        <TableCell>Comfortable and flexible wearable devices</TableCell>
                        <TableCell>$79.99</TableCell>
                        <TableCell>200 in stock</TableCell>
                        <TableCell>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon">
                            <DeleteIcon className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="outline" size="icon">
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                            </Button>
                        </div>
                        </TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </div>
            </main>
        </Tabs>
    </div>
   
      
  )
}
