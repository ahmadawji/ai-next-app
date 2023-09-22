import { NextResponse } from "next/server"
import { getUserByClerkId } from "../../../../utils/auth"
import { prisma } from "../../../../utils/db"
import { JournalEntry } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { analyze } from "../../../../utils/ai"

export const POST = async (): Promise<NextResponse<{ data: JournalEntry }>> => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.create({
    data: { userId: user.id, content: "Write about your day :)" },
  })
  const analysis = await analyze(entry)
  await prisma.entryAnalysis.create({
    data: {
      entryId: entry.id,
      userId: user.id,
      mood: analysis?.mood as string,
      summary: analysis?.summary as string,
      subject: analysis?.subject as string,
      negative: analysis?.negative as boolean,
      color: analysis?.color as string,
      sentimentScore: 0,
    },
  })
  revalidatePath("/journal")
  return NextResponse.json({ data: entry })
}
