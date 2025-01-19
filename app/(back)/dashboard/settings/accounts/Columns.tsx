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
import { User } from "@prisma/client";


export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableColumn column={column} title="Email" />,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => <SortableColumn column={column} title="Phone No." />,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <SortableColumn column={column} title="Role" />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <ActionColumn
          row={row}
          model="user"
          editEndpoint={`settings/accounts/update/${user.id}`}
          id={user.id}
        />
      );
    },
  },
];