import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: {
    default: "Codest - Premium Digital Solutions",
    template: "%s | Codest",
  },
  description:
    "Codest delivers cutting-edge web applications, stunning 3D experiences, and robust backend solutions. Transform your digital presence with our expert team.",
  keywords: [
    "web development",
    "Next.js",
    "React",
    "Node.js",
    "3D web design",
    "full-stack development",
    "Codest",
  ],
  authors: [{ name: "Codest Team" }],
  creator: "Codest",
  publisher: "Codest",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Codest",
    title: "Codest - Premium Digital Solutions",
    description:
      "Codest delivers cutting-edge web applications, stunning 3D experiences, and robust backend solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codest - Premium Digital Solutions",
    description:
      "Codest delivers cutting-edge web applications, stunning 3D experiences, and robust backend solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
   icons: {
     icon: [
       {
         url: "/logo.svg",
         type: "image/svg+xml",
       },
     ],
     apple: "/logo.svg",
   },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
