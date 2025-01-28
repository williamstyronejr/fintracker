import Printer from "~/components/icons/Printer";
import type { Route } from "./+types/TransactionPage";
import { formatCost } from "~/util";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import CogWheel from "~/components/icons/CogWheel";
import Trash from "~/components/icons/Trash";
import Edit from "~/components/icons/Edit";
import ConfirmButton from "~/components/ConfirmButton";
import { data, Link, useFetcher } from "react-router";
import { eq } from "drizzle-orm";
import { Transactions } from "~/lib/schema";
import { db } from "~/lib/db";
import { useState } from "react";
import EditTransaction from "~/components/EditTransaction";
import { DialogContent, Dialog } from "~/components/ui/dialog";
import Arrow from "~/components/icons/Arrow";

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;

  const transaction = await db.query.Transactions.findFirst({
    where: eq(Transactions.id, id),
  });

  if (!transaction) throw data(null, { status: 404 });

  return transaction;
}

function DeleteModal({
  id,
  visible,
  onClose,
}: {
  id: string;
  visible: boolean;
  onClose: () => void;
}) {
  const fetcher = useFetcher();

  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent>
        <div>
          <h3>Confirmation</h3>
          <p>Are you sure you want to delete this transactions?</p>

          <div className="flex flex-row flex-nowrap justify-between gap-4">
            <fetcher.Form
              action={`/api/transactions/${id}/delete`}
              method="post"
            >
              <button type="submit">Confirm</button>

              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </fetcher.Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function TransactionPage({ loaderData }: Route.ComponentProps) {
  const [editing, setEditing] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const fetcher = useFetcher();
  const transaction = loaderData;

  console.log({ editing });

  return (
    <div>
      <Link
        className="flex flex-row flex-nowrap items-center text-slate-500 py-2 text-sm hover:text-slate-900 stroke-slate-500  hover:stroke-slate-900"
        to={`/dashboard/accounts/${transaction.accountId}`}
      >
        <Arrow className="w-4 h-4 mr-1" />
        Back
      </Link>
      <header className="flex flex-row flex-nowrap items-center justify-between">
        <h3 className="font-semibold text-xl">Transaction Detail</h3>

        <EditTransaction
          transaction={transaction}
          visible={editing}
          onClose={() => setEditing(false)}
        />

        <DeleteModal
          id={transaction.id}
          visible={deleteModal}
          onClose={() => setDeleteModal(false)}
        />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <CogWheel />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side={"left"}
            className="mt-12 bg-white shadow-lg rounded-md py-2 flex flex-col flex-nowrap gap-4"
          >
            <DropdownMenuItem>
              <div className="flex flex-row flex-nowrap items-center hover:cursor-pointer hover:bg-slate-400/10 px-2">
                <Printer className="w-5 h-5" />
                <div className="ml-2">Print</div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <button
                type="button"
                onClick={() => setEditing((old) => !old)}
                className="flex flex-row flex-nowrap items-center hover:cursor-pointer hover:bg-slate-400/10 px-2"
              >
                <Edit className="w-5 h-5" />
                <div className="ml-2">Edit</div>
              </button>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setDeleteModal(true)}>
              <div className="flex flex-row flex-nowrap items-center hover:cursor-pointer hover:bg-slate-400/10 px-2">
                <Trash className="w-5 h-5" />
                <div className="ml-2">Delete</div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="">
        <div className="flex flex-col flex-nowrap justify-center items-center pb-8">
          <div
            className={`text-6xl py-8 font-bold ${
              transaction.type === "payment" ? "text-red-500" : "text-green-500"
            }`}
          >
            {formatCost(transaction.amount)}
          </div>

          <div className="">
            <span>Payment made to</span>
          </div>

          <div className="text-xl py-2">{transaction.title}</div>
        </div>

        <div className="">
          <table className="w-full">
            <tr>
              <td>Date </td>
              <td>
                {transaction.createdAt.toLocaleDateString("en-US", {
                  day: "2-digit",
                  year: "numeric",
                  month: "short",
                })}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
