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
import { BotIcon } from "lucide-react";
import { generateAiReport } from "../_actions/generate-ai-report";
import { useState } from "react";

interface AiReportButtonProps {
	month: string;
}

const AiReportButton = ({ month }: AiReportButtonProps) => {
	const [report, setReport] = useState<string | null>(null);
	const handleGenerateAiReport = async () => {
		try {
			const aiReport = await generateAiReport({ month });
			setReport(aiReport);
		} catch (error) {
			console.error(error);
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
						Use a inteligência artificial para analisar suas transações e obter insights valiosos.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="ghost">Fechar</Button>
					</DialogClose>
					<Button onClick={handleGenerateAiReport}>Gerar relatório</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default AiReportButton;
