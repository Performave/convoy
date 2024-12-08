import { Skeleton } from '@mantine/core'
import { IconSquareAsterisk } from '@tabler/icons-react'
import { useShallow } from 'zustand/react/shallow'

import useIsAuthenticatorEnabledSWR from '@/api/account/authenticator/use-is-authenticator-enabled-swr.ts'

import { useAuthenticatorModalStore } from '@/components/interfaces/Client/Security/AuthenticatorContainer.tsx'

import { Button } from '@/components/ui/Button'
import { SimpleEmptyState } from '@/components/ui/EmptyStates'


const AuthenticatorStatus = () => {
    const { data: isEnabled, isLoading } = useIsAuthenticatorEnabledSWR()
    const openModal = useAuthenticatorModalStore(
        useShallow(state => state.openModal)
    )

    if (isLoading) {
        return <Skeleton className={'h-24 w-full'} />
    }

    if (!isEnabled) {
        return (
            <SimpleEmptyState
                icon={IconSquareAsterisk}
                title={'Authenticator is disabled'}
                description={
                    'You have not enabled the authenticator for your account.'
                }
                action={
                    <Button onClick={() => openModal('enable')}>Enable</Button>
                }
            />
        )
    }

    return <p>enabled</p>
}

export default AuthenticatorStatus
