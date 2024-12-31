import { useDebouncedValue } from '@mantine/hooks'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

const useQueryState = <T>(defaultState: T, debounceDelay = 300) => {
    const navigate = useNavigate()
    const queryState = useSearch({
        strict: false,
    })

    const [state, setState] = useState<T>({
        ...defaultState,
        ...queryState,
    })

    const debouncedState = useDebouncedValue(state, debounceDelay)

    useEffect(() => {
        navigate({
            // @ts-expect-error
            search: prev => ({
                ...prev,
                ...debouncedState,
            }),
        })
    }, [debouncedState, navigate])

    return [state, setState] as const
}

export default useQueryState
