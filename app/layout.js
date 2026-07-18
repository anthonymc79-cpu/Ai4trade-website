import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CircuitTrace from "@/components/CircuitTrace";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-var",
  display: "swap",
});

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-var",
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-var",
  display: "swap",
});

export const metadata = {
  title: "Ai4Trade — job management for electrical businesses",
  description:
    "Quoting, EICR certification, floorplans, and job management for electrical businesses — with a free booking portal for their customers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      >
        <CircuitTrace />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
