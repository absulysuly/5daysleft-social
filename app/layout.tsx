import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import TopNavBar from "@/components/TopNavBar";

export const metadata: Metadata = {
  title: "5DaysLeft Social",
  description: "Community updates and countdown insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-100 antialiased">
        <TopNavBar />
        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 pb-24 pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
