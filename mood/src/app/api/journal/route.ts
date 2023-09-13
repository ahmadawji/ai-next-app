import { NextResponse } from "next/server"
import { getUserByClerkId } from "../../../../utils/auth"
import { prisma } from "../../../../utils/db"
import { JournalEntry } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const POST = async (): Promise<NextResponse<{ data: JournalEntry }>> => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.create({
    data: { userId: user.id, content: "Write about your day :)" },
  })
  revalidatePath("/journal")
  return NextResponse.json({ data: entry })
}
