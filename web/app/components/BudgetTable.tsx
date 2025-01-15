import type { ColumnDef } from "@tanstack/react-table";
import { use } from "react";
import { DataTable } from "./ui/DataTable";

type Category = {
  id: string;
  name: string;
  reserved: number;
  total: number;
};

const columns: ColumnDef<Category>[] = [
  {
    header: "Category",
    accessorKey: "name",
  },
  {
    header: "Budgeted",
    accessorKey: "reserved",
  },
  {
    header: "Spent",
    accessorKey: "total",
  },
];

export function BudgetTableFallback() {
  return <div>loading ....</div>;
}

export default function BudgetTable({ data }: { data: Promise<any> }) {
  const initData = use(data);

  return (
    <div>
      <DataTable columns={columns} data={initData} />
    </div>
  );
}
