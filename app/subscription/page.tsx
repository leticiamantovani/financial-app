import { auth, clerkClient } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import { Badge } from "../_components/ui/badge";
import AquirePlanButton from "./_components/acquire-plan-button";
import { getCurrentMonthTransactions } from "../_data/get-current-month-transactions";
import Footer from "../_components/footer";

const SubscriptionPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const user = await clerkClient().users.getUser(userId);
  const hasSubscription = user?.publicMetadata.subscriptionPlan === "premium";
  const currentMonthTransactions = await getCurrentMonthTransactions();

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Título centralizado */}
        <h1 className="text-center text-2xl font-bold mb-10">Assinatura</h1>

        {/* Cards responsivos e com mesma altura */}
        <div className="flex flex-col md:flex-row justify-center md:items-stretch items-center gap-8">
          {/* Plano Básico */}
          <Card className="w-full max-w-md h-full flex flex-col transition-all duration-300 transform hover:shadow-xl hover:scale-[1.02]">
            <CardHeader className="border-b border-solid py-8 relative">
              <h2 className="text-center text-2xl font-semibold">
                Plano Básico
              </h2>
              <div className="flex items-center gap-3 justify-center">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">0</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8 flex-1">
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>
                  Apenas 10 transações por mês ({currentMonthTransactions}/10)
                </p>
              </div>
              <div className="flex items-center gap-3">
                <XIcon />
                <p>Relatórios de IA</p>
              </div>
            </CardContent>
          </Card>

          {/* Plano Premium */}
          <Card className="w-full max-w-md h-full flex flex-col transition-all duration-300 transform hover:shadow-xl hover:scale-[1.02]">
            <CardHeader className="relative border-b border-solid py-8">
              {hasSubscription && (
                <Badge className="absolute left-4 top-12 bg-primary/10 text-primary">
                  Ativo
                </Badge>
              )}
              <h2 className="text-center text-2xl font-semibold">
                Plano Premium
              </h2>
              <div className="flex items-center gap-3 justify-center">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">19</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8 flex-1">
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>Relatórios de IA</p>
              </div>
              <AquirePlanButton />
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SubscriptionPage;
