import useSWR from 'swr'

import isAuthenticatorEnabled from '@/api/account/authenticator/isAuthenticatorEnabled.ts'

export const getKey = () => 'account.authenticator.enabled'

const useIsAuthenticatorEnabledSWR = () => {
    return useSWR(getKey(), isAuthenticatorEnabled)
}

export default useIsAuthenticatorEnabledSWR
