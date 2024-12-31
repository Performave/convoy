import { PaginatedResult } from '@/utils/http.ts'
import { TableOptions } from '@tanstack/react-table'

export interface UseDataTableProps<TData>
    extends Omit<
        TableOptions<TData>,
        | 'data'
        | 'state'
        | 'pageCount'
        | 'getCoreRowModel'
        | 'manualFiltering'
        | 'manualPagination'
        | 'manualSorting'
    > {
    data: TData[] | PaginatedResult<TData>

    /**
     * Defines filter fields for the table. Supports both dynamic faceted filters and search filters.
     * - Faceted filters are rendered when `options` are provided for a filter field.
     * - Otherwise, search filters are rendered.
     *
     * The indie filter field `value` represents the corresponding column name in the database table.
     * @default []
     * @type { label: string, value: keyof TData, placeholder?: string, options?: { label: string, value: string, icon?: React.ComponentType<{ className?: string }> }[] }[]
     * @example
     * ```ts
     * // Render a search filter
     * const filterFields = [
     *   { label: "Title", value: "title", placeholder: "Search titles" }
     * ];
     * // Render a faceted filter
     * const filterFields = [
     *   {
     *     label: "Status",
     *     value: "status",
     *     options: [
     *       { label: "Todo", value: "todo" },
     *       { label: "In Progress", value: "in-progress" },
     *     ]
     *   }
     * ];
     * ```
     */
    filterFields?: DataTableFilterField<TData>[]

    /**
     * Clear URL query key-value pair when state is set to default.
     * Keep URL meaning consistent when defaults change.
     * @default false
     */
    clearOnDefault?: boolean
}

export interface DataTableFilterField<TData> {
    id: Extract<keyof TData, string>
    label: string
    placeholder?: string
    options?: Option[]
}

export interface Option {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
    count?: number
}
