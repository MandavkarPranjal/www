import { BackButton } from "@/components/ui/back-button";

export default function MiniAppsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <BackButton />
      {children}
    </div>
  )
}
