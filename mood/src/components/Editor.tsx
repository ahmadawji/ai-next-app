"use client"
import { JournalEntry } from "@prisma/client"
import React, { useState } from "react"
import { updateEntry } from "../../utils/api"

const Editor = ({ entry }: { entry: JournalEntry | null }) => {
  const [value, setValue] = useState(entry?.content)
  return (
    <div className="w-full h-full">
      <textarea
        value={value}
        className="w-full h-full p-8 text-xl outline-none"
        onChange={(e) => {
          updateEntry(entry?.id as string, e.target.value).then(({ data }) => {
            setValue(data.content)
          })
        }}
      />
    </div>
  )
}

export default Editor
