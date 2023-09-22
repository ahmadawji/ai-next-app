import { NextResponse } from "next/server"
import { getUserByClerkId } from "../../../../../utils/auth"
import { prisma } from "../../../../../utils/db"
import { analyze } from "../../../../../utils/ai"

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { content } = await request.json()
  const user = await getUserByClerkId()
  const updatedEntry = await prisma.journalEntry.update({
    where: { userId_id: { userId: user.id, id: params.id } },
    data: { content },
  })

  const analysis = await analyze(updatedEntry)
  const savedAnalysis = await prisma.entryAnalysis.upsert({
    where: { entryId: updatedEntry.id },
    update: { ...analysis },
    create: {
      entryId: updatedEntry.id,
      userId: user.id,
      mood: analysis?.mood as string,
      summary: analysis?.summary as string,
      subject: analysis?.subject as string,
      negative: analysis?.negative as boolean,
      color: analysis?.color as string,
      sentimentScore: 0,
    },
  })

  return NextResponse.json({ data: { ...updatedEntry, savedAnalysis } })
}
