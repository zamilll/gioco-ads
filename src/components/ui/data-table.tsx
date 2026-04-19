import * as React from "react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  align?: "start" | "end";
  render: (row: T) => React.ReactNode;
  className?: string;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
}: {
  columns: Column<T>[];
  data: T[];
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "border-b border-line px-[14px] py-[10px] text-[11.5px] font-medium uppercase tracking-[0.06em] text-ink-3",
                  col.align === "end" ? "text-end" : "text-start",
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="transition-colors hover:bg-bg/60"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    "border-b border-line px-[14px] py-[12px] align-middle text-[13px]",
                    col.align === "end" ? "text-end" : "text-start",
                    col.className,
                  )}
                >
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
