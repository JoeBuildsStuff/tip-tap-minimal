import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simple Text Editor",
  description: "A simple text editor built with Tiptap, Shadcn/UI, Lucide Icons, Lowlight and Next.js",
  
  // Open Graph meta tags for social media sharing
  openGraph: {
    title: "Simple Text Editor",
    description: "A simple text editor built with Tiptap, Shadcn/UI, Lucide Icons, Lowlight and Next.js",
    url: "https://tip-tap-minimal.vercel.app/",
    siteName: "Simple Text Editor",
    images: [
      {
        url: "/og-image.png", // This should be a 1200x630px image in your public folder
        width: 939,
        height: 630,
        alt: "Simple Text Editor - Rich text editing made easy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  
  // Twitter Card meta tags
  twitter: {
    card: "summary_large_image",
    title: "Simple Text Editor",
    description: "A simple text editor built with Tiptap, Shadcn/UI, Lucide Icons, Lowlight and Next.js",
    images: ["/og-image.png"], // Same image as Open Graph
    creator: "@JoeTaylor_86753", // Replace with your Twitter handle (optional)
  },
  
  // Additional meta tags
  robots: {
    index: true,
    follow: true,
  },
  
  // Favicon and other icons
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
