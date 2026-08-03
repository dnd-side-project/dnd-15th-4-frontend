import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { Providers } from "./providers";
import "./globals.css";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

export const metadata: Metadata = {
  title: "퍼즐밋",
  description: "모임을 퍼즐로 완성하는 약속 관리 서비스",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="ko" className={pretendard.variable} suppressHydrationWarning>
      <body
        className="flex min-h-screen justify-center bg-gray-100"
        suppressHydrationWarning
      >
        <Providers>
          <div className="flex min-h-screen w-full max-w-md flex-col bg-white">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
