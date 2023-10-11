import { Prisma } from "@prisma/client"
import React from "react"

const entryWithAnalysis = Prisma.validator<Prisma.JournalEntryDefaultArgs>()({
  include: { analysis: true },
})

type EntryWithAnalysis = Prisma.JournalEntryGetPayload<typeof entryWithAnalysis>

const EntryCard = ({ entry }: { entry: EntryWithAnalysis }) => {
  const date = new Date(entry.createdAt).toDateString()
  const time = new Date(entry.createdAt).toTimeString()
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">{date + " " + time}</div>
      <div className="px-4 py-5 sm:p-6">{entry?.analysis?.summary}</div>
      <div className="px-4 py-4 sm:px-6">
        {entry?.analysis?.mood + " " + entry?.analysis?.emoji}
      </div>
    </div>
  )
}

export default EntryCard
