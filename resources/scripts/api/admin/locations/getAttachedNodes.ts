import { FractalResponseList } from '@/utils/http.ts'

import axios from '@/lib/axios.ts'

import { rawDataToNode } from '@/api/transformers/node.ts'

const getAttachedNodes = async (location: number) => {
    const {
        data: { data },
    } = await axios.get<FractalResponseList>(
        `/api/admin/locations/${location}/nodes`
    )

    return data.map(rawDataToNode)
}

export default getAttachedNodes
