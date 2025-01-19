import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
 
export default function CloseBtn({
href,
parent = "",
variant = "outline",
}: {
href: string,
variant?: "default" | "booking" | "review" | "payment" | "destructive" | "outline" | "secondary" | "ghost" | "link"
parent?: string,
}) {
return (
  <Button type="button" variant={variant} asChild>
    <Link
      href={
        parent === "" ? `/dashboard${href}` : `/dashboard/${parent}${href}`
      }
    >
      Close
    </Link>
  </Button>
);
}
 