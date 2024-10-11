"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu as MenuIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/our-team", label: "Our Team" },
    { href: "/committees", label: "Committees" },
    { href: "/register", label: "Register" },
  ];

  return (
    <nav className="bg-black shadow pt-2 pb-2 border-b-[1px] border-[#303030]">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex w-full items-center">
            {/* Logo on the left */}
            <div className="flex-shrink-0 justify-center items-center h-full">
              <Link href="/" className="text-xl font-bold text-white">
                <Image
                  src="/logos/SOMUN Logo (Red, Transparent BG).png"
                  width={75}
                  height={75}
                  alt="Logo of SOMUN"
                />
              </Link>
            </div>

            {/* Links in the right */}
            <div className="hidden sm:flex sm:items-center flex-grow justify-end h-full items-center">
              {links.map((link, index) => (
                <div key={index} className="mx-4">
                  <Link
                    href={link.href}
                    className="inline-flex items-center px-1 pt-1 text-lg font-medium text-gray-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center sm:hidden ml-auto">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-white hover:bg-[#b70f1e] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#b70f1e]"
                  >
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full sm:max-w-sm bg-black p-0"
                >
                  <div className="flex items-center px-4 py-2 border-b border-[#303030]">
                    <Link href="/" className="text-xl font-bold text-white">
                      <Image
                        src="/logos/SOMUN Logo (Red, Transparent BG).png"
                        width={50}
                        height={50}
                        alt="Logo of SOMUN"
                      />
                    </Link>
                  </div>
                  <nav className="flex flex-col h-full">
                    <ul className="flex-1 px-4 py-2">
                      {links.map((link, index) => (
                        <li key={index}>
                          <Link
                            href={link.href}
                            className="block py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-[#b70f1e]"
                            onClick={() => setIsOpen(false)}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
