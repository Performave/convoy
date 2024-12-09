import { cn } from '@/utils'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

const InputOTPGroup = forwardRef<
    ElementRef<'div'>,
    ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center', className)} {...props} />
))
InputOTPGroup.displayName = 'InputOTPGroup'

export default InputOTPGroup
