"use client"

import Link from "next/link"
import { MainNav } from "@/components/MainNav"
import { MobileNav } from "@/components/MobileNav"
import { ModeSwitcher } from "@/components/ModeSwitcher"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu";
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { Session } from "next-auth"
import { generateInitial } from "@/utils/generateInitial"
import SearchBar from "./Frontend/SearchBar"


export function SiteHeader({session}: {session: Session | null}) {

  const user = session?.user || {name: "Guest", email: "", image: null};
  const router = useRouter();
  //console.log("User's data:", user);
  
  async function handleLogout() {
      await signOut()
      router.push("/login");
  }

  const initial = generateInitial(user.name?? "");

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <div className="flex h-14 items-center px-4">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center gap-4">
            <div className="w-full">
              <SearchBar />
            </div>
            {session && user ? (
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="rounded-full">
                          <Avatar>
                            {user.image ? (
                              <AvatarImage 
                              src={user.image}
                              alt={user.name || "User Avatar"}
                              onError={(e) => (e.currentTarget.src = "https://github.com/shadcn.png")}/>
                            ) : (
                              <AvatarFallback>{initial}</AvatarFallback>
                            )}
                          </Avatar>
                          <span className="sr-only">Toggle user menu</span>
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                      <DropdownMenuLabel className="text-center">{user.name}</DropdownMenuLabel>
                      <DropdownMenuLabel 
                        className="text-center text-muted-foreground"
                      >{user.email}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href={"/dashboard"}>Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Support</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>) : (
                <Button asChild className="bg-slate-500">
                  <Link href="/login">
                      <LogIn className="mr-2 h-4 w-4" />Login
                  </Link>
                </Button>
              )}
            <ModeSwitcher />
          </nav>
        </div>
      </div>
    </header>
  )
}

