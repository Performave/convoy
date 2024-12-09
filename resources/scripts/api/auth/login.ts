import axios from '@/lib/axios.ts'

interface LoginParams {
    email: string
    password: string
}

interface LoginResponse {
    twoFactor: boolean
}

const login = async ({ email, password }: LoginParams) => {
    const { data } = await axios.post('/api/auth/login', {
        email,
        password,
    })

    return {
        twoFactor: Boolean(data?.two_factor),
    } satisfies LoginResponse
}

export default login
