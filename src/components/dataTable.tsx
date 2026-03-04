import { useEffect, useState } from "react";
import SearchInput from "@/components/searchinput";
import Pagination from "@/components/pagination";
import { CircleChevronDown, CircleChevronUp } from "lucide-react";
import { Column, DataTableProps } from "@/types/table";
import useTableData from "@/hooks/useTableData";

function DataTable<T>({
  data,
  columns,
  rowsPerPage = 5,
  hasSearch = true,
  hasPagination = true,
  children,
  loading = false,
}: DataTableProps<T>) {
  const [search, setSearch] = useState<string>("");
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { paginated, totalPages } = useTableData<T>({
    data,
    columns,
    search,
    sortField: sortField ?? undefined,
    sortOrder,
    currentPage,
    rowsPerPage,
  });

  const updatedColumns: Column<T>[] = columns.map((col) => ({
    ...col,
    visible: col.visible !== false,
  }));

  useEffect(() => {
    setTimeout(() => setCurrentPage(1), 0);
  }, [data]);

  const handleSort = (accessor: keyof T) => {
    if (sortField === accessor) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(accessor);
      setSortOrder("asc");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.startsWith(" ")) {
      setSearch(value);
      setCurrentPage(1);
    }
  };

  return (
    <div>
      {hasSearch && (
        <SearchInput
          className="m-0 w-1/3"
          searchValue={search}
          onChange={handleChange}
        />
      )}
      {children && <div>{children}</div>}

      <div className="overflow-y-auto relative mt-3">
        <table className="w-full border-collapse border-spacing-0">
          <thead>
            <tr>
              {updatedColumns.map(
                (col) =>
                  col.visible && (
                    <th
                      key={String(col.accessor)}
                      onClick={() => handleSort(col.accessor as keyof T)}
                      style={{ cursor: "pointer", width: col.width }}
                      className={`px-1 py-2 text-[15px] border-b border-gray-300 bg-blue-100 text-blue-900! sticky top-0`}
                    >
                      <div
                        className={`flex items-center ${
                          col.className === "text-center"
                            ? "justify-center"
                            : col.className === "text-right"
                              ? "justify-end"
                              : "justify-start"
                        }`}
                      >
                        {col.label}
                        {sortField === col.accessor ? (
                          sortOrder === "asc" ? (
                            <CircleChevronUp className="w-4 h-4 ml-2" />
                          ) : (
                            <CircleChevronDown className="w-4 h-4 ml-2" />
                          )
                        ) : (
                          ""
                        )}
                      </div>
                    </th>
                  ),
              )}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              paginated.map((row, idx) => (
                <tr key={idx}>
                  {updatedColumns.map(
                    (col) =>
                      col.visible && (
                        <td
                          key={String(col.accessor)}
                          className={`px-1 py-3 border-b border-gray-300 ${col.className}`}
                        >
                          {col.render
                            ? col.render(row, idx, currentPage, rowsPerPage)
                            : col.accessor === "stt"
                              ? (currentPage - 1) * rowsPerPage + idx + 1
                              : (row[
                                  col.accessor as keyof T
                                ] as unknown as React.ReactNode)}
                        </td>
                      ),
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="text-center bg-gray-100"
                  colSpan={columns.length}
                >
                  {loading ? "Đang load dữ liệu..." : "Không có dữ liệu"}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {hasPagination && (
          <Pagination
            currentPage={currentPage}
            totalPage={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

export default DataTable;
