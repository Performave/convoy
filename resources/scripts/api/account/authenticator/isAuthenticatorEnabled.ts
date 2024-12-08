import axios from '@/lib/axios.ts'

const isAuthenticatorEnabled = async (): Promise<boolean> => {
    const { data } = await axios.get('/api/client/account/authenticator/status')

    return data.enabled
}

export default isAuthenticatorEnabled
