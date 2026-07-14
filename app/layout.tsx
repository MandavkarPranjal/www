import type React from "react"
import type { Metadata } from "next"
import PlausibleProvider from "next-plausible"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import "./globals.css"
import "@prose-ui/next/prose-ui.css"
import { ThemeSwitch } from "@/components/ui/theme-switch-button"
import { SearchHint } from "@/components/search-hint"
import { CommandMenu } from "@/components/command-menu"
import { getAllPosts } from "@/lib/blog"
import { projects } from "@/lib/projects"
import { miniApps } from "@/lib/mini-apps"

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
    const posts = getAllPosts()

    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <head>
                <PlausibleProvider domain="pr5.dev" />
            </head>
            <body className={`font-sans antialiased`}>
                <NuqsAdapter>
                    <CommandMenu posts={posts} projects={projects} miniApps={miniApps} />
                    <div className="fixed right-4 top-4 z-50 flex items-center gap-3">
                        <SearchHint />
                        <ThemeSwitch />
                    </div>
                    {children}
                </NuqsAdapter>
            </body>
        </html>
    )
}
