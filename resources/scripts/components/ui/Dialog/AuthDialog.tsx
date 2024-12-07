import { ModalStore } from '@/hooks/create-modal-store.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useShallow } from 'zustand/react/shallow'

import { Button } from '@/components/ui/Button'
import {
    Credenza,
    CredenzaBody,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
} from '@/components/ui/Credenza'
import { Form, FormButton } from '@/components/ui/Form'
import { InputForm } from '@/components/ui/Forms'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'

const schema = z.object({
    passkey: z.array(z.any()).nullable(),
    password: z.string(),
})

interface Props {
    selector?: string
    useModalStore: ModalStore<any, any>
}

const AuthDialog = ({ selector = 'auth', useModalStore }: Props) => {
    const [isAuthDialogOpen, closeModal] = useModalStore(
        useShallow(state => [state.activeModal === selector, state.closeModal])
    )

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            passkey: null,
            password: '',
        },
    })

    const submit = async (data: z.infer<typeof schema>) => {}

    return (
        <Credenza
            open={isAuthDialogOpen}
            onOpenChange={open => {
                if (!open) closeModal()
            }}
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
                            <Tabs defaultValue={'password'}>
                                <div
                                    className={
                                        'flex justify-center md:justify-start'
                                    }
                                >
                                    <TabsList>
                                        <TabsTrigger value={'password'}>
                                            Password
                                        </TabsTrigger>
                                        <TabsTrigger value={'passkey'}>
                                            Passkey
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                                <TabsContent value={'password'}>
                                    <InputForm
                                        name={'password'}
                                        label={'Password'}
                                        type={'password'}
                                    />
                                </TabsContent>
                                <TabsContent value={'passkey'}>
                                    <p>passkey</p>
                                </TabsContent>
                            </Tabs>
                        </CredenzaBody>
                        <CredenzaFooter className={'mt-4'}>
                            <Button
                                variant={'outline'}
                                onClick={() => closeModal(true)}
                                type={'button'}
                            >
                                Cancel
                            </Button>
                            <FormButton>Confirm</FormButton>
                        </CredenzaFooter>
                    </form>
                </Form>
            </CredenzaContent>
        </Credenza>
    )
}

export default AuthDialog
