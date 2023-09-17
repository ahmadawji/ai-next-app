"use client"
import { JournalEntry } from "@prisma/client"
import React, { useEffect, useState } from "react"
import { updateEntry } from "../../utils/api"
import { useAutosave } from "react-autosave"

const Editor = ({ entry }: { entry: JournalEntry | null }) => {
  const [value, setValue] = useState(entry?.content)
  const [isLoading, setIsLoading] = useState(false)
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      await updateEntry(entry?.id as string, _value as string)
      setIsLoading(false)
    },
  })

  return (
    <div className="w-full h-full">
      <div className="relative flex h-3 w-3 m-2 float-right">
        {isLoading && (
          <>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
          </>
        )}
      </div>

      <textarea
        value={value}
        className="w-full h-3/6 p-8 text-xl outline-none"
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
    </div>
  )
}

export default Editor
