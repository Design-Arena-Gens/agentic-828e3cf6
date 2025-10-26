import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "AP MSME ONE | AI-Powered DPR Blueprint for Financial Inclusion & Growth",
  description:
    "Strategic AI solution architecture for Andhra Pradesh MSMEs featuring multilingual onboarding, financial intelligence, policy-aligned analytics, and investor-grade DPR automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
