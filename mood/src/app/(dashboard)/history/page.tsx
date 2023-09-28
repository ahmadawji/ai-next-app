import HistoryChart from "@/components/HistoryChart"
import { getUserByClerkId } from "../../../../utils/auth"
import { prisma } from "../../../../utils/db"

const getData = async () => {
  const user = await getUserByClerkId()
  const analysis = await prisma.entryAnalysis.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  })
  const sum = analysis.reduce((all, current) => all + current.sentimentScore, 0)
  const avg = Math.round(sum / analysis.length)
  return { analysis, average: avg }
}

const History = async () => {
  const { analysis, average } = await getData()

  return (
    <div className="h-full px-6 py-8">
      <div>{`Avg. Sentiment ${average}`}</div>
      <div className="w-full h-[calc(100vh-150px)]">
        <HistoryChart analysis={analysis} />
      </div>
    </div>
  )
}

export default History
