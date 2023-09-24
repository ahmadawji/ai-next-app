import Editor from "@/components/Editor"
import { getUserByClerkId } from "../../../../../utils/auth"
import { prisma } from "../../../../../utils/db"
import { Prisma } from "@prisma/client"

const getEntry = async (id: string) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: { userId_id: { userId: user.id, id } },
    include: { analysis: true },
  })
  return entry
}

const entryWithAnalysis = Prisma.validator<Prisma.JournalEntryDefaultArgs>()({
  include: { analysis: true },
})

type EntryWithAnalysis = Prisma.JournalEntryGetPayload<typeof entryWithAnalysis>

const EntryPage = async ({ params }: { params: { id: string } }) => {
  const entry: EntryWithAnalysis | null = await getEntry(params.id)
  return (
    <>
      <Editor entry={entry as EntryWithAnalysis} />
    </>
  )
}

export default EntryPage
