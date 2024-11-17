import { PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/types'

import axios from '@/lib/axios.ts'


const getPasskeyAuthenticationOptions =
    async (): Promise<PublicKeyCredentialRequestOptionsJSON> => {
        const { data } = await axios.get(
            '/api/auth/passkeys/authentication-options'
        )

        return data
    }

export default getPasskeyAuthenticationOptions
