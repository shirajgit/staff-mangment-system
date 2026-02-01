import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#03040a] text-white overflow-hidden">
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2
                   -translate-x-1/2 -translate-y-1/2
                   w-[400px] h-[400px] sm:w-[600px] sm:h-[600px]
                   bg-cyan-400/10 blur-[120px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid gap-14 md:grid-cols-3">
        {/* Brand */}
        <div>
            <Link href="/" className="justify-self-start">
          <img src="/logo.png" alt="VizioneXL" className="h-12 w-auto" />
        </Link>

          <p className="text-white/70 max-w-sm leading-relaxed">
            Smart attendance and digital solutions powered by location intelligence
            and modern web technology.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="p-3 rounded-full bg-white/5
                           text-white hover:text-cyan-400
                           hover:bg-cyan-400/20 transition
                           shadow-[0_0_12px_rgba(34,211,238,0.25)]
                           hover:shadow-[0_0_28px_rgba(34,211,238,0.6)]"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-5">Quick Links</h3>
          <ul className="space-y-3 text-white/70">
            {[
              { name: "Home", href: "/" },
              { name: "Attendance", href: "/staff/attendance" },
              { name: "Admin", href: "/admin/office" },
              { name: "Logout", href: "/login" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="hover:text-cyan-400 transition"
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="text-lg font-semibold mb-5">System Info</h3>
          <p className="text-white/70 mb-4 max-w-sm">
            Attendance is marked using GPS distance checks to ensure
            authenticity and accuracy.
          </p>

          <p className="text-sm text-white/50">
            Built with Next.js, MongoDB & secure cookies.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Copyright */}
      <p className="py-6 text-center text-sm text-white/50">
        © {new Date().getFullYear()} ClickOnAdds. All rights reserved.
      </p>
    </footer>
  );
}
