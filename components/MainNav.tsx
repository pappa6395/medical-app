"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { HospitalIcon } from "lucide-react"
import { docsConfig } from "@/config/docs"
import Image from "next/image"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <Image 
          src="/Medical-Care Logo2.png" 
          alt="logo" 
          width={100} 
          height={100}
          className="size-12"
        />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        {
          docsConfig.mainNav.map((item,i) => {
            return (
              <Link
                key={i}
                href={`${item.href}`}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href ? "text-foreground" : "text-foreground/80"
                )}
              >
                {item.title}
              </Link>
            )
          })
        }
      </nav>
    </div>
  )
}