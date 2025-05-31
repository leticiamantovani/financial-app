"use client";

import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Transaction } from "@prisma/client";
import TransactionCardList from "./transaction-card-list";
import { DataTable } from "@/app/_components/ui/data-table";
import { transactionColumns } from "../_columns";
import AddTransactionButton from "@/app/_components/add-transaction-button";

export default function TransactionPageContent({
  transactions,
  tableData,
  userCanAddTransaction,
}: {
  transactions: {
    id: string;
    title: string;
    category: string;
    amount: number;
    paymentMethod: string;
    date: string;
    type: string;
  }[];
  tableData: Transaction[];
  userCanAddTransaction: boolean;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const paginatedTableData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 space-y-6 flex flex-col overflow-hidden">
      {/* Cabeçalho */}
      <div className="flex w-full items-center justify-between gap-2 flex-wrap">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
      </div>

      {/* Tabela Desktop */}
      <ScrollArea className="hidden md:block h-full">
        <div className="border rounded-lg">
          <DataTable columns={transactionColumns} data={paginatedTableData} />
        </div>
      </ScrollArea>

      {/* Cards Mobile */}
      <div className="md:hidden">
        <TransactionCardList transactions={paginatedTransactions} />
      </div>

      {/* Paginação para todas as telas */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border text-sm hover:bg-accent disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((p) => (p < totalPages ? p + 1 : p))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border text-sm hover:bg-accent disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}
