import axios from '@/lib/axios.ts'

const regenerateRecoveryCodes = async () => {
    await axios.post(
        '/api/client/account/authenticator/recovery-codes/regenerate'
    )
}

export default regenerateRecoveryCodes
