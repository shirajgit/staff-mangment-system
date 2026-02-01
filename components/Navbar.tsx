"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Home", href: "/" },
  { name: "Attendance", href: "/staff/attendance" },
  { name: "Admin Office", href: "/admin/office" },
  { name: "Admin Attendance", href: "/admin/attendance" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href.startsWith("/admin")) return pathname.startsWith("/admin");
    if (href.startsWith("/staff")) return pathname.startsWith("/staff");
    return pathname === href;
  };

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070a12]/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
       <Link href="/" className="justify-self-start">
          <img src="/logo.png" alt="VizioneXL" className="h-12 w-auto" />
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex gap-6 text-sm items-center">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`transition ${
                isActive(l.href)
                  ? "text-cyan-400"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {l.name}
            </Link>
          ))}
        </nav>

        {/* Hamburger Button (Mobile) */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-xl
                     border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-16 right-0 left-0 z-50 border-t border-white/10 bg-[#070a12]/95 backdrop-blur">
            <div className="max-w-7xl mx-auto px-6 py-5">
              <div className="flex flex-col gap-2">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`rounded-xl px-4 py-3 transition border ${
                      isActive(l.href)
                        ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                        : "border-white/10 bg-white/[0.03] text-white/80 hover:bg-white/[0.06]"
                    }`}
                  >
                    {l.name}
                  </Link>
                ))}
              </div>

              <div className="mt-4 text-xs text-white/50">
                Tip: Admin pages are accessible only to admins.
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
