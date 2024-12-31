import { PaginatedNodes } from '@/types/node.ts'
import useSWR from 'swr'

import getNodes from '@/api/admin/nodes/getNodes.ts'

export const getKey = () => ['nodes']

const useNodesSWR = () => {
    return useSWR<PaginatedNodes>(getKey(), getNodes)
}

export default useNodesSWR
