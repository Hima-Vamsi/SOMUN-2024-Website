import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

import { NavbarComponent } from "@/components/navbar";
import { FooterComponent } from "@/components/footer";

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
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className="flex flex-col min-h-screen antialiased">
          <NavbarComponent />
          <main className="flex-grow w-full">{children}</main>
          <FooterComponent />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
