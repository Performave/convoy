import { PaginatedNodes } from '@/types/node.ts'
import { getPaginationSet } from '@/utils/http.ts'

import axios from '@/lib/axios.ts'

import { rawDataToNode } from '@/api/transformers/node.ts'

const getNodes = async (): Promise<PaginatedNodes> => {
    const { data } = await axios.get('/api/admin/nodes')

    return {
        items: data.data.map((node: any) => rawDataToNode(node)),
        pagination: getPaginationSet(data.meta.pagination),
    }
}

export default getNodes
