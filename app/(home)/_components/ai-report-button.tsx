"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { BotIcon, Loader2Icon } from "lucide-react";
import { generateAiReport } from "../_actions/generate-ai-report";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from "react-markdown";

interface AiReportButtonProps {
  month: string;
}

const AiReportButton = ({ month }: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>(null);
  const [reportIsLoading, setReportIsLoading] = useState(false);
  const handleGenerateAiReport = async () => {
    try {
      setReportIsLoading(true);
      const aiReport = await generateAiReport({ month });
      setReport(aiReport);
    } catch (error) {
      console.error(error);
    } finally {
      setReportIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="font-bold">
          Relatório de IA
          <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Relatório IA</DialogTitle>
          <DialogDescription>
            Use a inteligência artificial para analisar suas transações e obter
            insights valiosos.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="prose prose-h3:text-white prose-h4:text-white prose-strong:text-white max-h-[450px] text-white">
          <Markdown>{report}</Markdown>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Fechar</Button>
          </DialogClose>
          <Button onClick={handleGenerateAiReport} disabled={reportIsLoading}>
            {reportIsLoading && <Loader2Icon className="animate-spin" />}
            Gerar relatório
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AiReportButton;