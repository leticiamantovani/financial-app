"use server";

import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { endOfMonth, startOfMonth } from "date-fns";
import OpenAIApi from "openai";
import { generateAiReportSchema, GenerateAiReportSchema } from "./schema";

const openAi = new OpenAIApi({ apiKey: process.env.OPENAI_API_KEY });

export const generateAiReport = async ({ month }: GenerateAiReportSchema) => {
  generateAiReportSchema.parse({ month });
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

  const getCurrentMonthTransactions = await db.transaction.findMany({
    where: {
      date: {
        gte: startOfMonth(`2024-${month}-01`),
        lt: endOfMonth(`2024-${month}-31`),
      },
    },
  });

  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
  ${getCurrentMonthTransactions
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
