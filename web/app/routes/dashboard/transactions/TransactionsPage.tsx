import { getAuth } from "@clerk/react-router/ssr.server";
import { Suspense } from "react";
import { redirect } from "react-router";
import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { Transactions } from "~/lib/schema";
import TransactionTable, {
  TransactionTableFallback,
} from "~/components/TransactionTable";

import type { Route } from "./+types/TransactionsPage";

export async function loader(args: Route.LoaderArgs) {
  const user = await getAuth(args);

  if (!user.userId) return redirect("/signin");

  try {
    const transactions = db
      .select()
      .from(Transactions)
      .where(eq(Transactions.userId, user.userId))
      .execute();

    return {
      transactions,
    };
  } catch (err) {
    throw new Response("Error", { status: 500 });
  }
}

export default function TransactionsPage({ loaderData }: Route.ComponentProps) {
  const { transactions } = loaderData;

  return (
    <div>
      <header>
        <h3>Transaction History</h3>
      </header>

      <div>
        <Suspense fallback={<TransactionTableFallback />}>
          <TransactionTable data={transactions} accountId={""} />
        </Suspense>
      </div>
    </div>
  );
}
