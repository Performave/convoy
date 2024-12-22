import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_dashboard/security')({
    staticData: {
        title: 'Security',
    },
})
