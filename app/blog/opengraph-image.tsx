import { GenerateImage, size as ogSize, contentType as ogContentType } from "@/lib/og";

export const runtime = "edge"
export const alt = "Pranjal Mandavkar"
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
    return GenerateImage({
        title: "Blog - pr5.dev",
        description: "Writing some sh*t even though I'm not a writer.",
    })
}
