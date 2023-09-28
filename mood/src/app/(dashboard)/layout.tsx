import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { ReactNode } from "react"

const links = [
  { href: "/", label: "home" },
  { href: "/journal", label: "Journals" },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-full flex flex-row">
      <aside className="basis-1/6 border-r border-black/10 p-2">
        <div>Mood</div>
        <ul>
          {links.map((link) => (
            <li key={link.href} className="px-2 py-2 text-xl">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="basis-full h-full">
        <header className="h-[60px] border-b border-black/10 p-2">
          <div className="h-full w-full flex items-center justify-end px-6 ">
            <UserButton />
          </div>
        </header>
        {/* 60px is the height of the header */}
        <div className="min-h-[calc(100vh-60px)] h-fit">{children}</div>
      </div>
    </div>
  )
}
