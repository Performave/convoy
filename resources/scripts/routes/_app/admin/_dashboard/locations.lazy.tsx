import usePagination from '@/hooks/use-pagination.ts'
import { Location } from '@/types/location.ts'
import { createLazyFileRoute } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'

import useLocationsSWR from '@/api/admin/locations/use-locations-swr.ts'

import { Badge } from '@/components/ui/Badge.tsx'
import { DataTable } from '@/components/ui/DataTable'
import {
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu'
import { actionsColumn } from '@/components/ui/Table/Actions.tsx'
import { Heading } from '@/components/ui/Typography'

export const Route = createLazyFileRoute('/_app/admin/_dashboard/locations')({
    component: LocationsIndex,
})

function LocationsIndex() {
    const pagination = usePagination()
    const { data } = useLocationsSWR(pagination.debouncedQuery, pagination.page)

    const columns: ColumnDef<Location>[] = [
        {
            header: 'Short Code',
            accessorKey: 'shortCode',
            enableHiding: false,
            meta: {
                skeletonWidth: '5rem',
            },
        },
        {
            header: 'Description',
            accessorKey: 'description',
            meta: {
                skeletonWidth: '10rem',
            },
        },
        {
            header: 'Nodes',
            accessorKey: 'nodesCount',
            meta: {
                skeletonWidth: '1rem',
                align: 'center',
            },
            cell: ({ cell }) => (
                <Badge variant={'secondary'} className={'font-mono'}>
                    {cell.getValue<number>()}
                </Badge>
            ),
        },
        {
            header: 'Servers',
            accessorKey: 'serversCount',
            meta: {
                skeletonWidth: '1rem',
                align: 'center',
            },
            cell: ({ cell }) => (
                <Badge variant={'secondary'} className={'font-mono'}>
                    {cell.getValue<number>()}
                </Badge>
            ),
        },
        actionsColumn<Location>(_ctx => (
            <>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Delete</DropdownMenuItem>
            </>
        )),
    ]

    return (
        <>
            <Heading>Locations</Heading>
            <DataTable
                data={data}
                columns={columns}
                paginated
                searchable
                toolbar
                {...pagination}
            />
        </>
    )
}
