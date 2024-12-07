import { ModalStore } from '@/hooks/create-modal-store.ts'
import useIdentityConfirmationStore, {
    ConfirmationType,
} from '@/stores/identity-confirmation-store.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useShallow } from 'zustand/react/shallow'

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
} from '@/components/ui/Credenza'
import { Form, FormButton } from '@/components/ui/Form'
import { InputForm } from '@/components/ui/Forms'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'

const passwordSchema = z.object({
    type: z.literal('PASSWORD'),
    password: z.string().min(1),
})

const passkeySchema = z.object({
    type: z.literal('PASSKEY'),
    passkey: z.array(z.any()).nullable(),
})

const schema = z.discriminatedUnion('type', [passwordSchema, passkeySchema])

interface Props {
    selector?: string
    useModalStore: ModalStore<any, any>
}

export const createAuthMiddleware = <T extends string>(id: T) => ({
    id,
    shouldContinue: () =>
        useIdentityConfirmationStore.getState().isIdentityValid(),
})

const AuthDialog = ({ selector = 'auth', useModalStore }: Props) => {
    const [confirmationType, confirmIdentity] = useIdentityConfirmationStore(
        useShallow(state => [state.confirmationType, state.confirmIdentity])
    )
    const [isAuthDialogOpen, back, closeModal] = useModalStore(
        useShallow(state => [
            state.activeModal === selector,
            state.backOutFromMiddleware,
            state.closeModal,
        ])
    )

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            type: confirmationType,
            passkey: null,
            password: '',
        },
    })

    const type = form.watch('type')

    const submit = async (_data: any) => {
        const data = _data as z.infer<typeof schema>
        confirmIdentity(
            ConfirmationType[data.type as keyof typeof ConfirmationType]
        )
        closeModal(selector)
    }

    return (
        <Credenza
            open={isAuthDialogOpen}
            onOpenChange={open => !open && back(selector)}
        >
            <CredenzaContent className={'max-h-[50vh]'}>
                <CredenzaHeader className={'overflow-x-hidden'}>
                    <CredenzaTitle className={'truncate'}>
                        Authorization Required
                    </CredenzaTitle>
                    <CredenzaDescription>
                        Please enter your credentials to continue
                    </CredenzaDescription>
                </CredenzaHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)}>
                        <CredenzaBody>
                            <Tabs
                                value={type}
                                onValueChange={val =>
                                    form.setValue(
                                        'type',
                                        val as ConfirmationType
                                    )
                                }
                            >
                                <div
                                    className={
                                        'flex justify-center md:justify-start'
                                    }
                                >
                                    <TabsList>
                                        <TabsTrigger value={'PASSWORD'}>
                                            Password
                                        </TabsTrigger>
                                        <TabsTrigger value={'PASSKEY'}>
                                            Passkey
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                                <TabsContent value={'PASSWORD'}>
                                    <InputForm
                                        name={'password'}
                                        label={'Password'}
                                        type={'password'}
                                    />
                                </TabsContent>
                                <TabsContent value={'PASSKEY'}>
                                    <p>passkey</p>
                                </TabsContent>
                            </Tabs>
                        </CredenzaBody>
                        <CredenzaFooter className={'mt-4'}>
                            <CredenzaClose asChild>
                                <Button variant={'outline'} type={'button'}>
                                    Cancel
                                </Button>
                            </CredenzaClose>
                            <FormButton>Confirm</FormButton>
                        </CredenzaFooter>
                    </form>
                </Form>
            </CredenzaContent>
        </Credenza>
    )
}

export default AuthDialog
