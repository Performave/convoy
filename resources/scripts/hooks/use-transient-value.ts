import { useEffect, useRef, useState } from 'react'


/**
 * Retains the last non-nullish value for a specified duration
 * before allowing it to become null or undefined.
 */
const useTransientValue = <T>(
    value: T | null | undefined,
    duration = 5000
): T | null | undefined => {
    const [cachedValue, setCachedValue] = useState<T | null | undefined>(value)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        if (value != null) {
            // If new value is valid, update immediately
            if (timerRef.current) clearTimeout(timerRef.current)
            setCachedValue(value)
        } else {
            // If value is nullish, wait `duration` before clearing cached value
            timerRef.current = setTimeout(() => {
                setCachedValue(value)
            }, duration)
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [value, duration])

    return cachedValue
}

export default useTransientValue
