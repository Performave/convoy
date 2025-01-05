import { PaginatedResult } from '@/utils/http.ts'

export interface Location {
    id: number
    shortCode: string
    description: string
    nodesCount: number
    serversCount: number
}

export type PaginatedLocations = PaginatedResult<Location>
