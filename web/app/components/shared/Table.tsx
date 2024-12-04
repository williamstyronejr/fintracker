import { ReactNode, useState } from "react";

export type Column = {
  id: string;
  header?: () => ReactNode;
  cell: ({ value }: { value: any }) => ReactNode;
  sorting?: boolean;
  hiding?: boolean;
};

type ColumnFilter = {
  id: string;
  value: string | number;
};

export function useTableData({
  columns,
  data,
}: {
  columns: Column[];
  data: any[];
}) {
  const [filters, setFilters] = useState<ColumnFilter[]>([]);

  const setFilter = ({ id, value }: { id: string; value: string | number }) => {
    setFilters((old) => {
      let updated = false;
      const newItems = old.map((oldItem) => {
        if (oldItem.id === id) {
          updated = true;
          return {
            id,
            value,
          };
        }

        return oldItem;
      });

      return updated
        ? newItems
        : [
            ...old,
            {
              id,
              value,
            },
          ];
    });
  };

  const getFilterValue = (column: string) => {
    for (let idx in filters) {
      if (filters[idx].id === column) return filters[idx].value;
    }

    return null;
  };

  const getHeaders = () => {
    return columns.map((cols) => (cols.header ? cols.header() : null));
  };

  const getRows = () => {
    return data
      .filter((item) => {
        if (filters.length === 0) return true;

        for (let idx in filters) {
          if (
            typeof item[filters[idx].id] === "string" &&
            item[filters[idx].id].includes(filters[idx].value)
          )
            return true;
        }

        return false;
      })
      .map((item) => ({
        getCells: () =>
          columns.map(({ id, cell }) => cell({ value: item[id] })),
      }));
  };

  return {
    getHeaders,
    getRows,
    setFilter,
    getFilterValue,
  };
}

export function TableHead({ ...props }) {
  return (
    <th className="h-10 px-2 text-left align-middle font-medium" {...props} />
  );
}

export function TableRow({ ...props }) {
  return <tr className="border-b transition-colors" {...props} />;
}

export function TableHeader({ ...props }) {
  return <thead className="" {...props} />;
}

export function Table({ ...props }) {
  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full text-sm" {...props} />
    </div>
  );
}

export function TableBody({ ...props }) {
  return <tbody className="[&_tr:last-child]:border-0" {...props} />;
}

export function TableCell({ ...props }) {
  return <td className="p-2 align-middle " {...props} />;
}
