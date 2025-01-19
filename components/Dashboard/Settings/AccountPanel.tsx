import React from "react";
import { columns } from "@/app/(back)/dashboard/settings/accounts/Columns";

import DataTable from "@/components/dataTableComponents/DataTable";
import TableHeader from "@/components/dataTableComponents/TableHeader";
import { getBlogs } from "@/actions/blogs";
import { IBlog } from "@/utils/types";
import { getUsers } from "@/actions/users";
import { User } from "@prisma/client";

 
export default async function AccountPanel() {

  const users: User[] = (await getUsers()) || [];

  return (
    <div className="p-2">
      <TableHeader
        disabled
        title="Accounts"
        linkTitle="Add account"
        href="/dashboard/settings/new"
        data={users}
        model="user"
      />
      <div className="py-2">
        <DataTable data={users} columns={columns} />
      </div>
    </div>
  );
}