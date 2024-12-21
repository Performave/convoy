import { cn } from '@/utils'
import { calculatePasswordStrength } from '@/utils/password.ts'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useMemo } from 'react'

interface Props {
    password: string
}

const Indicator = ({
    criterion,
    isFulfilled,
}: {
    criterion: string
    isFulfilled: boolean
}) => {
    const Icon = isFulfilled ? IconCheck : IconX

    return (
        <div className={'flex items-center'}>
            <Icon
                className={cn(
                    'mr-2 h-4 w-4',
                    isFulfilled ? 'text-primary' : 'text-destructive'
                )}
            />
            <span>{criterion}</span>
        </div>
    )
}

const PasswordStrengthIndicator = ({ password }: Props) => {
    const calculation = useMemo(
        () => calculatePasswordStrength(password),
        [password]
    )

    return (
        <div className={'bg-accent-muted p-2'}>
            <ul>
                <li>
                    <Indicator
                        criterion={'Uses at least 12 characters'}
                        isFulfilled={calculation.criteria.minLength}
                    />
                </li>
                <li>
                    <Indicator
                        criterion={'Uses uppercase characters'}
                        isFulfilled={calculation.criteria.uppercase}
                    />
                </li>
                <li>
                    <Indicator
                        criterion={'Uses lowercase characters'}
                        isFulfilled={calculation.criteria.lowercase}
                    />
                </li>
                <li>
                    <Indicator
                        criterion={'Uses numbers'}
                        isFulfilled={calculation.criteria.number}
                    />
                </li>
                <li>
                    <Indicator
                        criterion={'Uses special characters'}
                        isFulfilled={calculation.criteria.specialChar}
                    />
                </li>
            </ul>
        </div>
    )
}

export default PasswordStrengthIndicator
