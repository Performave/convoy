import { create } from 'zustand'
import { persist } from 'zustand/middleware'


const EXPIRY_TIME = 1000 * 60 * 5 // 5 minutes in milliseconds

export enum ConfirmationType {
    Password = 'PASSWORD',
    Passkey = 'PASSKEY',
}

interface IdentityState {
    confirmationType: ConfirmationType
    lastConfirmed: number | null // Stores the timestamp of the last confirmation
    confirmIdentity: (type: ConfirmationType) => void // Updates the timestamp
    isIdentityValid: () => boolean // Checks if confirmation is valid
}

export const useIdentityConfirmationStore = create(
    persist<IdentityState>(
        (set, get) => ({
            confirmationType: ConfirmationType.Password,
            lastConfirmed: null,
            confirmIdentity: type =>
                set({ confirmationType: type, lastConfirmed: Date.now() }),
            isIdentityValid: () => {
                const lastConfirmed = get().lastConfirmed
                return (
                    lastConfirmed !== null &&
                    Date.now() - lastConfirmed <= EXPIRY_TIME
                )
            },
            reset: () => set({ lastConfirmed: null }),
        }),
        {
            name: 'identity-confirmation-store',
            // @ts-expect-error
            partialize: state => ({
                confirmationType: state.confirmationType,
            }),
        }
    )
)

export default useIdentityConfirmationStore
