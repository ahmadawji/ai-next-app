import NewEntryCard from "@/components/NewEntryCard"
import { getUserByClerkId } from "../../../../utils/auth"
import { prisma } from "../../../../utils/db"
import EntryCard from "@/components/EntryCard"

const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  })

  return entries
}

export default async function JournalPage() {
  const entries = await getEntries()

  return (
    <div className="bg-zinc-400/10 h-full p-5">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4 p-1">
        <NewEntryCard />
        {entries.map((entry) => {
          return <EntryCard key={entry.id} entry={entry} />
        })}
      </div>
    </div>
  )
}
