import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  DM_Sans,
} from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import Header from "@/components/ui/Header";

// Headings font
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Body/UI font
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Echo",
  description: "Your personal art curator",
  icons: {
    icon: "/general/echo_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`
            ${plusJakarta.variable} 
            ${dmSans.variable} 
            antialiased
          `}
        >
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}