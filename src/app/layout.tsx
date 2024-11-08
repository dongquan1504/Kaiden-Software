import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Menu from "@/components/common/menu";

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

export const metadata: Metadata = {
  title: "Kaiden Software",
  description: "Supplying cutting-edge software services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-full h-screen flex flex-col justify-between">
          <div>
            <Header />
            <SidebarProvider>
              <Menu />
              <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start p-8 overflow-auto !h-400px">
                <SidebarTrigger />
                {children}
              </main>
            </SidebarProvider>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
