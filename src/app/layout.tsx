import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevSparks DeployCheck — Developer Operations Platform",
  description: "Prepare, deploy, and maintain applications with confidence. An open-source developer operations platform by DevSparks India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="bg-[#F7F9FC] text-[#172033] antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
