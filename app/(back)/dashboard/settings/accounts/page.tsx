import React from "react";
import { columns } from "./Columns";

import DataTable from "@/components/dataTableComponents/DataTable";
import TableHeader from "@/components/dataTableComponents/TableHeader";
import { getBlogs } from "@/actions/blogs";
import { IBlog } from "@/utils/types";
import { getUsers } from "@/actions/users";
import { User } from "@prisma/client";

 
export default async function page() {

  const users: User[] = (await getUsers()) || [];

  return (
    <div className="p-8">
      <TableHeader
        title="Users"
        linkTitle="Add Blog"
        href="/dashboard/settings/new"
        data={users}
        model="user"
      />
      <div className="py-8">
        <DataTable data={users} columns={columns} />
      </div>
    </div>
  );
}