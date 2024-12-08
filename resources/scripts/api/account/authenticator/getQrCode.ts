import axios from '@/lib/axios.ts'

export interface AuthenticatorQrCode {
    svg: string
    url: string
}

const getQrCode = async (): Promise<AuthenticatorQrCode> => {
    const { data } = await axios.get(
        '/api/client/account/authenticator/qr-code'
    )

    return data
}

export default getQrCode
