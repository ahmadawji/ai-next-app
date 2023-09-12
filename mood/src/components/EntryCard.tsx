import { JournalEntry } from "@prisma/client"
import React from "react"

const EntryCard = ({ entry }: { entry: JournalEntry }) => {
  return <div>{entry.id}</div>
}

export default EntryCard
