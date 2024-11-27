
//import Providers from "@/components/Providers";
import "./globals.css";
import { Metadata } from "next";
import { Outfit } from "next/font/google"

const reStyle = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated bt create next app"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={reStyle.className}> 
            {children}
      </body>
    </html>
  );
}
