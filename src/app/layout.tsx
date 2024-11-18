"use client";

import localFont from "next/font/local";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Menu from "@/components/common/menu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PAGE_URL } from "@/constant/url";
import { useAppSelector } from '@/lib/hooks';
import "./globals.css";

import StoreProvider from "./StoreProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const renderContent = (children: React.ReactNode) => {
  const pathname = usePathname();
  const isNotLayout = [PAGE_URL.LOGIN, PAGE_URL.REGISTER].includes(pathname);

  // const user = useAppSelector((state) => state.user)
  // console.log(user)

  // useEffect(() => {
  //   if (!!user) return;

  //   router.push(PAGE_URL.LOGIN);
  // }, [user])

  return isNotLayout ? children : <div className="w-full h-screen flex flex-col justify-between">
    <div>
      <Header />
      <SidebarProvider>
        <Menu />
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start p-8 overflow-auto pt-20 !h-400px">
          <SidebarTrigger
          //  className="fixed mt-20 mlm"
          />
          {children}
        </main>
      </SidebarProvider>
    </div>
    <Footer />
  </div>
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <head>
          <title>Kaiden Software</title>
          <meta name="description" content="Supplying cutting-edge software services." />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {renderContent(children)}
        </body>
      </html>
    </StoreProvider>
  );
}
