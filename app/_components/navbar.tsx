"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = (path: string) =>
    pathName === path ? "font-bold text-primary" : "text-muted-foreground";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="border-b border-border px-6 py-4 bg-background">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Esquerda: Logo + links (desktop) */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="./logo.svg" width={173} height={39} alt="Finance AI" />
          </Link>

          <div className="hidden md:flex gap-6 ml-6">
            <Link href="/" className={navLinkClass("/")}>
              Dashboard
            </Link>
            <Link
              href="/transactions"
              className={navLinkClass("/transactions")}
            >
              Transações
            </Link>
            <Link
              href="/subscription"
              className={navLinkClass("/subscription")}
            >
              Assinatura
            </Link>
          </div>
        </div>

        {/* Direita: User info + hamburguer */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <UserButton showName />
          </div>

          {/* Botão hamburguer (mobile) */}
          <button
            className="md:hidden p-2 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="flex flex-col gap-4 mt-4 px-6 md:hidden">
          <Link href="/" className={navLinkClass("/")} onClick={toggleMenu}>
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className={navLinkClass("/transactions")}
            onClick={toggleMenu}
          >
            Transações
          </Link>
          <Link
            href="/subscription"
            className={navLinkClass("/subscription")}
            onClick={toggleMenu}
          >
            Assinatura
          </Link>
          <UserButton showName />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
