"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import OpenAIApi from "openai";
import { generateAiReportSchema, GenerateAiReportSchema } from "./schema";
import { getMonthTransactions } from "@/app/_data/get-month-transations-from-any-date";

const openAi = new OpenAIApi({ apiKey: process.env.OPENAI_API_KEY });

export const generateAiReport = async ({ date }: GenerateAiReportSchema) => {
  generateAiReportSchema.parse({ date });
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
  }

  const user = await clerkClient().users.getUser(userId);
  const hasPremiumSubscription =
    user?.publicMetadata?.subscriptionPlan === "premium";

  if (!hasPremiumSubscription) {
    throw new Error("User does not have a premium subscription");
  }

  const transactions = await getMonthTransactions(date);
  console.log("TRANSACTIONS", transactions);

  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`,
    )
    .join(";")}`;

  const completion = await openAi.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.",
      },
      {
        role: "user",
        content,
      },
    ],
  });

  return completion.choices[0].message.content;
};
