import { AuthenticatedUser } from '@/types/user.ts'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Cache, cache as SWRCache } from 'swr/_internal'

import { getKey } from '@/api/auth/use-user-swr.ts'


export const Route = createFileRoute('/_app/admin')({
    beforeLoad: () => {
        const cache: Cache<AuthenticatedUser> = SWRCache

        if (cache.get(getKey())?.data?.rootAdmin !== true) {
            throw redirect({
                to: '/',
            })
        }
    },
})
