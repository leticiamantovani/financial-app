import { db } from "../_lib/prisma";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import TransactionPageContent from "./_components/transaction-page-content";
import Footer from "../_components/footer";

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
      <TransactionPageContent
        transactions={transactions.map((t) => ({
          id: t.id,
          title: t.name,
          category: t.category,
          amount: Number(t.amount),
          paymentMethod: t.paymentMethod,
          date: t.date.toString(),
          type: t.type,
        }))}
        tableData={JSON.parse(JSON.stringify(transactions))}
        userCanAddTransaction={userCanAddTransaction}
      />
      <Footer />
    </>
  );
};

export default TransactionsPage;
