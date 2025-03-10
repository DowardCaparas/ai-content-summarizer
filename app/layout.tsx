import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ['latin'] });
 
export const metadata: Metadata = {
  title: "Doward Caparas",
  description: "I'm a Full stack web developer showcasing my works and interest",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased`}
      > 
          {children}
      </body>
    </html>
  );
}
