"use client";

import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { Button } from "./ui/button";
import { UpsertTransactionDialog } from "./upsert-transaction-dialog";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";

interface EditTransactionButtonProps {
  transaction: {
    id: string;
    name: string;
    amount: number;
    type: TransactionType;
    category: TransactionCategory;
    paymentMethod: TransactionPaymentMethod;
    date: string;
  };
}

export const EditTransactionButton = ({
  transaction,
}: EditTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setDialogIsOpen(true)}
        className="text-muted-foreground"
      >
        <PencilIcon className="w-4 h-4" />
      </Button>

      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        transactionId={transaction.id}
        defaultValues={{
          name: transaction.name,
          amount: Number(transaction.amount),
          type: transaction.type,
          category: transaction.category,
          paymentMethod: transaction.paymentMethod,
          date: new Date(transaction.date),
        }}
      />
    </>
  );
};
