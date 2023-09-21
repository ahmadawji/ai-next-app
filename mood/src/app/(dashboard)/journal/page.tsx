import NewEntryCard from "@/components/NewEntryCard"
import { getUserByClerkId } from "../../../../utils/auth"
import { prisma } from "../../../../utils/db"
import EntryCard from "@/components/EntryCard"
import Link from "next/link"
import { analyze } from "../../../../utils/ai"

const getEntries = async () => {
  try {
    const user = await getUserByClerkId()
    const entries = await prisma.journalEntry.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    })

    await analyze(`I'm going to give you journal entry to analyze and you have to give some information about this entry in a formatted JSON like so {"mood":'', "subject":'',"color":'',"negative":''}.
    journal entry:
    Today I finally found out a way to fix my payment issue, I was so excited getting back to work again.
    `)
    return entries
  } catch (e) {
    console.log(e)
  }
}

export default async function JournalPage() {
  const entries = await getEntries()

  return (
    <div className="bg-zinc-400/10 h-full p-5">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4 p-1">
        <NewEntryCard />
        {entries?.map((entry) => {
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
