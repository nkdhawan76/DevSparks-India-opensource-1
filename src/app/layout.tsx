import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevSparks DeployCheck — Developer Operations Platform",
  description: "Prepare, deploy, and maintain applications with confidence. An open-source developer operations platform by DevSparks India.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F7F9FC] text-[#172033] antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
