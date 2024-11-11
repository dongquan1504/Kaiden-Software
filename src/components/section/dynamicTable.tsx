/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import _uniq from "lodash/uniq"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectItem, SelectValue } from "../ui/select"

const rowPerPageItems = [
  {
    key: 5,
    name: "5 Rows"
  }, {
    key: 10,
    name: "10 Rows"
  }, {
    key: 20,
    name: "20 Rows"
  }
]

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
    service: "Landing Web",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
    service: "Website",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
    service: "Triple A Game",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
    service: "Indie Game",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
    service: "Landing Web",
  },
  {
    id: "x9v8y7z6",
    amount: 950,
    status: "processing",
    email: "john.doe@example.com",
    service: "Mobile App",
  },
  {
    id: "a1b2c3d4",
    amount: 1234,
    status: "success",
    email: "jane.doe@example.com",
    service: "E-commerce Website",
  },
  {
    id: "e5f6g7h8",
    amount: 567,
    status: "failed",
    email: "alice@example.com",
    service: "Blog Website",
  },
  {
    id: "i9j0k1l2",
    amount: 789,
    status: "processing",
    email: "bob@example.com",
    service: "Portfolio Website",
  },
  {
    id: "m3n4o5p6",
    amount: 432,
    status: "success",
    email: "charlie@example.com",
    service: "Social Media App",
  },
  {
    id: "q7r8s9t0",
    amount: 654,
    status: "failed",
    email: "dave@example.com",
    service: "CRM System",
  },
  {
    id: "u1v2w3x4",
    amount: 876,
    status: "processing",
    email: "eve@example.com",
    service: "ERP System",
  },
]

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  service: string
}

const renderFilter = (table: any, id: keyof Payment) =>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="ml-auto">
        <Filter />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      {_uniq(data.map((row) => row[id]))
        .map((row: any, index: any) => {
          const { columnFilters = [] } = table.getState();
          const checked = columnFilters.some((filter: any) => filter.value.includes(row));
          const columnFiltersValue = columnFilters?.find((i: any) => i.id === id)?.value || [];
          return (
            <DropdownMenuCheckboxItem
              key={row}
              className="capitalize"
              checked={checked}
              onCheckedChange={(value) =>
                // console.log(value)
                table.setColumnFilters([{
                  id: id, value: value ?
                    [...columnFiltersValue, row]
                    : columnFilters.splice(index, 1)
                }])
              }
            >
              {row}
            </DropdownMenuCheckboxItem>
          )
        })}
    </DropdownMenuContent>
  </DropdownMenu>

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "service",
    // enableColumnFilter: true,
    header: ({ table }) => {
      // console.log(column.getFilterValue())
      return (<div>
        Service {renderFilter(table, "service")}
      </div>
      )
    },
    filterFn: "arrIncludesSome",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("service")}</div>
    )
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      console.log(column)
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  console.log(columnFilters)
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, //initial page index
    pageSize: rowPerPageItems[0].key, //default page size
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      // columnFilters: [
      //   {
      //     id: 'service',
      //     value: 'Landing Web', // filter the name column by 'John' by default
      //   },
      // ],
      columnVisibility,
      rowSelection,
      pagination
    },
  })
  console.log(table)

  // React.useEffect(() => { table.setColumnFilters([{ id: "service", value: [] }]) }, [])

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex-1 text-sm text-muted-foreground">
          <Select onValueChange={(pageSize: string) => {
            setPagination({ pageIndex: 0, pageSize: parseFloat(pageSize) })
          }}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={`Select rows (${pagination.pageSize})`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {rowPerPageItems.map((i: any) => (
                  <SelectItem key={i.key} value={i.key}>{i.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagination({ ...pagination, pageIndex: pagination.pageIndex - 1 })}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagination({ ...pagination, pageIndex: pagination.pageIndex + 1 })}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
