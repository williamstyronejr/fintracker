import {
  Column,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  useTableData,
} from "~/components/shared/Table";

function TransactionsTableRows({ rows }: { rows: any[] }) {
  if (!rows.length)
    return (
      <TableRow>
        <TableCell>No Transactions on record</TableCell>
      </TableRow>
    );

  return rows.map((row) => (
    <TableRow key={``}>
      {row.getCell.map((cell: any) => (
        <TableCell key={``}>{cell}</TableCell>
      ))}
    </TableRow>
  ));
}

export default function TransactionsPage() {
  const data = [];

  const columns: Column[] = [];

  const table = useTableData({
    data,
    columns,
  });

  return (
    <div>
      <div>tranactions</div>

      <Table>
        <TableHeader>
          <TableRow>
            {table.getHeaders().map((header) => (
              <TableHead key={`table-${header}`}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          <TransactionsTableRows rows={table.getRows()} />
        </TableBody>
      </Table>
    </div>
  );
}
