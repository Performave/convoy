import createModalStore from '@/hooks/create-modal-store.ts'

import AuthenticatorEnableDialog from '@/components/interfaces/Client/Security/AuthenticatorEnableDialog.tsx'
import AuthenticatorMainDialog from '@/components/interfaces/Client/Security/AuthenticatorMainDialog.tsx'
import AuthenticatorRecoveryCodesDialog from '@/components/interfaces/Client/Security/AuthenticatorRecoveryCodesDialog.tsx'

import AuthDialog, {
    createAuthMiddleware,
} from '@/components/ui/Dialog/AuthDialog.tsx'


export const useAuthenticatorModalStore = createModalStore<
    any,
    'main' | 'enable' | 'recovery-codes' | 'auth'
>({
    main: {
        middleware: createAuthMiddleware('auth'),
    },
})

const AuthenticatorContainer = () => {
    return (
        <>
            <AuthenticatorMainDialog />
            <AuthenticatorEnableDialog />
            <AuthenticatorRecoveryCodesDialog />
            <AuthDialog useModalStore={useAuthenticatorModalStore} />
        </>
    )
}

export default AuthenticatorContainer
