import Link from "next/link"

export default function Home() {
    return (
        <main className="min-h-screen px-6 py-16 md:py-24">
            <div className="mx-auto max-w-2xl">
                <h1 className="mb-8 text-4xl font-serif font-medium tracking-tight text-foreground">
                    Pranjal Mandavkar
                </h1>

                <div className="space-y-6 text-base leading-relaxed text-foreground/60">
                    <p>
                        tldr; i'm 22(age) dev who loves to build things that save some clicks or friction
                        <br />
                        &amp; yeahhh, i'm a full-stack dev
                    </p>
                    <p>
                        i write code for web and terminals and make Zero mrr apps
                    </p>
                    <p>
                        also a big fan of open source, OSS,&nbsp;
                        <Link href="https://www.youtube.com/@t3dotgg" className="underline hover:text-foreground/85 cursor-pointer">
                            theo
                        </Link>, and&nbsp;
                        <Link href="https://x.com" className="underline hover:text-foreground/85 cursor-pointer">
                            X(formerly twitter)
                        </Link> as platform
                    </p>
                    <p>
                        if want to know more about me,&nbsp;
                        <Link href="blog/things-i-believe" className="underline text-foreground/85 cursor-pointer">
                            here are something i believe in
                        </Link> and&nbsp;
                        <Link href="/blog/these-are-bullshits" className="underline text-foreground/85 cursor-pointer">
                            some that i don't
                        </Link>
                    </p>
                </div>
            </div>
        </main >
    )
}
