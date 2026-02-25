import { GenerateImage, contentType as ogContentType, size as ogSize } from "@/lib/og"

export const runtime = "edge"
export const size = ogSize
export const contentType = ogContentType

export default async function Image({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: rawTag } = await params
  const tag = decodeURIComponent(rawTag)

  return GenerateImage({
    title: `#${tag} - pr5.dev`,
    description: `Entries tagged with #${tag}.`,
  })
}
