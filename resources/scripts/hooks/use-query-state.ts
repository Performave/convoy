import { useDebouncedValue } from '@mantine/hooks'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

function useQueryState<T>(key: string, defaultValue: T, debounceDelay = 300) {
    const navigate = useNavigate()
    const queryState = useSearch({ strict: false })

    // Initialize from query or default
    const [state, setState] = useState<T>(
        (queryState[key] as T) ?? defaultValue
    )

    const [debouncedState] = useDebouncedValue(state, debounceDelay)

    useEffect(() => {
        navigate({
            replace: true,
            // @ts-expect-error
            search: prev => {
                // Clear from URL if value is default
                if (debouncedState === defaultValue) {
                    const { [key]: _, ...rest } = prev
                    return rest
                }
                return { ...prev, [key]: debouncedState }
            },
        })
    }, [debouncedState, navigate, key, defaultValue])

    return [state, setState, debouncedState] as const
}

export default useQueryState
