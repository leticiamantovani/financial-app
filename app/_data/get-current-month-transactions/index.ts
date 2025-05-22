import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getCurrentMonthTransactions = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 1);

  return db.transaction.count({
    where: {
      userId,
      createdAt: {
        gte: startDate,
        lt: endDate,
      },
    },
  });
};
