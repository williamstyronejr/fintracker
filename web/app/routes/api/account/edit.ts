import { getAuth } from "@clerk/react-router/ssr.server";
import type { Route } from "./+types/edit";
import { data } from "react-router";
import { z } from "zod";
import { db } from "~/lib/db";
import { Accounts } from "~/lib/schema";
import { ConsoleLogWriter, eq } from "drizzle-orm";

export async function action(args: Route.ActionArgs) {
  const user = await getAuth(args);
  const { id } = args.params;
  // TODO: Check user cna make request

  try {
    const userInput = await args.request.formData();
    const schema = z.object({
      title: z.string().optional(),
      nickname: z.string().optional(),
    });

    const result = schema.safeParse(Object.fromEntries(userInput.entries()));

    if (!result.success) return data(result.error, { status: 400 });

    const updatedData: { title?: string; nickname?: string } = {};
    if (result.data.title) updatedData.title = result.data.title;
    if (result.data.nickname) updatedData.nickname = result.data.nickname;

    await db.update(Accounts).set(updatedData).where(eq(Accounts.id, id));

    return data({ success: true });
  } catch (err) {
    console.log(err);
    return data(null, { status: 500 });
  }
}
