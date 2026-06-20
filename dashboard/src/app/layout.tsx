import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CausalFunnel Analytics",
  description: "User behavior analytics dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-zinc-500 antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}