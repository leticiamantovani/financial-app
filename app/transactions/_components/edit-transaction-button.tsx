"use client";
import React, { useState } from "react";
import { PencilIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { UpsertTransactionDialog } from "@/app/_components/upsert-transaction-dialog";
import { Transaction } from "@prisma/client";

interface EditTransactionButtonProps {
  transaction: Transaction;
}

const EditTransactionButton = ({ transaction }: EditTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        className="text-muted-foreground"
        size="icon"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{ ...transaction, amount: Number(transaction.amount) }}
        transactionId={transaction.id}
      />
    </>
  );
};

export default EditTransactionButton;
