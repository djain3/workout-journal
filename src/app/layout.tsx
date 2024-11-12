
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientLocalizationProvider from "./localization";
import ThemeStyles from "./themeprovider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Workout Journal",
  description: "App for tracking your workout progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientLocalizationProvider>
      <ThemeStyles>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
          </body>
        </html>
      </ThemeStyles>
    </ClientLocalizationProvider>
  );
}
