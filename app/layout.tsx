import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/components/providers/ReduxProvider";
import SiteLayout from "@/components/layout/Site-layout";
export const metadata: Metadata = {
  title: "Cooking Healthy Food",
  description: "Premium Food E-commerce Platform",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white antialiased">
        <ReduxProvider>
          <SiteLayout>{children}</SiteLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
