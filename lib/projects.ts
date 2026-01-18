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
        title: "OpenCode Notifier",
        description:
            "Opencode Plugin that sends system notification when permission is needed, generation is complete, error occurs or question tool is invoked",
        href: "https://www.npmjs.com/package/@pranjalmandavkar/opencode-notifier",
        owner: "mandavkarpranjal",
        repo: "opencode-notifier",
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
