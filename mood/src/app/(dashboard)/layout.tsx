import { UserButton } from "@clerk/nextjs"
import { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen flex flex-row">
      <aside className="basis-1/6 border-r border-black/10 p-2">Mood</aside>
      <div className="basis-full">
        <header className="h-[60px] border-b border-black/10 p-2">
          <div className="h-full w-full flex items-center justify-end px-6 ">
            <UserButton />
          </div>
        </header>
        <div className="p-2">{children}</div>
      </div>
    </div>
  )
}
