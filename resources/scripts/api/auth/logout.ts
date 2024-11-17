import axios from '@/lib/axios.ts'

const logout = async () => {
    await axios.post('/api/auth/logout')
}

export default logout
