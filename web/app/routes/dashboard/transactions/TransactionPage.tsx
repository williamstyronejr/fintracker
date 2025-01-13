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

export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;

  return {
    id,
    title: "test",
    amount: 123,
    type: "payment",

    date: new Date(),
  };
}

export default function TransactionPage({ loaderData }: Route.ComponentProps) {
  const transaction = loaderData;

  return (
    <div>
      <header className="flex flex-row flex-nowrap items-center justify-between">
        <h3 className="font-semibold text-xl">Transaction Detail</h3>

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
              <div className="flex flex-row flex-nowrap items-center hover:cursor-pointer hover:bg-slate-400/10 px-2">
                <Edit className="w-5 h-5" />
                <div className="ml-2">Edit</div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem>
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
                {transaction.date.toLocaleDateString("en-US", {
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
