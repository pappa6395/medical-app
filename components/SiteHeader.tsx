import Link from "next/link"

import { siteConfig } from "@/config/site"
import { CommandMenu } from "@/components/CommandMenu"
import { Icons } from "@/components/ui/icons"
import { MainNav } from "@/components/MainNav"
import { MobileNav } from "@/components/MobileNav"
import { ModeSwitcher } from "@/components/ModeSwitcher"
import { Button } from "@/components/ui/button"
import { LogIn, MailOpen } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="flex h-14 items-center px-4">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center gap-4">
            {/* <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button> */}
            <Button asChild className="bg-slate-500">
                <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />Login
                </Link>
            </Button>
            <ModeSwitcher />
          </nav>
        </div>
      </div>
    </header>
  )
}

