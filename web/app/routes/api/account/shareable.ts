import { getAuth } from "@clerk/react-router/ssr.server";
import { data } from "react-router";
import { eq } from "drizzle-orm";
import { PublicLinks } from "~/lib/schema";
import { db } from "~/lib/db";

import type { Route } from "./+types/shareable";

export async function action(args: Route.ActionArgs) {
  const user = await getAuth(args);
  const { id } = args.params;

  // TODO: Verift user

  try {
    await db
      .update(PublicLinks)
      .set({ active: false })
      .where(eq(PublicLinks.accountId, id));

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
