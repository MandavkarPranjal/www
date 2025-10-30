import { BackButton } from "@/components/ui/back-button";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <BackButton />
            {children}
        </div>
    )
}
