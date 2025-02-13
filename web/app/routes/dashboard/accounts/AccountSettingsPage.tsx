import type React from "react";
import { Link, useFetcher } from "react-router";
import type { Route } from "./+types/AccountSettingsPage";
import Input from "~/components/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import ConfirmationButton from "~/components/ConfirmationButton";
import FormModal from "~/components/FormModal";
import { useEffect } from "react";
import { useNotificationContext } from "~/hooks/NotificationContext";
import { getAuth } from "@clerk/react-router/ssr.server";
import { db } from "~/lib/db";
import { Accounts, PublicLinks } from "~/lib/schema";
import { and, eq } from "drizzle-orm";

export async function loader(args: Route.LoaderArgs) {
  const user = await getAuth(args);
  const { id } = args.params;

  // TODO: make sure user is verified

  try {
    const [account, publicLink] = await Promise.all([
      db.query.Accounts.findFirst({
        where: eq(Accounts.id, id),
      }),
      db.query.PublicLinks.findFirst({
        where: and(eq(PublicLinks.accountId, id), eq(PublicLinks.active, true)),
      }),
    ]);

    const link = publicLink ? `/a/${publicLink.id}` : publicLink;

    return { account, link };
  } catch (err) {
    // TODO: handle account not existing
    return {};
  }
}

function EditAccount({
  id,
  initTitle,
  initNickname,
}: {
  id: string;
  initTitle: string;
  initNickname: string;
}) {
  const fetcher = useFetcher();
  const { addNotification } = useNotificationContext();

  useEffect(() => {
    if (fetcher.data !== undefined) addNotification("Successfully created");
  }, [fetcher.data]);

  return (
    <div className="border border-slate-300 rounded-md shadow-lg">
      <fetcher.Form action={`/api/account/${id}/edit`} method="POST">
        <div className="px-4 py-4">
          <h3 className="font-bold text-2xl py-2 text-black">Edit Name</h3>
          <div>Edit the name and nickname of your account.</div>

          <div className="py-2">
            <Input
              type="text"
              name="title"
              placeholder="Account Name"
              label="Account Name"
              initialValue={initTitle}
            />

            <Input
              type="text"
              name="nickname"
              placeholder="Account Nickname"
              label="Nickname"
              initialValue={initNickname}
            />
          </div>
        </div>

        <div className="bg-slate-100 px-4 text-right py-2">
          <button
            className="px-2 py-1 bg-black hover:bg-slate-700 text-white rounded-md transition-colors "
            type="submit"
            disabled={fetcher.state !== "idle"}
          >
            Save
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
}

function CreateShareable({
  id,
  existingLink,
}: {
  id: string;
  existingLink?: string;
}) {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data !== undefined) {
    }
  }, [fetcher.data]);

  return (
    <div className="border border-slate-300 rounded-md shadow-lg">
      <fetcher.Form action={`/api/account/${id}/share`} method="post">
        <div className="px-4 py-4">
          <h3 className="font-bold text-2xl py-2 text-black">Shareable Link</h3>
          <div>
            Creates a public link for this account. Please note that your
            previous link will be deleted.
          </div>

          <div className="pt-4">
            {existingLink ? (
              <div className="flex flex-row flex-nowrap items-center border border-slate-300 rounded px-4 py-2">
                <div className="grow mr-4">{existingLink}</div>

                <button
                  className="px-2 py-1 bg-black hover:bg-slate-700 text-white rounded-md transition-colors"
                  type="button"
                  onClick={() => navigator.clipboard.writeText(existingLink)}
                >
                  Copy
                </button>
              </div>
            ) : (
              <div className="border border-slate-300 rounded px-4 py-2 text-slate-500">
                No Current Link
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-100 px-4 text-right py-2">
          <button
            className="px-2 py-1 bg-black hover:bg-slate-700 text-white rounded-md transition-colors "
            type="submit"
            disabled={fetcher.state !== "idle"}
          >
            Create Link
          </button>
        </div>
      </fetcher.Form>
    </div>
  );
}

export default function AccountSettingsPage({
  params,
  loaderData,
}: Route.ComponentProps) {
  const { id } = params;
  const { account, link } = loaderData;

  return (
    <div>
      <div>
        <Link
          className="text-sm text-slate-500 hover:text-black"
          to={`/dashboard/accounts/${id}`}
        >
          Go Back
        </Link>

        <h3 className="font-bold text-xl pt-1 pb-3">Settings</h3>
      </div>

      <div className="flex flex-col gap-8">
        <EditAccount
          id={id}
          initTitle={account?.title}
          initNickname={account?.nickname}
        />

        <div className="border border-slate-300 rounded-md shadow-lg">
          <div className="px-4 py-4">
            <h3 className="font-bold text-2xl py-2 text-black">
              Export Account Data
            </h3>
            <div>
              Export your account data including all transactions, recurring
              payments, and current balance into you selected format.
            </div>
          </div>

          <div className="flex flex-row flex-nowrap justify-between bg-slate-100 px-4 text-right py-2">
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="File Format" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>

            <button
              className="px-2 py-1 bg-black hover:bg-slate-700 text-white rounded-md transition-colors "
              type="button"
            >
              Delete Account
            </button>
          </div>
        </div>

        <CreateShareable id={id} existingLink={link} />

        <div className="border border-slate-300 rounded-md shadow-lg">
          <div className="px-4 py-4">
            <h3 className="font-bold text-2xl py-2 text-red-500">
              Delete Transactions
            </h3>
            <div>Delete transactions within a specific range of time.</div>
          </div>

          <div className="flex flex-row flex-nowrap justify-end bg-red-100/40 px-4 text-right py-2">
            <FormModal
              button="Delete Transaction"
              action={`/api/account/${id}/transactions/delete`}
              className="px-2 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md transition-colors "
            >
              <div>
                <div className="text-lg font-semibold">Select Time Frame</div>

                <Select name="time">
                  <SelectTrigger className="w-[280-px]">
                    <SelectValue placeholder="Time From Today" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="1">24 Hours</SelectItem>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="365">1 Year</SelectItem>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className=" py-2 text-right">
                <button
                  className="border rounded-md bg-black text-white hover:bg-slate-700 px-4 py-1"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </FormModal>
          </div>
        </div>

        <div className="border border-slate-300 rounded-md shadow-lg">
          <div className="px-4 py-4">
            <h3 className="font-bold text-2xl py-2 text-red-500">
              Delete Account
            </h3>
            <div>
              Permanently delete your account and all of its content. As this
              action is not reversible you will be asked to confirm the request.
            </div>
          </div>

          <div className="bg-red-100/40 px-4 text-right py-2">
            <ConfirmationButton
              action={`/api/account/${id}/delete`}
              confirmText={`Are you sure you want to delete this account. All data related to this account will also be deleted.`}
            >
              <div className="px-2 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md transition-colors ">
                Delete Account
              </div>
            </ConfirmationButton>
          </div>
        </div>
      </div>
    </div>
  );
}
