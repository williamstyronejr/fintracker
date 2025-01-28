import { getAuth } from "@clerk/react-router/ssr.server";
import { z } from "zod";

import type { Route } from "./+types/edit";
import { data } from "react-router";
import { db } from "~/lib/db";
import { Transactions } from "~/lib/schema";
import { eq } from "drizzle-orm";

export async function action(args: Route.ActionArgs) {
  const user = await getAuth(args);
  const formData = await args.request.formData();

  const userData = Object.fromEntries(formData.entries());

  // TODO: vefity user is able to make request

  const schema = z.object({
    title: z.string(),
    amount: z.string(),
    transaction: z.string(),
  });

  const result = schema.safeParse(userData);

  if (!result.success) return { status: 400 };

  try {
    await db
      .update(Transactions)
      .set({
        title: result.data.title,
        amount: result.data.amount,
      })
      .where(eq(Transactions.id, result.data.transaction));
  } catch (err) {
    return data(null, { status: 500 });
  }
}
