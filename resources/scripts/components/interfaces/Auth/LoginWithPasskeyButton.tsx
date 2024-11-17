import { startAuthentication } from '@simplewebauthn/browser'
import {
    AuthenticationResponseJSON,
    PublicKeyCredentialRequestOptionsJSON,
} from '@simplewebauthn/types'
import { IconKey } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'
import { useAsyncFn } from 'react-use'

import getPasskeyAuthenticationOptions from '@/api/auth/getPasskeyAuthenticationOptions.ts'
import verifyPasskeyAuthentication from '@/api/auth/verifyPasskeyAuthentication.ts'

import { Button } from '@/components/ui/Button'
import { toast } from '@/components/ui/Toast'


interface Props {
    redirectTo?: string
}

const LoginWithPasskeyButton = ({ redirectTo }: Props) => {
    const navigate = useNavigate()

    const [state, login] = useAsyncFn(async () => {
        let optionsJSON: PublicKeyCredentialRequestOptionsJSON
        try {
            optionsJSON = await getPasskeyAuthenticationOptions()
        } catch (e) {
            toast({
                description: 'Failed to get passkey authentication options',
                variant: 'destructive',
            })
            throw e
        }

        let authResponse: AuthenticationResponseJSON
        try {
            authResponse = await startAuthentication({ optionsJSON })
        } catch (e) {
            toast({
                description: 'Authentication failed',
                variant: 'destructive',
            })
            throw e
        }

        try {
            await verifyPasskeyAuthentication(authResponse)
        } catch (e) {
            toast({
                description: 'Invalid passkey. Please try again.',
                variant: 'destructive',
            })
            throw e
        }

        await navigate({
            // @ts-expect-error
            to: redirectTo ? `/${redirectTo.slice(1)}` : '/',
        })
    })

    return (
        <Button
            onClick={login}
            className={'w-full'}
            variant='outline'
            loading={state.loading}
        >
            <IconKey className='mr-2 h-4 w-4' />
            Passkeys
        </Button>
    )
}

export default LoginWithPasskeyButton
