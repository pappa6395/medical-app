"use client";
 
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link";
import { ExternalLink } from "lucide-react";


import SortableColumn from "@/components/dataTableColumns/SortableColumn";
import DateColumn from "@/components/dataTableColumns/DateColumn";
import ActionColumn from "@/components/dataTableColumns/Actions";
import { IBlog } from "@/utils/types";
import ImageColumn from "@/components/dataTableColumns/ImageColumn";


export const columns: ColumnDef<IBlog>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "imageUrl",
    header: "Blog Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey={"imageUrl"} />,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },
  {
    accessorKey: "category",
    header: "Blog Category",
    cell: ({ row }) => {
      const blog = row.original;
      return (
        <h2 className="">{blog.category.title}</h2>
      )
    },
  },
  {
    accessorKey: "description",
    header: "View Blog",
    cell: ({ row }) => {
      const blog = row.original;
      return (
        <div className="">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-xs" variant="outline">
                View Blog
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Blog: {blog.title}</DialogTitle>
                <DialogDescription className="py-4">
                  {blog.summary}
                  <Link
                    target="_blank"
                    href={`/blogs/${blog.slug}`}
                    className="flex items-center gap-2 "
                    >
                    <ExternalLink className="text-blue-500"/>
                    <span className="font-semibold">View</span>to{" "} Blog Details
                  </Link>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const blog = row.original;
      return (
        <ActionColumn
          row={row}
          model="blog"
          editEndpoint={`blogs/update/${blog.id}`}
          id={blog.id}
        />
      );
    },
  },
];