import { useControllableState } from '@/hooks/use-controllable-state.ts'
import useTransientValue from '@/hooks/use-transient-value.ts'
import { PaginatedResult } from '@/utils/http.ts'
import {
    ColumnDef,
    ColumnFiltersState,
    PaginationOptions,
    PaginationState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/Table'

import DataTablePagination from './DataTablePagination'
import DataTableToolbar, { FilterConfig } from './DataTableToolbar.tsx'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[] | PaginatedResult<TData>
    query?: string
    setQuery?: (query: string) => void
    pagination?: PaginationState
    onPaginationChange?: PaginationOptions['onPaginationChange']
    pageSizeOptions?: number[]
    showPageSizeOptions?: boolean
    filters?: FilterConfig[]
    searchableColumn?: Extract<keyof TData, string>
    toolbar?: boolean
    paginated?: boolean
    manual?: boolean
}

const DataTable = <TData, TValue>({
    columns,
    data,
    query,
    setQuery,
    pagination: _pagination,
    onPaginationChange: _onPaginationChange,
    pageSizeOptions,
    showPageSizeOptions,
    filters,
    searchableColumn,
    toolbar,
    paginated,
    manual = true,
}: DataTableProps<TData, TValue>) => {
    const [pagination, setPagination] = useControllableState({
        prop: _pagination,
        defaultProp: {
            pageIndex: 1,
            pageSize: 50,
        },
        onChange: _onPaginationChange,
    })

    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [sorting, setSorting] = React.useState<SortingState>([])
    const resolvedData = Array.isArray(data) ? data : data.items
    const endpointPaginationMeta = useTransientValue(
        !Array.isArray(data) ? data.pagination : null
    )

    const handlePaginationChange: PaginationOptions['onPaginationChange'] =
        updateOrValue => {
            const updatedPagination =
                updateOrValue instanceof Function
                    ? updateOrValue(pagination!)
                    : updateOrValue
            setPagination(updatedPagination)
        }

    const table = useReactTable({
        data: resolvedData,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            globalFilter: query,
            pagination,
        },
        autoResetPageIndex: true,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setQuery,
        onPaginationChange: handlePaginationChange,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        pageCount: endpointPaginationMeta?.totalPages,

        manualPagination: manual,
        manualFiltering: manual,
        manualSorting: manual,
    })

    return (
        <div className='space-y-4'>
            {toolbar && (
                <DataTableToolbar
                    filters={filters}
                    searchableColumn={searchableColumn}
                    table={table}
                />
            )}
            <div className='rounded-md border bg-background'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
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
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map(cell => (
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
                                    className='h-24 text-center'
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {paginated && (
                <DataTablePagination
                    table={table}
                    pageSizeOptions={pageSizeOptions}
                    showPageSizeOptions={showPageSizeOptions}
                />
            )}
        </div>
    )
}

export default DataTable
