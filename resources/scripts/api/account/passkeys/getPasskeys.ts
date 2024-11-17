import { Passkey } from '@/types/passkey.ts'

import axios from '@/lib/axios.ts'

import { rawDataToPasskey } from '@/api/transformers/passkey.ts'


const getPasskeys = async (): Promise<Passkey[]> => {
    const {
        data: { data },
    } = await axios.get('/api/client/account/passkeys')

    return data.map(rawDataToPasskey)
}

export default getPasskeys
