import { z } from 'zod'

import axios from '@/lib/axios'

import { rawDataToLocation } from '@/api/transformers/location.ts'

export const schema = z.object({
    shortCode: z.string().min(1).max(60),
    description: z.string().max(191).nullable(),
})

const updateLocation = async (
    location: number,
    { shortCode, description }: z.infer<typeof schema>
) => {
    const {
        data: { data },
    } = await axios.put(`/api/admin/locations/${location}`, {
        short_code: shortCode,
        description,
    })

    return rawDataToLocation(data)
}

export default updateLocation
