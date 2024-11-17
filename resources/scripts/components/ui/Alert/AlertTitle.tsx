import { cn } from '@/utils'
import { HTMLAttributes, forwardRef } from 'react'

const AlertTitle = forwardRef<
    HTMLParagraphElement,
    HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn(
            'mb-1 font-medium leading-none tracking-tight',
            className
        )}
        {...props}
    />
))
AlertTitle.displayName = 'AlertTitle'

export default AlertTitle
