import type { Route } from "./+types/create";
import { getAuth } from "@clerk/react-router/ssr.server";
import { z } from "zod";
import { db } from "~/lib/db";
import { Transactions } from "~/lib/schema";

export async function action(args: Route.ActionArgs) {
  const user = await getAuth(args);
  const formData = await args.request.formData();

  const data = Object.fromEntries(formData.entries());
  const schema = z.object({
    title: z.string(),
    amount: z.string(),
    account: z.string(),
  });

  const result = schema.safeParse(data);

  if (!result.success) return { status: 400, body: result.error };

  await db.insert(Transactions).values({
    title: result.data.title,
    amount: result.data.amount,
    type: "payment",
    accountId: result.data.account,
    userId: user.userId as string,
  });

  return { status: 200 };
}
