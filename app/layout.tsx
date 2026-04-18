import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Nav from "@/app/components/Nav";

const figtree = Figtree ({
    subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Armin Eslamieh",
  description: "Personal website — thoughts, projects, and developer process blogs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.className} antialiased`}
    >
      <body className="min-h-full flex flex-col">
      <Nav />
      {children}
      </body>
    </html>
  );
}
