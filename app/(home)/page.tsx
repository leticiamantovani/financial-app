import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import Footer from "../_components/footer";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-charts";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";

interface HomeProps {
  searchParams: {
    month: string;
    year: string;
  };
}

const Home = async ({ searchParams: { month, year } }: HomeProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const formattedMonth =
    month?.padStart(2, "0") ?? String(currentMonth).padStart(2, "0");
  const formattedYear = year ?? String(currentYear);
  const formattedDate = `${formattedYear}-${formattedMonth}`;

  const monthIsInvalid = !isMatch(formattedMonth, "MM");

  if (monthIsInvalid) {
    redirect(`?year=${formattedYear}&month=${formattedMonth}`);
  }

  const dashboard = await getDashboard(`${formattedDate}`);
  const userCanAddTransaction = await canUserAddTransaction();
  const user = await clerkClient().users.getUser(userId);

  return (
    <>
      <Navbar />
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        {/* Título do dashboard */}
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* Filtros (desktop: à direita, mobile: abaixo) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:ml-auto">
          <AiReportButton
            date={`${formattedDate}`}
            hasPremiumPlan={user?.publicMetadata?.subscriptionPlan === "premium"}
          />
          <TimeSelect />
        </div>
      </div>

        {/* Conteúdo principal */}
        <div className="flex flex-col lg:grid lg:grid-cols-[2fr,1fr] gap-6">
          <div className="flex flex-col gap-6">
            <SummaryCards
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />

            {/* Mobile: flex-col com centralização | md+: grid */}
            <div className="flex flex-col gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
              <div className="flex justify-center md:block">
                <div className="w-full max-w-md">
                  <TransactionsPieChart {...dashboard} />
                </div>
              </div>
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
              {/* Espaço reservado em lg */}
              <div className="hidden lg:block" />
            </div>
          </div>

          <div>
            <LastTransactions lastTransactions={dashboard.lastTransactions} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
