import { JournalEntry } from "@prisma/client"
import { error } from "console"
import { NextResponse } from "next/server"

const createURL = (path: string) => {
  return window.location.origin + path
}

export const createNewEntry = async (): Promise<
  { data: JournalEntry } | undefined
> => {
  const res = await fetch(
    new Request(createURL("/api/journal"), { method: "POST" })
  )

  if (res.ok) {
    const data = await res.json()
    return data
  }
}
