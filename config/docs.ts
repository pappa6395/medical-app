import { MainNavItem } from "@/utils/types"

export interface DocsConfig {
  mainNav: MainNavItem[]
  
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Find Doctors",
      href: "/findDoctors",
    },
    {
      title: "Telehealth Visit",
      href: "/category?mode=Telehealth",
    },
    {
      title: "In-Person Visit",
      href: "/category?mode=In-person%20doctor%20visit",
    },
    {
      title: "Be Service Provider",
      href: "/join/doctors",
    },
  ]
}