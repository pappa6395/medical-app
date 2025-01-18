
import ToastProvider from "@/components/ToastProvider";
import "./globals.css";
import { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider } from "@/components/themeProvider";
import { siteConfig } from "@/config/site";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { OnboardingContextProvider } from "@/context/context";


const reStyle = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Medical-app",
  ],
  authors: [
    {
      name: "Nontachai Pahsukkul",
      url: "https://my-portfolio-ty6p.vercel.app/",
    },
  ],
  creator: "PAP Web Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@Nontachai",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/Medical-careLogo.png",
    apple: "/Medical-careLogo.png",

  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

      <html lang="en" suppressHydrationWarning>  
        <body className={reStyle.className}>
        <NextSSRPlugin
        /**
         * The `extractRouterConfig` will extract **only** the route configs
         * from the router to prevent additional information from being
         * leaked to the client. The data passed to the client is the same
         * as if you were to fetch `/api/uploadthing` directly.
         */
        routerConfig={extractRouterConfig(ourFileRouter)}
        />  
          <ToastProvider>
              <OnboardingContextProvider>
                <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                      >
                          {children} 
                  </ThemeProvider>
              </OnboardingContextProvider>
            </ToastProvider>
        </body>
      </html>
    
  );   
}
