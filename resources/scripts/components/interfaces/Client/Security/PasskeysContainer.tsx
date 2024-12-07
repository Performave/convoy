import createModalStore from '@/hooks/create-modal-store.ts'
import { Passkey } from '@/types/passkey.ts'

import PasskeyDeleteDialog from '@/components/interfaces/Client/Security/PasskeyDeleteDialog.tsx'
import PasskeyRenameDialog from '@/components/interfaces/Client/Security/PasskeyRenameDialog.tsx'
import PasskeysMainDialog from '@/components/interfaces/Client/Security/PasskeysMainDialog.tsx'

import AuthDialog, {
    createAuthMiddleware,
} from '@/components/ui/Dialog/AuthDialog.tsx'


export const usePasskeysModalStore = createModalStore<
    Passkey,
    'main' | 'rename' | 'delete' | 'auth'
>({
    main: {
        middleware: createAuthMiddleware('auth'),
    },
})

const PasskeysContainer = () => {
    return (
        <>
            <PasskeysMainDialog />
            <PasskeyRenameDialog />
            <PasskeyDeleteDialog />
            <AuthDialog useModalStore={usePasskeysModalStore} />
        </>
    )
}

export default PasskeysContainer
