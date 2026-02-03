import Link from "next/link";
import {
  ShieldCheck,
  MapPin,
  Clock,
  BarChart3,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "GPS-Based Attendance",
    desc: "Mark attendance using live location with distance validation.",
    icon: MapPin,
  },
  {
    title: "Smart Accuracy Handling",
    desc: "Low GPS accuracy on laptops? We still validate using distance checks.",
    icon: Sparkles,
  },
  {
    title: "Secure Login Cookies",
    desc: "Sessions are protected with secure, HTTP-only cookies.",
    icon: ShieldCheck,
  },
  {
    title: "Admin Dashboard",
    desc: "View check-ins, time, and distance reports in one place.",
    icon: BarChart3,
  },
];

const steps = [
  {
    title: "Admin sets office location",
    desc: "Admin saves office GPS and allowed radius in meters.",
    icon: MapPin,
  },
  {
    title: "Staff marks attendance",
    desc: "Staff taps ‘Mark Attendance’ and we capture GPS + accuracy.",
    icon: Clock,
  },
  {
    title: "System verifies distance",
    desc: "We compute distance from office and accept/reject accordingly.",
    icon: ShieldCheck,
  },
];

 function HomePage() {
  return (
    <main className="bg-[#070a12] text-white overflow-hidden">
      {/* HERO */}
      <section className="relative">
        {/* Glow */}
        <div className="pointer-events-none absolute inset-0 flex justify-center">
          <div className="w-[650px] h-[650px] bg-cyan-500/10 blur-[140px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs text-cyan-200">
                <Sparkles size={14} />
                Location-verified attendance system
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                Smart Attendance <br />
                <span className="text-cyan-400">with GPS Verification</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-white/70 max-w-xl">
                ClickOnAdds helps teams mark attendance using real-time location,
                radius checks, and admin controls — simple, secure, and modern.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/staff/attendance"
                  className="inline-flex items-center justify-center gap-2 rounded-xl
                             bg-gradient-to-r from-cyan-400 to-blue-500
                             text-black font-semibold px-6 py-3
                             hover:opacity-90 transition
                             shadow-[0_0_18px_rgba(34,211,238,0.45)]"
                >
                  Mark Attendance <ArrowRight size={18} />
                </Link>

                <Link
                  href="/admin/office"
                  className="inline-flex items-center justify-center gap-2 rounded-xl
                             border border-white/15 bg-white/[0.03]
                             text-white/85 px-6 py-3
                             hover:bg-white/5 transition"
                >
                  Admin Setup
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 max-w-lg">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-white/60">Check</p>
                  <p className="mt-1 font-semibold">Distance Validation</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-white/60">Save</p>
                  <p className="mt-1 font-semibold">Office GPS + Radius</p>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="relative">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur p-6 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Today Overview</p>
                  <span className="text-xs text-white/60">Live preview</span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs text-white/60">Status</p>
                    <p className="mt-1 font-semibold text-cyan-300">
                      Ready to mark
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs text-white/60">Radius</p>
                    <p className="mt-1 font-semibold">150 m</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs text-white/60">Accuracy</p>
                    <p className="mt-1 font-semibold">Auto-detected</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs text-white/60">Security</p>
                    <p className="mt-1 font-semibold">Cookie session</p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                  <p className="text-sm text-cyan-100 font-medium">
                    Tip: For best accuracy, enable High Accuracy GPS.
                  </p>
                  <p className="mt-1 text-xs text-cyan-100/70">
                    Laptop GPS may be low accuracy — distance check will still apply.
                  </p>
                </div>
              </div>

              <div className="pointer-events-none absolute -bottom-14 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-500/10 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Built for real teams
          <span className="text-cyan-400">.</span>
        </h2>
        <p className="mt-2 text-white/60 max-w-2xl">
          Everything you need to mark attendance reliably and view reports with confidence.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/[0.03]
                         p-6 hover:border-cyan-400/30 transition
                         shadow-[0_0_24px_rgba(34,211,238,0.08)]"
            >
              <div className="w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300">
                <f.icon size={20} />
              </div>
              <h3 className="mt-4 font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold">
            How it works
            <span className="text-cyan-400">.</span>
          </h2>
          <p className="mt-2 text-white/60 max-w-2xl">
            Simple flow — admin sets the office, staff checks in, system verifies distance.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-300">
                    <s.icon size={20} />
                  </div>
                  <p className="font-semibold">{s.title}</p>
                </div>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 flex justify-center">
          <div className="w-[600px] h-[600px] bg-cyan-500/10 blur-[160px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold">
                Ready to mark attendance?
              </h3>
              <p className="mt-2 text-white/70 max-w-xl">
                Start with Admin Setup (office location + radius), then let staff check in.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                href="/admin/office"
                className="inline-flex items-center justify-center rounded-xl
                           border border-white/15 bg-white/[0.03]
                           px-6 py-3 text-white/90 hover:bg-white/5 transition"
              >
                Set Office
              </Link>
              <Link
                href="/staff/attendance"
                className="inline-flex items-center justify-center gap-2 rounded-xl
                           bg-gradient-to-r from-cyan-400 to-blue-500
                           px-6 py-3 text-black font-semibold
                           hover:opacity-90 transition"
              >
                Mark Attendance <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
