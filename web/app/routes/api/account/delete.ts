import { getAuth } from "@clerk/react-router/ssr.server";
import { data, redirect } from "react-router";
import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { Accounts } from "~/lib/schema";

import type { Route } from "./+types/delete";

export async function action(args: Route.ActionArgs) {
  const user = await getAuth(args);
  const { id } = args.params;

  // TODO: verfiy user

  try {
    await db.delete(Accounts).where(eq(Accounts.id, id));

    return redirect("/dashboard/accounts");
  } catch (err) {
    data(null, { status: 500 });
  }
}
