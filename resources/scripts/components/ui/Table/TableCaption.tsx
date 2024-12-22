import { cn } from '@/utils'
import { HTMLAttributes, forwardRef } from 'react'

const TableCaption = forwardRef<
    HTMLTableCaptionElement,
    HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
    <caption
        ref={ref}
        className={cn('mt-4 text-sm text-muted-foreground', className)}
        {...props}
    />
))
TableCaption.displayName = 'TableCaption'

export default TableCaption
