import React from "react";
import { columns } from "./Columns";

import DataTable from "@/components/dataTableComponents/DataTable";
import TableHeader from "@/components/dataTableComponents/TableHeader";
import { getBlogs } from "@/actions/blogs";
import { IBlog } from "@/utils/types";

 
export default async function page() {

  const blogs: IBlog[] = (await getBlogs()) || [];

  return (
    <div className="p-8">
      <TableHeader
        title="Blogs"
        linkTitle="Add Blog"
        href="/dashboard/blogs/new"
        data={blogs}
        model="blog"
      />
      <div className="py-8">
        <DataTable data={blogs} columns={columns} />
      </div>
    </div>
  );
}