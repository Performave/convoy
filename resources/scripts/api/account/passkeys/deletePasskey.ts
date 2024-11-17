import axios from '@/lib/axios.ts'

const deletePasskey = async (id: number) => {
    await axios.delete(`/api/client/account/passkeys/${id}`)
}

export default deletePasskey
