"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MONTHS = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

const TimeSelect = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const monthParam = searchParams.get("month");
  const yearParam = searchParams.get("year");

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.toISOString().slice(5, 7);

  const [selectedYear, setSelectedYear] = useState(
    yearParam ? Number(yearParam) : currentYear,
  );
  const [selectedMonth, setSelectedMonth] = useState(
    monthParam ?? currentMonth,
  );

  // Define intervalo de anos: 2 anos passados até 2 anos futuros
  const yearRange = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  // Atualiza a URL automaticamente quando ano ou mês mudam
  useEffect(() => {
    push(`/?year=${selectedYear}&month=${selectedMonth}`);
  }, [selectedYear, selectedMonth]);

  return (
    <div className="flex gap-2">
      {/* Ano */}
      <Select
        onValueChange={(value) => setSelectedYear(Number(value))}
        defaultValue={String(selectedYear)}
      >
        <SelectTrigger className="rounded-full w-[100px]">
          <SelectValue placeholder="Ano" />
        </SelectTrigger>
        <SelectContent>
          {yearRange.map((year) => (
            <SelectItem key={year} value={String(year)}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Mês */}
      <Select
        onValueChange={(value) => setSelectedMonth(value)}
        defaultValue={selectedMonth}
      >
        <SelectTrigger className="rounded-full w-[150px]">
          <SelectValue placeholder="Mês" />
        </SelectTrigger>
        <SelectContent>
          {MONTHS.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeSelect;
