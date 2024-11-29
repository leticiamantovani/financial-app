"use server";

import { db } from "@/app/_lib/prisma";
import { DeleteTransactionInput } from "./schema";
import { revalidatePath } from "next/cache";

export const deleteTransaction = async ({
  transactionId,
}: DeleteTransactionInput) => {
  await db.transaction.delete({ where: { id: transactionId } });
  revalidatePath("/transactions");
  revalidatePath("/");
};
