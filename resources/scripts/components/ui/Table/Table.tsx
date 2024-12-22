import { cn } from '@/utils'
import { HTMLAttributes, forwardRef } from 'react'

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
    ({ className, ...props }, ref) => (
        <div className='relative w-full overflow-auto'>
            <table
                ref={ref}
                className={cn('w-full caption-bottom text-sm', className)}
                {...props}
            />
        </div>
    )
)
Table.displayName = 'Table'

export default Table
