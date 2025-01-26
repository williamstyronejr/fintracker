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
import { Form, Link, useFetcher } from "react-router";
import CogWheel from "~/components/icons/CogWheel";
import { db } from "~/lib/db";
import { Accounts, Transactions } from "~/lib/schema";
import { eq } from "drizzle-orm";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import Input from "~/components/Input";

export async function loader({ params }: Route.LoaderArgs) {
  const account = await db.query.Accounts.findFirst({
    where: eq(Accounts.id, params.id),
  });

  // const account = {
  //   id: params.id,
  //   name: "paypal",
  //   balance: 1200,
  // };

  const schedulePayments = [
    {
      id: "test",
      title: "Amazon Prime",
      type: "payment",
      amount: "14.99",
      date: new Date(),
    },
  ];

  const transactions = db
    .select()
    .from(Transactions)
    .where(eq(Transactions.accountId, params.id))
    .execute();

  // const transactions = new Promise<any[]>((res) =>
  //   setTimeout(() => {
  //     res([
  //       {
  //         id: "123",
  //         amount: "123",
  //         title: "UberEats",
  //         date: new Date(),
  //       },
  //     ]);
  //   }, 5000)
  // );

  return { ...account, transactions, schedulePayments };
}

function CreateTransaction({ accountId }: { accountId: string }) {
  let fetcher = useFetcher();

  return (
    <Dialog>
      <DialogTrigger className="">Add</DialogTrigger>

      <DialogContent>
        <fetcher.Form action="/api/transactions/create" method="post">
          <Input name="title" label="title" type="text" />

          <Input name="amount" label="amount" type="text" />

          <input type="hidden" name="account" value={accountId} />

          <button type="submit" disabled={fetcher.state != "idle"}>
            Create
          </button>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}

export default function AccountPage({ loaderData }: Route.ComponentProps) {
  const { title, id, nickname, balance, transactions, schedulePayments } =
    loaderData;

  return (
    <div>
      <div className="py-4 flex flex-row flex-nowrap justify-between">
        <div>
          <h3 className="font-semibold text-3xl">{nickname}</h3>
          <h6 className="text-sm  py-1 text-slate-500">{title}</h6>
        </div>

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
          <div className="flex flex-row flex-nowrap justify-between">
            <h3 className="font-medium text-xl pb-4">Transactions</h3>

            <CreateTransaction accountId={id as string} />
          </div>

          <Suspense fallback={<TransactionTableFallback />}>
            <TransactionTable data={transactions} accountId={id} />
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
