import useAsyncFunction from '@/hooks/use-async-function.ts'
import { mutate } from 'swr'
import { useShallow } from 'zustand/react/shallow'

import disableAuthenticator from '@/api/account/authenticator/disableAuthenticator.ts'
import { getKey as getAuthStatusKey } from '@/api/account/authenticator/use-is-authenticator-enabled-swr.ts'

import { useAuthenticatorModalStore } from '@/components/interfaces/Client/Security/AuthenticatorContainer.tsx'

import { Button } from '@/components/ui/Button'
import {
    Credenza,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
} from '@/components/ui/Credenza'
import { toast } from '@/components/ui/Toast'

const AuthenticatorDisableDialog = () => {
    const [open, closeModal] = useAuthenticatorModalStore(
        useShallow(state => [state.activeModal === 'disable', state.closeModal])
    )

    const [state, disable] = useAsyncFunction(async () => {
        try {
            await disableAuthenticator()

            await mutate(getAuthStatusKey())

            toast({
                description: 'Authenticator disabled',
            })

            closeModal('disable')
        } catch (e) {
            toast({
                description: 'Failed to disable authenticator',
                variant: 'destructive',
            })
            throw e
        }
    })

    return (
        <Credenza
            open={open}
            onOpenChange={open => !open && closeModal('disable')}
        >
            <CredenzaContent>
                <CredenzaHeader>
                    <CredenzaTitle>Disable Authenticator</CredenzaTitle>
                    <CredenzaDescription>
                        Are you sure you want to disable the authenticator for
                        your account?
                    </CredenzaDescription>
                </CredenzaHeader>
                <CredenzaFooter>
                    <CredenzaClose asChild>
                        <Button variant={'outline'}>Cancel</Button>
                    </CredenzaClose>
                    <Button
                        loading={state.loading}
                        variant={'destructive'}
                        onClick={disable}
                    >
                        Disable
                    </Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    )
}

export default AuthenticatorDisableDialog
