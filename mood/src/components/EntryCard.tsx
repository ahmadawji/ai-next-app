import { EntryAnalysis, JournalEntry, Prisma } from "@prisma/client"
import React from "react"

const entryWithAnalysis = Prisma.validator<Prisma.JournalEntryDefaultArgs>()({
  include: { analysis: true },
})

type EntryWithAnalysis = Prisma.JournalEntryGetPayload<typeof entryWithAnalysis>

const EntryCard = ({ entry }: { entry: EntryWithAnalysis }) => {
  const date = new Date(entry.createdAt).toDateString()
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">{date}</div>
      <div className="px-4 py-5 sm:p-6">{entry?.analysis!.summary}</div>
      <div className="px-4 py-4 sm:px-6">
        {entry?.analysis!.mood + " " + entry?.analysis!.emoji}
      </div>
    </div>
  )
}

export default EntryCard
