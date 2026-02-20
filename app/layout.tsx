import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ExoClick - Administration Panel",
  description: "ExoClick Administration Panel",
  icons: {
    icon: "/exoclick-icon.png",
    apple: "/icons/icon-192.png",
  },
  manifest: "/manifest.json",
  themeColor: "#ffffff",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ExoClick",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "ExoClick - Administration Panel",
    description: "ExoClick Administration Panel",
    type: "website",
    siteName: "ExoClick",
    // No images - text-only preview
  },
  twitter: {
    card: "summary", // text-only card, no large image
    title: "ExoClick - Administration Panel",
    description: "ExoClick Administration Panel",
    // No images - text-only preview
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('ServiceWorker registration successful');
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
