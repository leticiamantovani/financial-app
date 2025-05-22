import { isMatch } from "date-fns";
import { z } from "zod";

export const generateAiReportSchema = z.object({
  date: z.string().refine((value) => isMatch(value, "yyyy-MM"), {
    message: "Invalid format. Use 'YYYY-MM'.",
  }),
});

export type GenerateAiReportSchema = z.infer<typeof generateAiReportSchema>;
