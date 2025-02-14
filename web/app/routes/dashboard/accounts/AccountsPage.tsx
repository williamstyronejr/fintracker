import { Link } from "react-router";
import { z } from "zod";
import { getAuth } from "@clerk/react-router/ssr.server";
import {
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "~/components/ui/dialog";
import { formatCost } from "~/util";
import Input from "~/components/Input";
import { db } from "~/lib/db";
import { Accounts } from "~/lib/schema";
import FormModal from "~/components/FormModal";

import type { Route } from "./+types/AccountsPage";

export async function action(args: Route.ActionArgs) {
  const user = await getAuth(args);
  let formData = await args.request.formData();

  const data = Object.fromEntries(formData.entries());

  const schema = z.object({
    title: z.string(),
    nickname: z.string(),
  });

  const result = schema.safeParse(data);

  if (!result.success) return { status: 400, body: result.error };

  await db.insert(Accounts).values({
    title: result.data.title,
    nickname: result.data.nickname,
    userId: user.userId as string,
  });

  return {};
}

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;

  const accounts = await db.select().from(Accounts);

  return { accounts };
}

function CreateAccountModal() {
  return (
    <FormModal
      method="post"
      action="/api/account/create"
      button="New"
      successMessage="Created"
    >
      <DialogHeader>
        <DialogTitle>New Account</DialogTitle>

        <DialogDescription>
          <Input name="title" label="Title" type="text" />
          <Input name="nickname" label="Nickname" type="text" />
        </DialogDescription>

        <DialogFooter>
          <button type="submit" className="px-2 py-1 rounded-md">
            Create
          </button>
        </DialogFooter>
      </DialogHeader>
    </FormModal>
  );
}

export default function AccountsPage({ loaderData }: Route.ComponentProps) {
  const { accounts } = loaderData;

  return (
    <div>
      <header className="flex flex-row flex-nowrap justify-between">
        <h3>Accounts</h3>

        <CreateAccountModal />
      </header>

      <div className="flex flex-col flex-nowrap gap-4">
        {accounts.map((acct) => (
          <Link
            className="rounded-lg shadow-lg px-4 py-2"
            key={`accounts-${acct.id}`}
            to={`/dashboard/accounts/${acct.id}`}
          >
            <div className="flex flex-row flex-nowrap justify-between">
              <div className="">
                <h3 className="font-semibold text-xl pb-2">
                  {acct.nickname || acct.title}
                </h3>
                <div className="text-sm text-slate-700">
                  {acct.nickname ? acct.title : ""}
                </div>
              </div>

              <div className="">{formatCost(acct.balance)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
