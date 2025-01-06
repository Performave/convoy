import { Location } from '@/types/location.ts'
import { IconServer } from '@tabler/icons-react'

import useAttachedNodesSWR from '@/api/admin/locations/use-attached-nodes-swr.ts'

import { SimpleEmptyState } from '@/components/ui/EmptyStates'
import Skeleton from '@/components/ui/Skeleton.tsx'

interface Props {
    location: Location | null
}

const AttachedNodesList = ({ location }: Props) => {
    const { data, isLoading } = useAttachedNodesSWR(location?.id)

    if (isLoading) {
        return <Skeleton className={'h-24 w-full'} />
    }

    if (!data || data?.length === 0) {
        return (
            <SimpleEmptyState
                icon={IconServer}
                title={'No nodes'}
                description={'There are no nodes attached to this location.'}
            />
        )
    }

    return (
        <ul
            className={
                'flex flex-col divide-y divide-accent rounded-md border border-accent'
            }
        >
            {data.map(node => (
                <li
                    key={node.id}
                    className={'flex flex-col truncate px-3 py-2 leading-tight'}
                >
                    <p className={'text-sm'}>{node.name}</p>
                    <p className={'text-xs text-muted-foreground'}>
                        {node.fqdn}
                    </p>
                </li>
            ))}
        </ul>
    )
}

export default AttachedNodesList
