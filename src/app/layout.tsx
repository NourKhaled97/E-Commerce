import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";

const inter = Inter({ subsets: ["latin"] });

// change metadata of the website
export const metadata: Metadata = {
  title: "Flowmazon",
  description: "We make your wallet cry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {/* to allow each children (component) to be in main and have these styles */}
        <main className="p-4 max-w-7xl m-auto min-w-[300px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
