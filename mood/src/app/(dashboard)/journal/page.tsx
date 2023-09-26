import NewEntryCard from "@/components/NewEntryCard"
import { getUserByClerkId } from "../../../../utils/auth"
import { prisma } from "../../../../utils/db"
import EntryCard from "@/components/EntryCard"
import Link from "next/link"
import { Prisma } from "@prisma/client"
import Question from "@/components/Question"

const entryWithAnalysis = Prisma.validator<Prisma.JournalEntryDefaultArgs>()({
  include: { analysis: true },
})

type EntryWithAnalysis = Prisma.JournalEntryGetPayload<typeof entryWithAnalysis>

const getEntries = async () => {
  try {
    const user = await getUserByClerkId()
    const entries = await prisma.journalEntry.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: { analysis: true },
    })
    return entries
  } catch (e) {
    console.log(e)
  }
}

type EntriesWithAnalysis = Prisma.PromiseReturnType<typeof getEntries>

export default async function JournalPage() {
  const entries: EntriesWithAnalysis = await getEntries()

  return (
    <div className="bg-zinc-400/10 h-full p-5">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="my-8">
        <Question />
      </div>
      <div className="grid grid-cols-3 gap-4 p-1">
        <NewEntryCard />
        {entries?.map((entry: EntryWithAnalysis) => {
          return (
            <Link href={`/journal/${entry.id}`} key={entry.id}>
              <EntryCard entry={entry} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
