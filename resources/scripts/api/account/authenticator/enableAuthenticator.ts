import axios from '@/lib/axios.ts'

const enableAuthenticator = async (force?: boolean) => {
    await axios.post('/api/client/account/authenticator/enable', {
        force,
    })
}

export default enableAuthenticator
