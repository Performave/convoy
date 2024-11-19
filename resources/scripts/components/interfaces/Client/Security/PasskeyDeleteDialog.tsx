import { Passkey } from '@/types/passkey.ts'
import { useAsyncFn } from 'react-use'
import { mutate } from 'swr'
import { useShallow } from 'zustand/react/shallow'

import deletePasskey from '@/api/account/passkeys/deletePasskey.ts'
import { getKey as getPasskeysSWRKey } from '@/api/account/passkeys/use-passkeys-swr.ts'

import { usePasskeysModalStore } from '@/components/interfaces/Client/Security/PasskeysContainer.tsx'

import { Button } from '@/components/ui/Button'
import {
    Credenza,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
} from '@/components/ui/Credenza'
import { toast } from '@/components/ui/Toast'

const PasskeyDeleteDialog = () => {
    const [passkey, isDeleteDialogOpen, closeModal] = usePasskeysModalStore(
        useShallow(state => [
            state.modalData,
            state.activeModal === 'delete',
            state.closeModal,
        ])
    )

    const [state, submit] = useAsyncFn(async (currentPasskey: Passkey) => {
        try {
            await deletePasskey(currentPasskey.id)

            toast({
                description: 'Passkey deleted',
            })

            await mutate(getPasskeysSWRKey())

            closeModal()
        } catch (e) {
            toast({
                description: 'Deletion failed',
                variant: 'destructive',
            })
            throw e
        }
    })

    return (
        <Credenza
            open={isDeleteDialogOpen}
            onOpenChange={open => {
                if (!open) closeModal()
            }}
        >
            <CredenzaContent className={'max-h-[50vh]'}>
                <CredenzaHeader className={'overflow-x-hidden'}>
                    <CredenzaTitle className={'truncate'}>
                        Delete {passkey?.name}?
                    </CredenzaTitle>
                    <CredenzaDescription>
                        Are you sure you want to delete this passkey? You will
                        no longer be able to use it to authenticate once you
                        delete it.
                    </CredenzaDescription>
                </CredenzaHeader>

                <CredenzaFooter className={'mt-4'}>
                    <Button variant={'outline'} onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button
                        loading={state.loading}
                        variant={'destructive'}
                        onClick={() => submit(passkey!)}
                    >
                        Delete
                    </Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    )
}

export default PasskeyDeleteDialog
