import createModalStore from '@/hooks/create-modal-store.ts'
import { useShallow } from 'zustand/react/shallow'

import AuthSetting from '@/components/interfaces/Client/Security/AuthSetting.tsx'

import AuthDialog from '@/components/ui/Dialog/AuthDialog.tsx'


export const useAuthenticatorModalStore = createModalStore<
    any,
    'main' | 'auth'
>()

const AuthenticatorContainer = () => {
    const openDialog = useAuthenticatorModalStore(
        useShallow(state => state.openModal)
    )
    return (
        <>
            <AuthSetting
                title={'Authenticator'}
                description={'Time-based verification codes using an app'}
                onClick={() => openDialog('auth')}
            />
            <AuthDialog useModalStore={useAuthenticatorModalStore} />
        </>
    )
}

export default AuthenticatorContainer
