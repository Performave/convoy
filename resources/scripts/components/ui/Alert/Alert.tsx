import { cn } from '@/utils'
import type { VariantProps } from 'class-variance-authority'
import { HTMLAttributes, forwardRef } from 'react'

import alertVariants from './Alert.variants'


const Alert = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
    <div
        ref={ref}
        role='alert'
        className={cn(alertVariants({ variant }), className)}
        {...props}
    />
))
Alert.displayName = 'Alert'

export default Alert
