import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import Logo from "@/components/assets/logo";
import { auth } from "@/auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutButton } from "@/components/logout-button";

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
  title: "SPX - Own Flex",
  description: "Motorista Parceiro Shopee",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="header my-4 row-span-1">
          <Logo />

          {session?.user ? (
            <div className="flex justify-end">
              <Popover open>
                <PopoverTrigger></PopoverTrigger>
                <PopoverContent asChild sideOffset={24} className="p-0 ">
                  <div id="logout" className="w-fit mr-4 p-0">
                    <LogoutButton customClass={"p-0"} />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : null}
        </header>
        <SessionProvider>
          <Toaster />
          {children}
        </SessionProvider>

        <div className="h-24" />
      </body>
    </html>
  );
}
