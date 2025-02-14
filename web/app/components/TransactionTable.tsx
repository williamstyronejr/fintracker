import type { ColumnDef } from "@tanstack/react-table";
import { use } from "react";
import { formatCost } from "~/util";
import { DataTable } from "./ui/DataTable";

type Transactions = {
  id: string;
  title: string;
  amount: number;
  createdAt: Date;
};

const columns: ColumnDef<Transactions>[] = [
  {
    header: "id",
    accessorKey: "id",
    enableHiding: true,
  },
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Date",
    accessorKey: "createdAt",
    accessorFn: ({ createdAt }) =>
      createdAt.toLocaleDateString("en-US", {
        day: "2-digit",
        year: "numeric",
        month: "short",
      }),
  },
  {
    header: "Amount",
    accessorKey: "amount",
    accessorFn: (row) => formatCost(row.amount),
  },
];

export function TransactionTableFallback() {
  return <div>loading....</div>;
}

export default function TransactionTable({
  data,
  accountId,
}: {
  data: Promise<any[]>;
  accountId?: string;
}) {
  const initialTransactions = use(data);

  return (
    <div>
      <div>
        <DataTable columns={columns} data={initialTransactions} />
      </div>
    </div>
  );
}
