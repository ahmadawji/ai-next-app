import { auth } from "@clerk/nextjs"
import { prisma } from "./db"

interface User {
  id: string
}

export const getUserByClerkId = async ({
  select = { id: true },
}: {
  select?: { id: boolean }
} = {}): Promise<User> => {
  const { userId } = await auth()
  const user = await prisma.user.findUniqueOrThrow({
    where: { clerkId: userId as string },
    select,
  })

  return user
}
