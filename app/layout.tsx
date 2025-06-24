import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// TODO: Please update the title and description with your personal information
export const metadata: Metadata = {
  title: "Momo Hanawa",
  description: "The personal portfolio of Momo Hanawa (塙 桃)",
  verification: {
    google: "8MREzyl-aZZ3zp3rdrNpvwaR2j6NgLOooa38AgJhcP4"
  },
  openGraph: {
    title: "Momo Hanawa",
    description: "The personal portfolio of Momo Hanawa (塙 桃)",
    url: "https://momohanawa.vercel.app",
    siteName: "Momo Hanawa",
    locale: "en_US",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (  
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined') {
              window.history.scrollRestoration = 'manual';
              window.scrollTo(0, 0);
            }
          `
        }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}>
        {children}
      </body>
    </html>
  );
}
