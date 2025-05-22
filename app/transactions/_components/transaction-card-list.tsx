"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Pencil, Trash2, MoreVertical } from "lucide-react";
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

interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
}

export default function TransactionCardList({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  return (
    <div className="md:hidden flex flex-col gap-4">
      {transactions.map((t) => (
        <div
          key={t.id}
          className="rounded-xl border bg-card text-card-foreground shadow-sm p-4 relative space-y-2"
        >
          {/* Menu flutuante */}
          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  role="button"
                  className="p-1 rounded-full hover:bg-accent hover:text-accent-foreground transition"
                >
                  <MoreVertical size={18} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => console.log("Editar", t.id)}
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

          {/* Conteúdo do card */}
          <div className="flex justify-between">
            <h2 className="font-medium text-base">{t.title}</h2>
            <span className="text-sm text-muted-foreground">
              {format(new Date(t.date), "dd/MM/yyyy")}
            </span>
          </div>

          <div className="text-sm text-muted-foreground">
            Categoria: {t.category}
          </div>
          <div className="text-sm font-semibold text-primary">
            Valor: R$ {t.amount.toFixed(2)}
          </div>

          {/* AlertDialog fora do menu */}
          <AlertDialog
            open={openDialogId === t.id}
            onOpenChange={(open) => !open && setOpenDialogId(null)}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir esta transação? Essa ação não
                  poderá ser desfeita.
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
        </div>
      ))}
    </div>
  );
}
