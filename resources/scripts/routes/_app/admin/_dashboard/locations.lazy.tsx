import createModalStore from '@/hooks/create-modal-store.ts'
import usePagination from '@/hooks/use-pagination.ts'
import { Location } from '@/types/location.ts'
import { createLazyFileRoute } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'
import { useShallow } from 'zustand/react/shallow'

import useLocationsSWR from '@/api/admin/locations/use-locations-swr.ts'

import DeleteLocationModal from '@/components/interfaces/Admin/Location/DeleteLocationModal.tsx'
import EditLocationModal from '@/components/interfaces/Admin/Location/EditLocationModal.tsx'
import ShowLocationModal from '@/components/interfaces/Admin/Location/ShowLocationModal.tsx'

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

export const useLocationsModalStore = createModalStore<
    Location,
    'show' | 'edit' | 'delete'
>()

function LocationsIndex() {
    const openModal = useLocationsModalStore(
        useShallow(state => state.openModal)
    )
    const pagination = usePagination()
    const { data, mutate } = useLocationsSWR(
        pagination.debouncedQuery,
        pagination.page
    )

    const columns: ColumnDef<Location>[] = [
        {
            header: 'Short Code',
            accessorKey: 'shortCode',
            enableHiding: false,
            meta: {
                skeletonWidth: '5rem',
            },
            cell: ({ cell }) => (
                <button onClick={() => openModal('show', cell.row.original)}>
                    {cell.getValue<string>()}
                </button>
            ),
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
        actionsColumn<Location>(({ row }) => (
            <>
                <DropdownMenuItem
                    onClick={() => openModal('edit', row.original)}
                >
                    Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => openModal('delete', row.original)}
                >
                    Delete
                </DropdownMenuItem>
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
            <ShowLocationModal />
            <EditLocationModal mutate={mutate} />
            <DeleteLocationModal mutate={mutate} />
        </>
    )
}
