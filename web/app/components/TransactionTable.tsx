import type { ColumnDef } from "@tanstack/react-table";
import { use } from "react";
import { formatCost } from "~/util";
import { DataTable } from "./ui/DataTable";

type Transactions = {
  id: string;
  title: string;
  amount: number;
  date: Date;
};

const columns: ColumnDef<Transactions>[] = [
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Date",
    accessorKey: "date",
    accessorFn: ({ date }) =>
      date.toLocaleDateString("en-US", {
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

export default function TransactionTable({ data }: { data: Promise<any[]> }) {
  const initialTransactions = use(data);

  return (
    <div>
      <div>
        <DataTable columns={columns} data={initialTransactions} />
      </div>
    </div>
  );
}
