import useQueryState from '@/hooks/use-query-state.ts'

const usePagination = () => {
    const [query, setQuery, debouncedQuery] = useQueryState('query', '')
    const [page, setPage] = useQueryState('page', 1)
    const [perPage, setPerPage] = useQueryState('perPage', 20)

    return {
        query,
        debouncedQuery,
        setQuery,
        page,
        setPage,
        perPage,
        setPerPage,
    }
}

export default usePagination
