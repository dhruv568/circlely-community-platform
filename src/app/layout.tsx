import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { InteractiveBackground } from "@/components/ui/InteractiveBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Circlely — Find Your People. Build Your Circle.",
  description: "Discover welcoming communities, meet people who share your interests, and take part in meaningful activities — all in one safe space.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col relative">
        <InteractiveBackground />
        <div className="relative z-10 flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
