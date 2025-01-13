import TransactionTable, {
  TransactionTableFallback,
} from "~/components/TransactionTable";
import type { Route } from "./+types/AccountPage";
import { Suspense } from "react";
import { DropdownMenu } from "~/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router";
import CogWheel from "~/components/icons/CogWheel";

export async function loader({ params }: Route.LoaderArgs) {
  const account = {
    id: params.id,
    name: "paypal",
    balance: 1200,
  };

  const schedulePayments = [
    {
      id: "test",
      title: "Amazon Prime",
      type: "payment",
      amount: "14.99",
      date: new Date(),
    },
  ];

  const transactions = new Promise<any[]>((res) =>
    setTimeout(() => {
      res([
        {
          id: "123",
          amount: "123",
          title: "UberEats",
          date: new Date(),
        },
      ]);
    }, 5000)
  );

  return { ...account, transactions, schedulePayments };
}

export default function AccountPage({ loaderData }: Route.ComponentProps) {
  const { name, id, balance, transactions, schedulePayments } = loaderData;

  return (
    <div>
      <div className="py-4 flex flex-row flex-nowrap justify-between">
        <h3 className="font-semibold text-3xl">{name}</h3>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <CogWheel />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="left"
            className="bg-white shadow-lg rounded-md px-4 py-2 mt-12"
          >
            <DropdownMenuItem>
              <Link to={`/dashboard/accounts/${id}/settings`}>Settings</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col md:flex-row flex-nowrap gap-4">
        <div className="grow">
          <div>
            <h3 className="font-medium text-xl pb-4">Transactions</h3>
          </div>

          <Suspense fallback={<TransactionTableFallback />}>
            <TransactionTable data={transactions} />
          </Suspense>
        </div>

        <div className="md:w-80 w-full bg-white shadow-lg rounded-md py-2 px-2">
          <div className="pb-4">
            <h3 className="font-medium">Upcoming Payments</h3>
          </div>

          <div className="flex flex-col flex-nowrap">
            {schedulePayments.map((payment) => (
              <Link
                className="flex flex-row flex-nowrap"
                key={`schedule-payments-${payment.id}`}
                to={`/dashboard/transactions/${payment.id}`}
              >
                <div className="grow">
                  <div>{payment.title}</div>
                  <div className="text-slate-300 ">
                    {payment.date.toLocaleDateString("en-US", {
                      day: "2-digit",
                      year: "numeric",
                      month: "short",
                    })}
                  </div>
                </div>

                <div className="">{payment.amount}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
