import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import ModalProviders from "@/providers/modal-providers";
import { ToasterProvider } from "@/providers/toats-provider";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ModalProviders />
            <ToasterProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
