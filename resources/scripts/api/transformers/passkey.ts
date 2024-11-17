import { Passkey } from '@/types/passkey.ts'

export const rawDataToPasskey = (data: any): Passkey => ({
    id: data.id,
    name: data.name,
    lastUsedAt: data.last_used_at ? new Date(data.last_used_at) : null,
    createdAt: new Date(data.created_at),
})
