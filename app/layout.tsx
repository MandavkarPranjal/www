import type React from "react"
import type { Metadata } from "next"
import PlausibleProvider from "next-plausible"

import "./globals.css"
import "@prose-ui/next/prose-ui.css"
import { ThemeSwitch } from "@/components/ui/theme-switch-button"

export const metadata: Metadata = {
    title: "Pranjal Mandavkar",
    description:
        "Developer living in Mumbai. Building things with React and solving some problems inside neovim with the help of terminal.",
    metadataBase: new URL("https://pr5.dev"),
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
    },
    openGraph: {
        title: "Pranjal Mandavkar",
        description: "Developer living in Mumbai (mostly inside terminal).",
        url: "https://pr5.dev",
        siteName: "Pranjal Mandavkar",
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: "Pranjal Mandavkar",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Pranjal Mandavkar",
        description: "Developer living in Mumbai (mostly inside terminal).",
        images: ["/opengraph-image"],
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="dark">
            <head>
                <PlausibleProvider domain="pr5.dev" />
            </head>
            <body className={`font-sans antialiased`}>
                <div className="fixed right-4 top-4 z-50">
                    <ThemeSwitch />
                </div>
                {children}
            </body>
        </html>
    )
}
