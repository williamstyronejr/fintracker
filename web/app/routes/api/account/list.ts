import { getAuth } from "@clerk/react-router/ssr.server";
import type { Route } from "./+types/list";
import { redirect } from "react-router";
import { db } from "~/lib/db";
import { Accounts } from "~/lib/schema";
import { eq } from "drizzle-orm";

export async function loader(args: Route.LoaderArgs) {
  const user = await getAuth(args);
  console.log("hrbehbrjabhehrjbej");
  if (!user.userId) return redirect("/signin");

  try {
    const accounts = await db
      .select()
      .from(Accounts)
      .where(eq(Accounts.userId, user.userId));

    return { accounts };
  } catch (err) {
    throw new Response("", { status: 500 });
  }
}
