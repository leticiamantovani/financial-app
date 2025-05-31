import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  canAddTransaction?: boolean;
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
  canAddTransaction,
}: SummaryCardProps) => {
  return (
    <Card
      className={`${
        size === "large" ? "bg-white bg-opacity-5" : ""
      } w-full`}
    >
      <CardHeader className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-start">
        <div className="flex items-center gap-2">
          {icon}
          <p className={`text-center sm:text-left ${
            size === "small" ? "text-muted-foreground" : "text-white opacity-70"
          }`}>
            {title}
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-2">
        <p
          className={`font-bold ${
            size === "small" ? "text-2xl" : "text-4xl"
          } text-center sm:text-left`}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>

        {size === "large" && (
          <div className="sm:ml-auto">
            <AddTransactionButton
              userCanAddTransaction={canAddTransaction as boolean}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
