import { PaginatedNodes } from '@/types/node.ts'
import { getPaginationSet } from '@/utils/http.ts'

import axios from '@/lib/axios.ts'

import { rawDataToNode } from '@/api/transformers/node.ts'

const getNodes = async () => {
    const { data } = await axios.get('/api/admin/nodes')

    return {
        items: data.data.map((node: any) => rawDataToNode(node)),
        pagination: getPaginationSet(data.meta.pagination),
    } satisfies PaginatedNodes
}

export default getNodes
