import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

import { NavbarComponent } from "@/components/navbar";

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
  title: "SOMUN 2024",
  description: "Created by Hima Vamsi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <NavbarComponent />
          <div
            className={`${geistSans.variable} ${geistMono.variable} antialiased flex items-start min-h-screen pt-8`}
          >
            {children}
            <Toaster />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
