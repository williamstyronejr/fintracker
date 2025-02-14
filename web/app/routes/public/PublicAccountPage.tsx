import { db } from "~/lib/db";
import type { Route } from "./+types/PublicAccountPage";
import { Accounts, PublicLinks, Transactions } from "~/lib/schema";
import { and, eq } from "drizzle-orm";
import { data, redirect } from "react-router";
import TransactionTable, {
  TransactionTableFallback,
} from "~/components/TransactionTable";
import { Suspense } from "react";

export async function loader(args: Route.LoaderArgs) {
  const { id } = args.params;

  try {
    const publicLink = await db.query.PublicLinks.findFirst({
      where: and(eq(PublicLinks.active, true), eq(PublicLinks.id, id)),
    });

    if (!publicLink) throw new Response("Not found", { status: 400 });

    const account = await db.query.Accounts.findFirst({
      where: eq(Accounts.id, publicLink.accountId),
    });

    if (!account) throw new Response("Not Found", { status: 404 });

    const transactions = db
      .select()
      .from(Transactions)
      .where(eq(Transactions.accountId, id))
      .execute();

    return {
      account,
      transactions,
    };
  } catch (err) {
    throw new Response("Error", { status: 500 });
  }
}

export default function PublicAccountPage({
  params,
  loaderData,
}: Route.ComponentProps) {
  const { account, transactions } = loaderData;
  const { id } = params;

  return (
    <section>
      <div className="py-4 flex flex-row flex-nowrap justify-between">
        <div>
          <h3 className="font-semibold text-3xl">{account.nickname}</h3>
          <h6 className="text-sm  py-1 text-slate-500">{account.title}</h6>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-nowrap gap-4">
        <div className="grow">
          <div className="flex flex-row flex-nowrap justify-between">
            <h3 className="font-medium text-xl pb-4">Transactions</h3>
          </div>

          <Suspense fallback={<TransactionTableFallback />}>
            <TransactionTable data={transactions} accountId={id} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
