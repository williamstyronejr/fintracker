import { formatCost } from "~/util";
import NewBudgetPlan from "./NewBudgetPlan";

export default function SavingPlansList({
  savingPlans,
}: {
  savingPlans: any[];
}) {
  return (
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
              <div className="text-slate-500 text-sm">Expected date: </div>
            </div>

            <div className="flex flex-row flex-nowrap">
              <div className=" pr-4">
                <div className="text-slate-500">Collected</div>
                <div className="text-slate-500">Target</div>
              </div>

              <div className="">
                <div className="text-green-500 ">{formatCost(plan.saved)}</div>
                <div className="">{formatCost(plan.target)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
