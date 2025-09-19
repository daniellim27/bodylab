import type { Metadata } from "next";
import localFont from "next/font/local";
import { Shippori_Antique } from "next/font/google";
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

const shipporiAntique = Shippori_Antique({
  subsets: ["latin"],
  variable: "--font-shippori-antique",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Body Lab - Pilates Studio",
  description: "Transform your body, elevate your energy with our premium Pilates classes",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${shipporiAntique.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
