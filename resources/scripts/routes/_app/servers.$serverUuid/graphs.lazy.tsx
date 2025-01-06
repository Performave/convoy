import { createLazyFileRoute } from '@tanstack/react-router'

import HistoricalCpuUsageCard from '@/components/interfaces/Client/Server/Graphs/HistoricalCpuUsageCard.tsx'
import HistoricalDiskUsageCard from '@/components/interfaces/Client/Server/Graphs/HistoricalDiskUsageCard.tsx'
import HistoricalMemoryUsageCard from '@/components/interfaces/Client/Server/Graphs/HistoricalMemoryUsageCard.tsx'
import HistoricalNetworkUsageCard from '@/components/interfaces/Client/Server/Graphs/HistoricalNetworkUsageCard.tsx'
import LiveCpuUsageCard from '@/components/interfaces/Client/Server/Graphs/LiveCpuUsageCard.tsx'
import LiveMemoryUsageCard from '@/components/interfaces/Client/Server/Graphs/LiveMemoryUsageCard.tsx'
import Header from '@/components/interfaces/Client/Server/Overview/Header.tsx'
import Statistics from '@/components/interfaces/Client/Server/Overview/Statistics.tsx'


export const Route = createLazyFileRoute('/_app/servers/$serverUuid/graphs')({
    component: ServerGraphs,
    // @ts-ignore
    meta: () => [{ title: 'Graphs' }],
})

function ServerGraphs() {
    return (
        <>
            <Header />
            <Statistics />
            <div className={'grid grid-cols-1 gap-2 @md:grid-cols-4 @md:gap-4'}>
                <LiveCpuUsageCard />
                <LiveMemoryUsageCard />
                <HistoricalCpuUsageCard />
                <HistoricalMemoryUsageCard />
                <HistoricalDiskUsageCard />
                <HistoricalNetworkUsageCard />
            </div>
        </>
    )
}