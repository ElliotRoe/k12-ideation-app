import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProcessTimeline } from "@/components/process-timeline";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DreamX",
  description: "A platform to help you create anything you can imagine.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col items-center p-10 h-screen min-w-screen">
          <ProcessTimeline />
          <main className="h-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
