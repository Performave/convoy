'use client'

import { IconX } from '@tabler/icons-react'
import { Table } from '@tanstack/react-table'
import { ChangeEventHandler } from 'react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

import DataTableFacetedFilter, {
    FacetedFilterOption,
} from './DataTableFacetedFilter.tsx'
import DataTableViewOptions from './DataTableViewOptions'

export interface FilterConfig {
    columnId: string
    title: string
    options: FacetedFilterOption[]
}

interface DataTableToolbarProps<TData> {
    table: Table<TData>
    filters?: FilterConfig[]
    searchableColumn?: Extract<keyof TData, string>
    globalSearch?: boolean
}

const DataTableToolbar = <TData,>({
    table,
    filters = [],
    searchableColumn,
    globalSearch,
}: DataTableToolbarProps<TData>) => {
    const isFiltered = table.getState().columnFilters.length > 0
    const value = globalSearch
        ? (table.getState().globalFilter as string)
        : searchableColumn
          ? (table.getColumn(searchableColumn)?.getFilterValue() as string)
          : null

    const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
        if (globalSearch) {
            table.setGlobalFilter(e.target.value)
        } else if (searchableColumn) {
            table.getColumn(searchableColumn)?.setFilterValue(e.target.value)
        }
    }

    return (
        <div className='flex items-center justify-between'>
            <div className='flex flex-1 items-center space-x-2'>
                {(searchableColumn || globalSearch) && (
                    <Input
                        placeholder='Search...'
                        value={value ?? ''}
                        onChange={handleChange}
                        className='h-8 w-[150px] bg-background lg:w-[250px]'
                    />
                )}
                {filters.map(({ columnId, title, options }) => {
                    const column = table.getColumn(columnId)
                    if (!column) return null

                    return (
                        <DataTableFacetedFilter
                            key={columnId}
                            column={column}
                            title={title}
                            options={options}
                        />
                    )
                })}
                {isFiltered && (
                    <Button
                        variant='ghost'
                        onClick={() => table.resetColumnFilters()}
                        className='h-8 px-2 lg:px-3'
                    >
                        Reset
                        <IconX className={'ml-2 size-4'} />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    )
}

export default DataTableToolbar
