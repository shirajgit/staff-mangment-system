import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "ClickOnAdds",
  description: "Smart Attendance & Digital Solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#070a12] text-white antialiased">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="min-h-[calc(100vh-160px)]">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
