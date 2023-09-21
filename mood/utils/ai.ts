import { OpenAI } from "langchain/llms/openai"
import { StructuredOutputParser } from "langchain/output_parsers"
import { z } from "zod"

/* https://js.langchain.com/docs/modules/model_io/output_parsers/how_to/use_with_llm_chain */
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe("The mood of the person who wrote the journal entry"),
    summary: z.string().describe("quick summary of the entire entry"),
    negative: z
      .boolean()
      .describe(
        "Is the journal entry negative? (i.e. does it contain negative emotions?"
      ),
    color: z
      .string()
      .describe(
        "a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness."
      ),
  })
)

export const analyze = async (prompt: string) => {
  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" })
  const result = await model.call(prompt)
  console.log("🚀 ~ file: ai.ts:6 ~ analyze ~ result:", result)
}
