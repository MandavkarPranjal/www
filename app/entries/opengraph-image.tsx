import { GenerateImage, contentType as ogContentType, size as ogSize } from "@/lib/og"

export const runtime = "edge"
export const alt = "Entries - pr5.dev"
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return GenerateImage({
    title: "Entries - pr5.dev",
    description: "Short notes",
  })
}
