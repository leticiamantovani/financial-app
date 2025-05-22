import { db } from "@/app/_lib/prisma";

export const getMonthTransactions = async (date: string) => {
  const [year, month] = date.split("-").map(Number);

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1);

  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
  });

  return transactions;
};
