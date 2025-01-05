import { IconDots } from '@tabler/icons-react'
import { CellContext, ColumnDef } from '@tanstack/react-table'
import { ReactNode } from 'react'

import { Button } from '@/components/ui/Button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'

interface Props {
    children: ReactNode
}

const Actions = ({ children }: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    aria-label='Open menu'
                    variant='ghost'
                    className='ml-auto flex size-8 p-0 data-[state=open]:bg-muted'
                >
                    <IconDots className='size-4' aria-hidden='true' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-40'>
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const actionsColumn = <TData,>(
    children: (data: CellContext<TData, any>) => ReactNode
): ColumnDef<TData> => {
    return {
        id: 'actions',
        cell: data => {
            return <Actions>{children(data)}</Actions>
        },
        size: 40,
    }
}

export default Actions
