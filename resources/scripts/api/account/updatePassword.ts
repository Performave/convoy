import axios from '@/lib/axios.ts'

interface Payload {
    currentPassword: string
    password: string
    passwordConfirmation: string
}

const updatePassword = async ({
    currentPassword,
    password,
    passwordConfirmation,
}: Payload) => {
    await axios.put('/api/client/account/password', {
        current_password: currentPassword,
        password,
        password_confirmation: passwordConfirmation,
    })
}

export default updatePassword
