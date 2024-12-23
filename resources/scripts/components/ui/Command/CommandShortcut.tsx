import { cn } from '@/utils'
import { HTMLAttributes } from 'react'

const CommandShortcut = ({
    className,
    ...props
}: HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span
            className={cn(
                'ml-auto text-xs tracking-widest text-muted-foreground',
                className
            )}
            {...props}
        />
    )
}
CommandShortcut.displayName = 'CommandShortcut'

export default CommandShortcut
