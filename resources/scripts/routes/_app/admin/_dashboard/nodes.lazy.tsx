import { createLazyFileRoute } from '@tanstack/react-router'

import { Heading } from '@/components/ui/Typography'

export const Route = createLazyFileRoute('/_app/admin/_dashboard/nodes')({
    component: NodesIndex,

    // @ts-expect-error
    meta: () => [{ title: 'Nodes' }],
})

function NodesIndex() {
    return (
        <>
            <Heading>Nodes</Heading>
        </>
    )
}
