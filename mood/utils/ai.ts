import { OpenAI } from "langchain/llms/openai"
import { PromptTemplate } from "langchain/prompts"
import { StructuredOutputParser } from "langchain/output_parsers"
import { z } from "zod"
import { JournalEntry } from "@prisma/client"

/* https://js.langchain.com/docs/modules/model_io/output_parsers/how_to/use_with_llm_chain */
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe("The mood of the person who wrote the journal entry"),
    summary: z.string().describe("quick summary of the entire entry"),
    subject: z.string().describe("The subject of the journal entry."),
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
    sentimentScore: z
      .number()
      .describe(
        "sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive."
      ),
  })
)

//ref: https://js.langchain.com/docs/modules/model_io/output_parsers/how_to/use_with_llm_chain
const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })

  return input
}

export const analyze = async (entry: JournalEntry) => {
  const input = await getPrompt(entry.content)
  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" })
  const result = await model.call(input)

  try {
    return parser.parse(result)
  } catch (e) {
    console.log(e)
  }
}
