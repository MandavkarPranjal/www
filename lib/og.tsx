import { ImageResponse } from "next/og"

// Open Graph image size
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = "image/png"

let instrumentSerifRegular: ArrayBuffer | null = null
let instrumentSerifItalic: ArrayBuffer | null = null
let instrumentSerifPromise: Promise<{ regular?: ArrayBuffer; italic?: ArrayBuffer }> | null = null

const MAX_TITLE_CHARS = 90
const MAX_DESCRIPTION_CHARS = 180

function normalizeText(value: string): string {
    return value.replace(/\s+/g, " ").trim()
}

function truncateText(value: string, maxLength: number): string {
    if (value.length <= maxLength) {
        return value
    }

    return `${value.slice(0, maxLength - 1).trimEnd()}…`
}

function getTitleFontSize(titleLength: number): number {
    if (titleLength <= 24) return 120
    if (titleLength <= 40) return 104
    if (titleLength <= 60) return 90
    if (titleLength <= 80) return 78
    return 68
}

// Load Instrument Serif TTFs (Satori prefers TTF/OTF)
async function loadInstrumentSerif(): Promise<{ regular?: ArrayBuffer; italic?: ArrayBuffer }> {
    if (instrumentSerifRegular && instrumentSerifItalic) {
        return { regular: instrumentSerifRegular, italic: instrumentSerifItalic }
    }

    if (instrumentSerifPromise) {
        return instrumentSerifPromise
    }

    instrumentSerifPromise = (async () => {
        const regularUrl =
            "https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentserif/InstrumentSerif-Regular.ttf"
        const italicUrl =
            "https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentserif/InstrumentSerif-Italic.ttf"

        const [regularRes, italicRes] = await Promise.all([
            fetch(regularUrl, { cache: "force-cache" }).catch(() => undefined),
            fetch(italicUrl, { cache: "force-cache" }).catch(() => undefined),
        ])

        if (regularRes && regularRes.ok) {
            instrumentSerifRegular = await regularRes.arrayBuffer()
        }
        if (italicRes && italicRes.ok) {
            instrumentSerifItalic = await italicRes.arrayBuffer()
        }

        return { regular: instrumentSerifRegular || undefined, italic: instrumentSerifItalic || undefined }
    })()

    return instrumentSerifPromise
}

export async function GenerateImage(params: {
    title: string
    description?: string
}) {
    const { regular, italic } = await loadInstrumentSerif()
    const title = truncateText(normalizeText(params.title || ""), MAX_TITLE_CHARS) || "Untitled"
    const description = params.description
        ? truncateText(normalizeText(params.description), MAX_DESCRIPTION_CHARS)
        : ""
    const titleFontSize = getTitleFontSize(title.length)

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0a0a0a",
                    color: "#ffffff",
                    fontFamily: 'Instrument Serif, serif',
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                        gap: 12,
                        padding: 64,
                        maxWidth: 1000,
                    }}
                >
                    <span
                        style={{
                            fontSize: titleFontSize,
                            lineHeight: 1.1,
                        }}
                    >
                        {title}
                    </span>
                    {description ? (
                        <span
                            style={{
                                fontSize: 40,
                                opacity: 0.9,
                                fontStyle: "italic",
                            }}
                        >
                            {description}
                        </span>
                    ) : null}
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                ...(regular
                    ? [
                          {
                              name: "Instrument Serif",
                              data: regular,
                              style: "normal" as const,
                              weight: 400 as const,
                          },
                      ]
                    : []),
                ...(italic
                    ? [
                          {
                              name: "Instrument Serif",
                              data: italic,
                              style: "italic" as const,
                              weight: 400 as const,
                          },
                      ]
                    : []),
            ],
        },
    )
}
