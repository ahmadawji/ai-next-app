import { JournalEntry } from "@prisma/client"
import React from "react"

const Editor = ({ entry }: { entry: JournalEntry | null }) => {
  return <div>{entry?.content}</div>
}

export default Editor
