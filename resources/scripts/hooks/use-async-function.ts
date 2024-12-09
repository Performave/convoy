import { useCallback, useState } from 'react'

export type UseAsyncReturn<T, P extends any[]> = [
    {
        loading: boolean
        error: Error | null
    },
    (...args: P) => Promise<T>,
]

const useAsync = <T, P extends any[] = []>(
    asyncFunction: (...args: P) => Promise<T>
): UseAsyncReturn<T, P> => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const mutate = useCallback(
        async (...args: P) => {
            setLoading(true)
            setError(null) // Reset error before each call

            try {
                return await asyncFunction(...args)
            } catch (err) {
                setError(err as Error)
                throw err // Re-throwing the error for explicit handling
            } finally {
                setLoading(false)
            }
        },
        [asyncFunction]
    )

    return [
        {
            loading,
            error,
        },
        mutate,
    ]
}

export default useAsync
