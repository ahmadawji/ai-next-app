"use client"

import { EntryAnalysis } from "@prisma/client"

const Analysis = ({ analysis }: { analysis: EntryAnalysis }) => {
  const analysisData = [
    { name: "Summary", value: analysis?.summary },
    { name: "Subject", value: analysis?.subject },
    { name: "Mood", value: analysis?.mood },
    { name: "Negative", value: analysis?.negative },
  ]

  return (
    <div className="h-full border-l border-black/10">
      <div className="px-6 py-10" style={{ backgroundColor: analysis?.color }}>
        <h2 className="text-2xl">{`Analysis ${analysis?.emoji}`}</h2>
      </div>
      <div>
        <ul>
          {analysisData.map((analysis, index) => (
            <li
              key={`${analysis.name}${index}`}
              className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
            >
              <span className={`mr-4 text-lg font-semibold`}>
                {analysis.name}
              </span>
              <span>{analysis.value?.toString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Analysis
