import { MinusIcon } from '@radix-ui/react-icons'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

const InputOTPSeparator = forwardRef<
    ElementRef<'div'>,
    ComponentPropsWithoutRef<'div'>
>(({ ...props }, ref) => (
    <div ref={ref} role='separator' {...props}>
        <MinusIcon />
    </div>
))
InputOTPSeparator.displayName = 'InputOTPSeparator'

export default InputOTPSeparator
