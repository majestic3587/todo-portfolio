import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const noto_sans_jp = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo Portfolio",
  description: "Todo Portfolio App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${noto_sans_jp.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
