import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/ui/DataTable";
import { formatCost } from "~/util";

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

export default function TransactionsPage() {
  const data = [
    {
      id: "123",
      title: "UberEats",
      amount: 22,
      date: new Date(),
    },
  ];

  return (
    <div>
      <header>
        <h3>Transaction History</h3>
      </header>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
