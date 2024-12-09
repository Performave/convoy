import { cn } from '@/utils'
import { OTPInput } from 'input-otp'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

const InputOTP = forwardRef<
    ElementRef<typeof OTPInput>,
    ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
    <OTPInput
        ref={ref}
        containerClassName={cn(
            'flex items-center gap-2 has-[:disabled]:opacity-50',
            containerClassName
        )}
        className={cn('disabled:cursor-not-allowed', className)}
        {...props}
    />
))
InputOTP.displayName = 'InputOTP'

export default InputOTP
