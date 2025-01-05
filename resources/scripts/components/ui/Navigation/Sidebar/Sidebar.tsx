import { cn } from '@/utils'
import {
    IconChevronLeft,
    IconChevronRight,
    IconSettings,
} from '@tabler/icons-react'

import { Button } from '@/components/ui/Button'
import { Route } from '@/components/ui/Navigation/Navigation.types.ts'
import BrandLink from '@/components/ui/Navigation/Sidebar/BrandLink.tsx'
import SidebarLink from '@/components/ui/Navigation/Sidebar/SidebarLink.tsx'
import useSidebarStore from '@/components/ui/Navigation/Sidebar/use-sidebar-store.ts'

interface Props {
    routes: Route[]
}

const Sidebar = ({ routes }: Props) => {
    const { expanded, setExpanded, keepExpanded, setKeepExpanded } =
        useSidebarStore(state => ({
            expanded: state.expanded,
            setExpanded: state.setExpanded,
            keepExpanded: state.keepExpanded,
            setKeepExpanded: state.setKeepExpanded,
        }))

    const setExpandedIfNotKeepExpanded = (value: boolean) => {
        if (!keepExpanded) {
            setExpanded(value)
        }
    }

    return (
        <aside
            data-state={expanded ? 'expanded' : 'collapsed'}
            data-keep-expanded={keepExpanded}
            className={
                'group hidden h-full w-14 shrink-0 data-[keep-expanded=true]:w-[13rem] sm:block'
            }
        >
            <div
                className={cn(
                    'no-scrollbar transition-width fixed inset-y-0 left-0 z-50 flex w-14 flex-col overflow-y-auto border-r bg-background duration-200',
                    'group-data-[state=expanded]:w-[13rem]',
                    'group-data-[keep-expanded=true]:w-[13rem]',
                    expanded && !keepExpanded ? 'shadow-xl' : null
                )}
                onMouseEnter={() => setExpandedIfNotKeepExpanded(true)}
                onMouseLeave={() => setExpandedIfNotKeepExpanded(false)}
            >
                <nav className='flex flex-col justify-start gap-2 px-2 sm:py-5'>
                    <BrandLink />

                    {routes.map(route => (
                        <SidebarLink
                            key={route.path}
                            to={route.path}
                            icon={route.icon}
                            label={route.label}
                            activeOptions={route.activeOptions}
                        />
                    ))}
                </nav>
                <nav className='mt-auto flex items-center gap-0.5 px-2 sm:py-5'>
                    <SidebarLink
                        to={'/settings'}
                        icon={IconSettings}
                        label={'Settings'}
                        className={'rounded-r-none'}
                    />
                    <Button
                        className={
                            'h-10 rounded-l-none text-muted-foreground opacity-0 transition-all hover:text-foreground group-data-[keep-expanded=true]:opacity-100 group-data-[state=expanded]:opacity-100'
                        }
                        variant={'ghost'}
                        size={'icon'}
                        onClick={() => setKeepExpanded(!keepExpanded)}
                    >
                        {keepExpanded ? (
                            <IconChevronLeft className={'h-4 w-4'} />
                        ) : (
                            <IconChevronRight className={'h-4 w-4'} />
                        )}
                    </Button>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar
