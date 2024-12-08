import axios from '@/lib/axios.ts'

const getSecretKey = async (): Promise<string> => {
    const { data } = await axios.get(
        '/api/client/account/authenticator/secret-key'
    )

    return data.secretKey
}

export default getSecretKey
