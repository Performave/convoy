import { useShallow } from 'zustand/react/shallow'

import AuthSetting from '@/components/interfaces/Client/Security/AuthSetting.tsx'
import { useAuthenticatorModalStore } from '@/components/interfaces/Client/Security/AuthenticatorContainer.tsx'
import AuthenticatorStatus from '@/components/interfaces/Client/Security/AuthenticatorStatus.tsx'

import { Button } from '@/components/ui/Button'
import {
    Credenza,
    CredenzaBody,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from '@/components/ui/Credenza'

const AuthenticatorMainDialog = () => {
    const [open, openModal, closeModal] = useAuthenticatorModalStore(
        useShallow(state => [
            state.activeModal === 'main',
            state.openModal,
            state.closeModal,
        ])
    )

    const handleOpenChange = (open: boolean) => {
        if (open) {
            openModal('main')
        } else {
            closeModal('main')
        }
    }

    return (
        <Credenza open={open} onOpenChange={handleOpenChange}>
            <CredenzaTrigger asChild>
                <AuthSetting
                    title={'Authenticator'}
                    description={'Time-based verification codes using an app'}
                />
            </CredenzaTrigger>
            <CredenzaContent>
                <CredenzaHeader>
                    <CredenzaTitle>Authenticator</CredenzaTitle>

                    <CredenzaDescription>
                        Use an authenticator app to generate time-based
                        verification codes.
                    </CredenzaDescription>
                </CredenzaHeader>

                <CredenzaBody>
                    <AuthenticatorStatus />
                </CredenzaBody>

                <CredenzaFooter>
                    <CredenzaClose asChild>
                        <Button variant={'outline'}>Close</Button>
                    </CredenzaClose>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    )
}

export default AuthenticatorMainDialog
