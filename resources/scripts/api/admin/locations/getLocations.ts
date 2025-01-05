import { PaginatedLocations } from '@/types/location.ts'
import {
    FractalPaginatedResponse,
    QueryBuilderParams,
    getPaginationSet,
    withQueryBuilderParams,
} from '@/utils/http.ts'

import axios from '@/lib/axios.ts'

import { rawDataToLocation } from '@/api/transformers/location.ts'

const getLocations = async (
    params: QueryBuilderParams<'*' | 'short_code'>
): Promise<PaginatedLocations> => {
    const { data } = await axios.get<FractalPaginatedResponse>(
        '/api/admin/locations',
        {
            params: withQueryBuilderParams(params),
        }
    )

    return {
        items: data.data.map(rawDataToLocation),
        pagination: getPaginationSet(data.meta.pagination),
    }
}

export default getLocations
