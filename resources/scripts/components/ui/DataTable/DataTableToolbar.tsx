import { DataTableFilterField } from '@/types/data-table.ts'
import { IconX } from '@tabler/icons-react'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

import DataTableFacetedFilter from './DataTableFacetedFilter.tsx'
import DataTableViewOptions from './DataTableViewOptions'

interface DataTableToolbarProps<TData> {
    table: Table<TData>
    filterFields?: DataTableFilterField<TData>[]
    searchable?: boolean
}

const DataTableToolbar = <TData,>({
    table,
    filterFields = [],
    searchable,
}: DataTableToolbarProps<TData>) => {
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className='flex items-center justify-between'>
            <div className='flex flex-1 items-center space-x-2'>
                {searchable && (
                    <Input
                        placeholder='Search...'
                        value={table.getState().globalFilter ?? ''}
                        onChange={e => table.setGlobalFilter(e.target.value)}
                        className='h-8 w-[150px] bg-background lg:w-[250px]'
                    />
                )}
                {filterFields.map(({ id, label, options }) => {
                    const column = table.getColumn(id)
                    if (!column) return null

                    return (
                        <DataTableFacetedFilter
                            key={id}
                            column={column}
                            title={label}
                            options={options ?? []}
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
