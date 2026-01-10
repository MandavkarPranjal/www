export interface Project {
    title: string
    description: string
    href: string
    owner: string
    repo: string
}

export const projects: Project[] = [
    {
        title: "WhataDuck",
        description: "A Simple & Lightning Fast Search Engine with bangs",
        href: "https://whataduck.pr5.dev",
        owner: "mandavkarpranjal",
        repo: "whataduck",
    },
    {
        title: "Opengraph-CLI",
        description:
            "Get Opengraph metadata & image for your websites (even local dev server), right inside of terminal",
        href: "https://www.npmjs.com/package/opengraph-cli",
        owner: "mandavkarpranjal",
        repo: "opengraph-cli",
    },
]
