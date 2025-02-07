import { getAuth } from "@clerk/react-router/ssr.server";
import type { Route } from "./+types/shareable";
import { db } from "~/lib/db";
import { PublicLinks } from "~/lib/schema";
import { data } from "react-router";

export async function action(args: Route.ActionArgs) {
  const user = await getAuth(args);
  const { id } = args.params;

  // TODO: Verift user

  try {
    const link = await db
      .insert(PublicLinks)
      .values({
        accountId: id,
      })
      .returning();

    return {
      link: link[0].id,
    };
  } catch (err) {
    return data(null, { status: 500 });
  }
}
