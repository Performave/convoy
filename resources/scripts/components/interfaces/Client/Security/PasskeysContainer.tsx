import createModalStore from '@/hooks/use-modal-store.ts'
import { Passkey } from '@/types/passkey.ts'

import PasskeyDeleteDialog from '@/components/interfaces/Client/Security/PasskeyDeleteDialog.tsx'
import PasskeyRenameDialog from '@/components/interfaces/Client/Security/PasskeyRenameDialog.tsx'
import PasskeysMainDialog from '@/components/interfaces/Client/Security/PasskeysMainDialog.tsx'


// const TRANSITION_DELAY = 250
//
// interface PasskeysState {
//     isMainDialogOpen: boolean
//     isRenameDialogOpen: boolean
//     isDeleteDialogOpen: boolean
//     selectedPasskey: Passkey | null
//     openDialog: (dialogType: 'rename' | 'delete', passkey: Passkey) => void
//     closeDialog: () => void
// }
//
// export const usePasskeysStore = create<PasskeysState>(set => ({
//     isMainDialogOpen: false,
//     isRenameDialogOpen: false,
//     isDeleteDialogOpen: false,
//     selectedPasskey: null,
//
//     openDialog: (dialogType, passkey) => {
//         set({
//             isMainDialogOpen: false,
//             selectedPasskey: passkey,
//             isRenameDialogOpen: dialogType === 'rename',
//             isDeleteDialogOpen: dialogType === 'delete',
//         })
//     },
//
//     closeDialog: () => {
//         set({
//             isRenameDialogOpen: false,
//             isDeleteDialogOpen: false,
//             isMainDialogOpen: true,
//         })
//     },
// }))

export const usePasskeysModalStore = createModalStore<
    Passkey,
    'main' | 'rename' | 'delete'
>()

const PasskeysContainer = () => {
    return (
        <>
            <PasskeysMainDialog />
            <PasskeyRenameDialog />
            <PasskeyDeleteDialog />
        </>
    )
}

export default PasskeysContainer
