import { db } from "../_lib/prisma";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import { ScrollArea } from "../_components/ui/scroll-area";
import { DataTable } from "../_components/ui/data-table";
import TransactionCardList from "./_components/transaction-card-list";

const TransactionsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const transactions = await db.transaction.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });

  const userCanAddTransaction = await canUserAddTransaction();

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6 flex flex-col overflow-hidden">
        {/* Cabeçalho */}
        <div className="flex w-full items-center justify-between gap-2 flex-wrap">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        </div>

        {/* Tabela Desktop */}
        <ScrollArea className="hidden md:block h-full">
          <div className="border rounded-lg">
            <DataTable
              columns={transactionColumns}
              data={JSON.parse(JSON.stringify(transactions))}
            />
          </div>
        </ScrollArea>

        {/* Cards Mobile */}
        <TransactionCardList
          transactions={transactions.map((t) => ({
            id: t.id,
            title: t.name,
            category: t.category,
            amount: Number(t.amount),
            paymentMethod: t.paymentMethod,
            date: t.date.toString(),
            type: t.type, // INCOME ou EXPENSE
          }))}
        />
      </div>
    </>
  );
};

export default TransactionsPage;
