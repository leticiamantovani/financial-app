import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-charts";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import AiReportButton from "./_components/ai-report-button";
import Head from "next/head";

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
      <Head>
        <title>Finance logo</title>
        <meta name="description" content="" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Navbar />
      <div className="p-6 space-y-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            <AiReportButton
              date={`${formattedDate}`}
              hasPremiumPlan={
                user?.publicMetadata?.subscriptionPlan === "premium"
              }
            />
            <TimeSelect />
          </div>
        </div>

        <div className="grid grid-cols-[2fr,1fr] gap-6">
          <div className="flex flex-col gap-6">
            <SummaryCards
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />
            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;
