import { z } from "zod";
import { and, eq, gte } from "drizzle-orm";
import { getAuth } from "@clerk/react-router/ssr.server";
import { db } from "~/lib/db";
import { Transactions } from "~/lib/schema";

import type { Route } from "./+types/delete-transactions";
import { data } from "react-router";

const TIME_OPTIONS = z.enum(["all", "365", "30", "7", "1"]);

export async function action(args: Route.ActionArgs) {
  const user = await getAuth(args);
  const { id } = args.params;

  // TODO: Veify transaction belongs to user

  const formData = await args.request.formData();
  const input = Object.fromEntries(formData.entries());

  const schema = z.object({ time: TIME_OPTIONS });

  const result = schema.safeParse(input);
  if (!result.success) return data(result.error, { status: 400 });

  try {
    await db
      .delete(Transactions)
      .where(
        result.data.time === "all"
          ? eq(Transactions.accountId, id)
          : and(
              eq(Transactions.accountId, id),
              gte(
                Transactions.createdAt,
                new Date(
                  Date.now() - 1000 * 60 * 60 * 24 * parseInt(result.data.time)
                )
              )
            )
      );

    return data({ success: true }, { status: 200 });
  } catch (err) {
    return data(null, { status: 500 });
  }
}
