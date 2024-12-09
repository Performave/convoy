import useAsyncFunction from '@/hooks/use-async-function.ts'
import { useShallow } from 'zustand/react/shallow'

import regenerateRecoveryCodes from '@/api/account/authenticator/regenerateRecoveryCodes.ts'

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

const AuthenticatorResetRecoveryCodesDialog = () => {
    const [open, closeModal, pushToQueue] = useAuthenticatorModalStore(
        useShallow(state => [
            state.activeModal === 'reset-recovery-codes',
            state.closeModal,
            state.pushToQueue,
        ])
    )

    const [state, reset] = useAsyncFunction(async () => {
        try {
            await regenerateRecoveryCodes()

            toast({
                description: 'Recovery codes reset',
            })

            pushToQueue('recovery-codes')

            closeModal('reset-recovery-codes')
        } catch (e) {
            toast({
                description: 'Failed to reset recovery codes',
                variant: 'destructive',
            })
            throw e
        }
    })

    return (
        <Credenza
            open={open}
            onOpenChange={open => !open && closeModal('reset-recovery-codes')}
        >
            <CredenzaContent>
                <CredenzaHeader>
                    <CredenzaTitle>Reset Recovery Codes</CredenzaTitle>
                    <CredenzaDescription>
                        Are you sure you want to reset your recovery codes? This
                        will invalidate all existing codes.
                    </CredenzaDescription>
                </CredenzaHeader>
                <CredenzaFooter>
                    <CredenzaClose asChild>
                        <Button variant={'outline'}>Cancel</Button>
                    </CredenzaClose>
                    <Button
                        loading={state.loading}
                        variant={'destructive'}
                        onClick={reset}
                    >
                        Reset
                    </Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    )
}

export default AuthenticatorResetRecoveryCodesDialog
