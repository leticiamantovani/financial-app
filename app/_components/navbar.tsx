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

      {/* Mobile drawer menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-background shadow-lg border-l border-border z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Botão de fechar no topo */}
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMenuOpen(false)}>
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        <div className="flex flex-col gap-6 px-6">
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
      </div>
    </nav>
  );
};

export default Navbar;
