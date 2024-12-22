import { cn } from '@/utils'
import { HTMLAttributes, forwardRef } from 'react'

const TableRow = forwardRef<
    HTMLTableRowElement,
    HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn(
            'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
            className
        )}
        {...props}
    />
))
TableRow.displayName = 'TableRow'

export default TableRow
