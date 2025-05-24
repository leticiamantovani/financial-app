"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Pencil,
  Trash2,
  MoreVertical,
  GraduationCap,
  Clapperboard,
  Utensils,
  HeartPulse,
  Home,
  CircleHelp,
  Wallet,
  Car,
  PlugZap,
} from "lucide-react";
import { TRANSACTION_CATEGORY_LABELS, TRANSACTION_PAYMENT_METHOD_LABELS, TRANSACTION_TYPE_OPTIONS } from "@/app/_constants/transactions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/app/_components/ui/alert-dialog";
import { UpsertTransactionDialog } from "@/app/_components/upsert-transaction-dialog";


interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  type: string; // INCOME ou EXPENSE
  paymentMethod: string;
}

const CATEGORY_ICONS: Record<string, JSX.Element> = {
  EDUCATION: <GraduationCap size={16} className="text-muted-foreground" />,
  ENTERTAINMENT: <Clapperboard size={16} className="text-muted-foreground" />,
  FOOD: <Utensils size={16} className="text-muted-foreground" />,
  HEALTH: <HeartPulse size={16} className="text-muted-foreground" />,
  HOUSING: <Home size={16} className="text-muted-foreground" />,
  OTHER: <CircleHelp size={16} className="text-muted-foreground" />,
  SALARY: <Wallet size={16} className="text-muted-foreground" />,
  TRANSPORTATION: <Car size={16} className="text-muted-foreground" />,
  UTILITY: <PlugZap size={16} className="text-muted-foreground" />,
};

export default function TransactionCardList({ transactions }: { transactions: Transaction[] }) {
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);

  return (
    <div className="md:hidden flex flex-col gap-4">
      {transactions.map((t) => (
        <div
          key={t.id}
          className="rounded-xl border bg-card text-card-foreground shadow-sm p-4 space-y-3"
        >
          {/* Header: título à esquerda, data + ações à direita */}
          <div className="flex justify-between items-start">
            <h2 className="font-semibold text-xl">{t.title}</h2>

            <div className="flex flex-col items-end gap-1">
              <span className="text-sm text-muted-foreground">
                {format(new Date(t.date), "dd/MM/yyyy")}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    role="button"
                    className="p-1 rounded-md inline-flex items-center hover:bg-accent hover:text-accent-foreground transition"
                  >
                    <MoreVertical size={18} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => setEditTransaction(t)}
                    className="flex items-center gap-2"
                  >
                    <Pencil size={16} />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setOpenDialogId(t.id)}
                    className="text-destructive flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">{TRANSACTION_PAYMENT_METHOD_LABELS[t.paymentMethod as keyof typeof TRANSACTION_PAYMENT_METHOD_LABELS]}</div>

          {/* Categoria com ícone */}
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            {CATEGORY_ICONS[t.category] ?? <CircleHelp size={16} className="text-muted-foreground" />}
            {TRANSACTION_CATEGORY_LABELS[t.category as keyof typeof TRANSACTION_CATEGORY_LABELS]}
          </div>

          {/* Valor */}
          <div
            className={`text-sm font-semibold ${
              t.type === "EXPENSE"
                ? "text-destructive"
                : t.type === "INVESTMENT"
                ? "text-green-300"
                : "text-green-500"
            }`}
          >
            Valor: R$ {t.amount.toFixed(2).replace(".", ",")}
          </div>
          <div className="text-sm text-muted-foreground">
            Type: {TRANSACTION_TYPE_OPTIONS.find(option => option.value === t.type)?.label}
          </div>

          {/* Modal de confirmação */}
          <AlertDialog
            open={openDialogId === t.id}
            onOpenChange={(open) => !open && setOpenDialogId(null)}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir esta transação? Essa ação não poderá ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    console.log("Excluir confirmado", t.id);
                    setOpenDialogId(null);
                  }}
                >
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {editTransaction && (
            <UpsertTransactionDialog
              isOpen={!!editTransaction}
              setIsOpen={() => setEditTransaction(null)}
              transactionId={editTransaction.id}
              defaultValues={{
                name: editTransaction.title,
                amount: Number(editTransaction.amount),
                type: editTransaction.type as any,
                category: editTransaction.category as any,
                paymentMethod: "CASH" as any, 
                date: new Date(editTransaction.date),
              }}
            />
          )}

        </div>
      ))}
    </div>
  );
}