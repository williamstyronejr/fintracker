import { eq } from "drizzle-orm";
import type { Route } from "./+types/delete";
import { getAuth } from "@clerk/react-router/ssr.server";
import { z } from "zod";
import { db } from "~/lib/db";
import { Transactions } from "~/lib/schema";

export async function action(args: Route.ActionArgs) {
  const { id } = args.params;
  const user = await getAuth(args);

  // TODO: Veify transaction belongs to user

  try {
    await db.delete(Transactions).where(eq(Transactions.id, id));

    return { status: 200 };
  } catch (err) {
    console.log(err);
    return { status: 500 };
  }
}
