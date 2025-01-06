import { IconKey } from '@tabler/icons-react'

import usePasskeysSWR from '@/api/account/passkeys/use-passkeys-swr.ts'

import Passkey from '@/components/interfaces/Client/Security/Passkey.tsx'

import Skeleton from '@/components/ui/Skeleton.tsx'

import SimpleEmptyState from '../../../ui/EmptyStates/SimpleEmptyState.tsx'

const PasskeyList = () => {
    const { data, isLoading } = usePasskeysSWR()

    if (isLoading) {
        return <Skeleton className={'h-24 w-full'} />
    }

    if (!data || data?.length === 0) {
        return (
            <SimpleEmptyState
                icon={IconKey}
                title={'No passkeys'}
                description={'You have not added any passkeys to your account.'}
            />
        )
    }

    return (
        <ul className={'flex flex-col divide-y divide-accent'}>
            {data.map(passkey => (
                <li key={passkey.id}>
                    <Passkey passkey={passkey} />
                </li>
            ))}
        </ul>
    )
}

export default PasskeyList
