import { getAuth } from "@clerk/react-router/ssr.server";
import { db } from "~/lib/db";
import { z } from "zod";
import { Accounts } from "~/lib/schema";
import { data } from "react-router";

import type { Route } from "./+types/create";

export async function action(args: Route.ActionArgs) {
  const user = await getAuth(args);
  let formData = await args.request.formData();

  // TODO: verify user

  const userData = Object.fromEntries(formData.entries());

  const schema = z.object({
    title: z.string(),
    nickname: z.string(),
  });

  const result = schema.safeParse(userData);

  if (!result.success) return { status: 400, body: result.error };

  try {
    await db.insert(Accounts).values({
      title: result.data.title,
      nickname: result.data.nickname,
      userId: user.userId as string,
    });

    return data({ success: true });
  } catch (err) {
    return data(null, { status: 500 });
  }
}
