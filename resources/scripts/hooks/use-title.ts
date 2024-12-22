import { useRouterState } from '@tanstack/react-router'
import { useEffect } from 'react'

const useTitle = (middleText?: string) => {
    const matches = useRouterState({
        select: state => {
            return state.matches
        },
    })

    const titles = matches
        .filter(match => match.staticData?.title)
        .map(match => match.staticData.title as string)
        .reverse()

    if (titles.length > 1) {
        titles.pop()
    }

    if (middleText) {
        titles.push(middleText)
    }

    titles.push('Convoy')

    useEffect(() => {
        document.title = titles.join(' | ')
    }, [titles, middleText])
}

export default useTitle
