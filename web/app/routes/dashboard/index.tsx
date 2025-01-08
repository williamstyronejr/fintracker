import { Suspense } from "react";
import type { Route } from "./+types/index";
import { Link } from "react-router";
import { formatCost } from "~/util";
import TransactionTable, {
  TransactionTableFallback,
} from "~/components/TransactionTable";
import NewBudgetPlan from "~/components/NewBudgetPlan";
import MonthlyChart from "~/components/MonthlyChart";

export async function loader({}: Route.LoaderArgs) {
  return {
    savingPlans: [
      {
        id: "123",
        title: "Buying A Car",
        saved: 120,
        target: 120,
      },
      {
        id: "1233",
        title: "Buying A Car 2",
        saved: 120,
        target: 120,
      },
    ],
    transactions: new Promise<any[]>((res, rej) =>
      setTimeout(() => {
        res([
          {
            id: "123",
            title: "UberEats",
            amount: 8000,
            date: new Date(),
          },
        ]);
      }, 5000)
    ),
  };
}

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  let { transactions, savingPlans } = loaderData;

  return (
    <div>
      <div className="rounded-md px-4 py-2 mb-2">
        <div className="flex flex-row flex-nowrap">
          <div className="text-xl font-bold pb-4">Monthly Cashflow</div>
        </div>

        <div className="flex flex-row flex-nowrap gap-4">
          <div className="rounded-md bg-slate-300/10 px-4 py-2 grow w-0">
            <h3 className="font-medium">Income</h3>
            <div className="font-bold text-2xl">{formatCost(1200)}</div>
          </div>

          <div className="rounded-md bg-slate-300/10 px-4 py-2 grow w-0">
            <h3 className="font-medium">Expenses</h3>
            <div className="font-bold text-2xl">{formatCost(1200)}</div>
          </div>

          <div className="rounded-md bg-slate-300/10 px-4 py-2 grow w-0">
            <h3 className="font-medium">Balance</h3>
            <div className="font-bold text-2xl">{formatCost(1200)}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-row flex-nowrap ">
        <div className="px-4 shrink-0 bg-slate-300/10 rounded-md mr-4 max-w-80">
          <div className="flex flex-row flex-nowrap ">
            <div>Monthly</div>
            <Link to="/">View More</Link>
          </div>

          <div className="rounded-md px-2 py-1">
            <MonthlyChart />
          </div>

          <div className="bg-white px-4 py-2 rounded-md">
            <div className="flex flex-row flex-nowrap justify-between items-center py-2">
              <h3 className="font-medium">Saving Goals</h3>

              <NewBudgetPlan />
            </div>

            <div className="flex flex-col flex-nowrap gap-2">
              {savingPlans.map((plan) => (
                <div
                  key={`saving-plan-${plan.id}`}
                  className="flex flex-row flex-nowrap"
                >
                  <div className=""></div>

                  <div className="grow px-2">
                    <div></div>

                    <h4 className="font-semibold">{plan.title}</h4>
                    <div className="text-slate-500 text-sm">
                      Expected date:{" "}
                    </div>
                  </div>

                  <div className="flex flex-row flex-nowrap">
                    <div className=" pr-4">
                      <div className="text-slate-500">Collected</div>
                      <div className="text-slate-500">Target</div>
                    </div>

                    <div className="">
                      <div className="text-green-500 ">
                        {formatCost(plan.saved)}
                      </div>
                      <div className="">{formatCost(plan.target)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grow">
          <Suspense fallback={<TransactionTableFallback />}>
            <TransactionTable data={transactions} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
