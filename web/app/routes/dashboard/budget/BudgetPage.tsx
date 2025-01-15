import BudgetTable from "~/components/BudgetTable";
import type { Route } from "./+types/BudgetPage";
import BudgetSpentChart from "~/components/BudgetSummaryChart";
import SavingPlansList from "~/components/SavingPlanList";

export async function loader({ params }: Route.LoaderArgs) {
  return {
    monthly: new Promise<any[]>((res) =>
      setTimeout(() => {
        res([
          {
            id: "123",
            name: "Shopping",
            total: 120,
            reserved: 200,
          },
        ]),
          5000;
      })
    ),
  };
}

export default function BudgetPage({ loaderData }: Route.ComponentProps) {
  const { monthly } = loaderData;

  return (
    <div>
      <header>
        <h3 className="font-bold text-xl">Budget</h3>
      </header>

      <div className="py-6">
        <div>
          <BudgetSpentChart />
        </div>

        <div className="flex flex-col md:flex-row flex-nowrap">
          <div className="grow order-last md:order-none">
            <BudgetTable data={monthly} />
          </div>

          <div className="mb-8 md:mb-0 md:mx-4 shrink-0 rounded-md shadow-md bg-white py-4 px-2">
            <h4 className="font-medium">Summary</h4>

            <div>
              <SavingPlansList savingPlans={[]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
