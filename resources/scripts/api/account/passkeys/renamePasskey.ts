import axios from '@/lib/axios.ts'

import { rawDataToPasskey } from '@/api/transformers/passkey.ts'


const renamePasskey = async (id: number, name: string) => {
    const {
        data: { data },
    } = await axios.post(`/api/client/account/passkeys/${id}/rename`, {
        name,
    })

    return rawDataToPasskey(data)
}

export default renamePasskey
