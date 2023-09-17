import Editor from "@/components/Editor"
import { getUserByClerkId } from "../../../../../utils/auth"
import { prisma } from "../../../../../utils/db"

const getEntry = async (id: string) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: { userId_id: { userId: user.id, id } },
  })
  return entry
}

const EntryPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id)
  const analysisData = [
    { name: "Summary", value: "" },
    { name: "Subject", value: "" },
    { name: "Mood", value: "" },
    { name: "Negative", value: false },
  ]
  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="h-full col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="h-full border-l border-black/10">
        <div className="bg-blue-300 px-6 py-10">
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((analysis, index) => (
              <li
                key={`${analysis.name}${index}`}
                className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
              >
                <span className="text-lg font-semibold">{analysis.name}</span>
                <span>{analysis.value.toString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EntryPage
