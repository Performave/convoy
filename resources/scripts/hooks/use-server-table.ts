import useQueryState from '@/hooks/use-query-state.ts'
import useTransientValue from '@/hooks/use-transient-value.ts'
import { UseDataTableProps } from '@/types/data-table.ts'
import {
    ColumnFiltersState,
    PaginationState,
    SortingState,
    Updater,
    VisibilityState,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

const useServerTable = <TData>({
    data,
    ...props
}: UseDataTableProps<TData>) => {
    const [paginationState, setPaginationState] = useQueryState({
        page: 1,
        perPage: 25,
    })
    const [sorting, setSorting] = useState<SortingState>([])
    const [rowSelection, setRowSelection] = useState({})
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    )
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const resolvedData = Array.isArray(data) ? data : data.items
    const pageCount =
        useTransientValue(
            !Array.isArray(data) ? data.pagination.totalPages : null
        ) ?? -1

    const pagination: PaginationState = {
        pageIndex: paginationState.page - 1,
        pageSize: paginationState.perPage,
    }

    const onPaginationChange = (updaterOrValue: Updater<PaginationState>) => {
        const updatedPagination =
            updaterOrValue instanceof Function
                ? updaterOrValue(pagination!)
                : updaterOrValue

        setPaginationState(prev => ({
            ...prev,
            page: updatedPagination.pageIndex + 1,
            perPage: updatedPagination.pageSize,
        }))
    }

    const table = useReactTable({
        ...props,
        data: resolvedData,
        pageCount,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        getCoreRowModel: getCoreRowModel(),
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange,
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
    })
}

export default useServerTable
