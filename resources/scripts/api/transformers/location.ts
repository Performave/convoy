import { Location } from '@/types/location.ts'

export const rawDataToLocation = (data: any): Location => ({
    id: data.id,
    shortCode: data.short_code,
    description: data.description,
    nodesCount: data.nodes_count,
    serversCount: data.servers_count,
})
