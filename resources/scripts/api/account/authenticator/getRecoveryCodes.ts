import axios from '@/lib/axios.ts'

const getRecoveryCodes = async (): Promise<string[]> => {
    const { data } = await axios.get(
        '/api/client/account/authenticator/recovery-codes'
    )

    return data
}

export default getRecoveryCodes
