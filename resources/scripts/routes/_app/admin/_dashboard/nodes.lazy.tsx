import usePagination from '@/hooks/use-pagination.ts'
import { Node } from '@/types/node.ts'
import { createLazyFileRoute } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'
import byteSize from 'byte-size'

import useNodesSWR from '@/api/admin/nodes/use-nodes-swr.ts'

import { DataTable } from '@/components/ui/DataTable'
import {
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu'
import { actionsColumn } from '@/components/ui/Table/Actions.tsx'
import { Heading } from '@/components/ui/Typography'

export const Route = createLazyFileRoute('/_app/admin/_dashboard/nodes')({
    component: NodesIndex,
})

function NodesIndex() {
    const pagination = usePagination()
    const { data } = useNodesSWR()

    const columns: ColumnDef<Node>[] = [
        {
            header: 'Name',
            accessorKey: 'name',
            enableHiding: false,
            meta: {
                skeletonWidth: '5rem',
            },
        },
        {
            header: 'FQDN',
            accessorKey: 'fqdn',
            meta: {
                skeletonWidth: '7rem',
            },
        },
        {
            header: 'Memory',
            accessorKey: 'memory',
            meta: {
                skeletonWidth: '1rem',
            },
            cell: ({ cell }) => {
                const memory = byteSize(cell.getValue<number>(), {
                    units: 'iec',
                })

                return `${memory.value} ${memory.unit}`
            },
        },
        actionsColumn<Node>(data => (
            <>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Delete</DropdownMenuItem>
            </>
        )),
    ]

    return (
        <>
            <Heading>Nodes</Heading>
            <DataTable
                paginated
                searchable
                toolbar
                data={data}
                columns={columns}
                {...pagination}
            />
        </>
    )
}
