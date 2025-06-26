import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aren Coffee",
  description: "The best coffee in the whole world and akhirah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="py-6 px-4 flex justify-between items-center">
          <div>
            <Image src="/vercel.svg" alt="Logo" width={30} height={30} />
          </div>
          <Link href={"/create"} className="underline">
            Add New Product
          </Link>
        </header>
        {children}
        <footer className="py-6 px-4">Created with 💖</footer>
      </body>
    </html>
  );
}
