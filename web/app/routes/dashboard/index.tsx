import { Suspense } from "react";
import type { Route } from "./+types/index";
import { Link } from "react-router";
import { formatCost } from "~/util";
import TransactionTable, {
  TransactionTableFallback,
} from "~/components/TransactionTable";

export async function loader({}: Route.LoaderArgs) {
  return {
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
  let { transactions } = loaderData;

  return (
    <div>
      <div className="mb-2">
        <div>Monthly Cashflow</div>

        <div className="flex flex-row flex-nowrap gap-4">
          <div className="rounded">
            <h3>Income</h3>
            <div>{formatCost(1200)}</div>
          </div>

          <div className="rounded">
            <h3>Expenses</h3>
            <div>{formatCost(1200)}</div>
          </div>

          <div className="rounded">
            <h3>Balance</h3>
            <div>{formatCost(1200)}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-row flex-nowrap ">
        <div>
          <div className="flex flex-row flex-nowrap ">
            <div>Monthly</div>
            <Link to="/">View More</Link>
          </div>

          <div className="rounded-md px-2 py-1">chart here</div>

          <div>
            <div className="flex flex-row flex-nowrap justify-center">
              <h3 className="font-medium">Saving Goals</h3>

              <div>New Plan</div>
            </div>

            <div></div>
          </div>
        </div>

        <div>
          <Suspense fallback={<TransactionTableFallback />}>
            <TransactionTable data={transactions} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
