"use client"
import { EntryAnalysis, JournalEntry, Prisma } from "@prisma/client"
import React, { useState } from "react"
import { updateEntry } from "../../utils/api"
import { useAutosave } from "react-autosave"
import Analysis from "./Analysis"

const entryWithAnalysis = Prisma.validator<Prisma.JournalEntryDefaultArgs>()({
  include: { analysis: true },
})

type EntryWithAnalysis = Prisma.JournalEntryGetPayload<typeof entryWithAnalysis>

const Editor = ({ entry }: { entry: EntryWithAnalysis }) => {
  const [value, setValue] = useState(entry?.content)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState<EntryAnalysis>(
    entry?.analysis as EntryAnalysis
  )

  useAutosave({
    data: value,
    onSave: async (_value) => {
      try {
        setIsLoading(true)
        const updatedEntry = await updateEntry(
          entry?.id as string,
          _value as string
        )
        setAnalysis(updatedEntry?.analysis)
        setIsLoading(false)
      } catch (e) {
        console.log(e)
      }
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

      <div className="w-full h-full grid grid-cols-3 p-2">
        <div className="h-full col-span-2">
          <textarea
            value={value}
            className="w-full h-5/6 p-8 text-xl outline-none"
            onChange={(e) => {
              setValue(e.target.value)
            }}
          />
        </div>
        <Analysis analysis={analysis} />
      </div>
    </div>
  )
}

export default Editor
