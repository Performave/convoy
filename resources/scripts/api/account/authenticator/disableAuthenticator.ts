import axios from '@/lib/axios.ts'

const disableAuthenticator = async () => {
    await axios.post('/api/client/account/authenticator/disable')
}

export default disableAuthenticator
