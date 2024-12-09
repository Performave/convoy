import axios from '@/lib/axios.ts'

interface Payload {
    code?: string | null
    recoveryCode?: string | null
}

const verifyAuthenticatorChallenge = async ({
    code,
    recoveryCode,
}: Payload) => {
    await axios.post('/api/auth/authenticator/verify-challenge', {
        code,
        recovery_code: recoveryCode,
    })
}

export default verifyAuthenticatorChallenge
