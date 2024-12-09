import createModalStore from '@/hooks/create-modal-store.ts'

import AuthenticatorDisableDialog from '@/components/interfaces/Client/Security/AuthenticatorDisableDialog.tsx'
import AuthenticatorEnableDialog from '@/components/interfaces/Client/Security/AuthenticatorEnableDialog.tsx'
import AuthenticatorMainDialog from '@/components/interfaces/Client/Security/AuthenticatorMainDialog.tsx'
import AuthenticatorRecoveryCodesDialog from '@/components/interfaces/Client/Security/AuthenticatorRecoveryCodesDialog.tsx'
import AuthenticatorResetRecoveryCodesDialog from '@/components/interfaces/Client/Security/AuthenticatorResetRecoveryCodesDialog.tsx'

import AuthDialog, {
    createAuthMiddleware,
} from '@/components/ui/Dialog/AuthDialog.tsx'

export const useAuthenticatorModalStore = createModalStore<
    any,
    | 'main'
    | 'enable'
    | 'disable'
    | 'reset-recovery-codes'
    | 'recovery-codes'
    | 'auth'
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
            <AuthenticatorDisableDialog />
            <AuthenticatorRecoveryCodesDialog />
            <AuthenticatorResetRecoveryCodesDialog />
            <AuthDialog useModalStore={useAuthenticatorModalStore} />
        </>
    )
}

export default AuthenticatorContainer
