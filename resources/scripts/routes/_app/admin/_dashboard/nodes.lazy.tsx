import { Node } from '@/types/node.ts'
import { createLazyFileRoute } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'

import useNodesSWR from '@/api/admin/nodes/use-nodes-swr.ts'

import { DataTable } from '@/components/ui/DataTable'
import { Heading } from '@/components/ui/Typography'

export const Route = createLazyFileRoute('/_app/admin/_dashboard/nodes')({
    component: NodesIndex,

    // @ts-expect-error
    meta: () => [{ title: 'Nodes' }],
})

function NodesIndex() {
    const { data } = useNodesSWR()
    const [query, setQuery] = useState('')

    const columns: ColumnDef<Node>[] = [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'fqdn',
            header: 'FQDN',
        },
    ]

    console.log(query)

    return (
        <>
            <Heading>Nodes</Heading>
            <DataTable
                toolbar
                query={query}
                setQuery={setQuery}
                searchableColumn={'name'}
                columns={columns}
                data={data?.items ?? []}
                paginated
                showPageSizeOptions
            />
        </>
    )
}
