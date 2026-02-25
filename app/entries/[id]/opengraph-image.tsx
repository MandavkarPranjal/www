import { GenerateImage, contentType as ogContentType, size as ogSize } from "@/lib/og"

export const runtime = "edge"
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return GenerateImage({
    title: "Entry - pr5.dev",
    description: "Permalink for an entry.",
  })
}
